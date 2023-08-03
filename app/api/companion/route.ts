import prismadb from "@/lib/prismadb";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { src, description, name, seed, categoryId, instructions } =
      await req.json();
    const user = await currentUser();

    if (!user || !user.id || !user.firstName) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

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

    const companion = await prismadb.companion.create({
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
    console.log("companion_post", error);
    return new NextResponse("Server Error", { status: 500 });
  }
}
