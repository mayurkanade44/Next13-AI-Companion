import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="text-green-500 text-3xl">Ai Companion (Protected)
    <UserButton afterSignOutUrl="/"/></div>
  );
}
