import { HomeActions } from "@/components/HomeActions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col justify-center items-center p-6">
      <HomeActions />
    </main>
  );
}
