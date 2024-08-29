"use server";

import { API_URL } from "@/lib/api";

export async function addProductToDatabase(listID: number, product: Product): Promise<boolean> {
    const body = {
        list_id: listID,
        product: {
            name: product.name,
            amount: product.amount,
            notes: product.notes,
        }
    }

    console.log(JSON.stringify(body));

    const response = await fetch(API_URL + "/product", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
        }
    });

    if (!response.ok) {
        const data = await response.text();
        throw new Error("Failed to save product: " + data);
    }

    return true;
}

export async function updateProductInDatabase(id: string, product: Product): Promise<boolean> {
    const body = {
        id,
        name: product.name,
        completed: product.completed,
        notes: product.notes,
    }

    console.log(JSON.stringify(body));

    const response = await fetch(API_URL + "/product", {
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
        }
    });

    if (!response.ok) {
        const data = await response.text();
        throw new Error("Failed to save product: " + data);
    }

    return true;
}