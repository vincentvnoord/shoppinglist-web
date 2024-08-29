"use server";

import { API_URL } from "@/lib/api";

export async function createList(newName: string): Promise<string> {
    const response = await fetch(API_URL + "/list", {
        method: "POST",
        body: JSON.stringify({ name: newName }),
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
    }

    const data = await response.json();
    return data.public_code;
}