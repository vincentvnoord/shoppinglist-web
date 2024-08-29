"use client";

import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { useState } from "react";
import { API_URL } from "@/lib/api";
import { useRouter } from "next/navigation";
import { createList } from "@/actions/listActions";

export const HomeActions = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [newName, setNewName] = useState("");

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewName(e.target.value);
    }

    const handleNewList = async () => {
        if (newName === "") return;

        setLoading(true);

        try {
            const public_code = await createList(newName);
            router.push("/" + public_code + "/list");
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col gap-2 items-center">
            <Input disabled={loading} placeholder="Voer code in" className="text-center" />
            <Button disabled={loading} className="w-full" variant={"secondary"}>Ga naar lijstje</Button>
            <p>of</p>

            <Input disabled={loading} placeholder="Naam" className="text-center" value={newName} onChange={handleNameChange} />
            <Button onClick={handleNewList} disabled={loading} className="w-full">Nieuw Boodschappenlijstje maken</Button>
        </div>
    )
}