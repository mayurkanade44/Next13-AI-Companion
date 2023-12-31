import prismadb from "@/lib/prismadb";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { companionId: string } }
) {
  try {
    const { src, description, name, seed, categoryId, instructions } =
      await req.json();
    const user = await currentUser();

    if (!user || !user.id || !user.firstName) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.companionId)
      return new NextResponse("Companion id required", { status: 400 });

    if (
      !src ||
      !description ||
      !name ||
      !seed ||
      !categoryId ||
      !instructions
    ) {
      return new NextResponse("Please provide required values", {
        status: 400,
      });
    }

    const companion = await prismadb.companion.update({
      where: {
        id: params.companionId,
        userId: user.id,
      },
      data: {
        categoryId,
        userId: user.id,
        userName: user.firstName,
        src,
        name,
        description,
        seed,
        instructions,
      },
    });

    return NextResponse.json(companion);
  } catch (error) {
    console.log("companion_patch", error);
    return new NextResponse("Server Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { companionId: string } }
) {
  try {
    console.log("ok");
    const user = await currentUser();

    if (!user || !user.id || !user.firstName) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const companion = await prismadb.companion.delete({
      where: {
        userId: user.id,
        id: params.companionId,
      },
    });

    return NextResponse.json(companion);
  } catch (error) {
    console.log("companion_delete", error);
    return new NextResponse("Server Error", { status: 500 });
  }
}
