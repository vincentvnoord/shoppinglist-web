"use client";

import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { useState } from "react";
import { API_URL } from "@/lib/api";
import { useRouter } from "next/navigation";

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

        const response = await fetch(API_URL + "/list", {
            method: "POST",
            body: JSON.stringify({ name: newName }),
        });

        if (!response.ok) {
            response.text().then(console.error);
            setLoading(false);
        } else {
            const data = await response.json();
            console.log(data);
            router.push("/" + data.public_code + "/list");
        }

        setLoading(false);
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