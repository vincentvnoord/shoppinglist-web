"use client";

import { API_URL } from "@/lib/api";
import { list } from "postcss";
import React, { useContext } from "react"
import { json } from "stream/consumers";

type ListContextType = {
    list: List;
    products: Product[];
    addProduct: (product: Product) => void;
    removeProduct: (id: string) => void;
    updateProduct: (id: string, product: Partial<Product>) => void;
}

const ListContext = React.createContext<ListContextType>({
    list: { id: 0, name: "" },
    products: [],
    addProduct: () => { },
    removeProduct: () => { },
    updateProduct: () => { },
});

async function addProductToDatabase(listID: number, product: Product): Promise<Response> {
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
    });

    if (!response.ok) {
        const data = await response.text();
        throw new Error("Failed to save product: " + data);
    }

    return response;
}

async function updateProductInDatabase(id: string, product: Product): Promise<Response> {
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
    });

    if (!response.ok) {
        const data = await response.text();
        throw new Error("Failed to save product: " + data);
    }

    return response;
}

export const ListStateProvider = ({ children, initialProducts, initialList }: { children: React.ReactNode, initialProducts?: Product[], initialList?: List }) => {
    const [list, setList] = React.useState<List>(initialList ?? { id: 0, name: "" });
    const [products, setProducts] = React.useState<Product[]>(initialProducts ?? []);
    const [userState, setUserState] = React.useState<"EDIT" | "VIEW">("VIEW");

    const addProduct = async (product: Product) => {
        setProducts([...products, product]);

        try {
            const response = await addProductToDatabase(list.id, product);
            const data = await response.json();
        } catch (error) {
            console.log(error);
            setProducts(products.filter(p => p.id !== product.id));
        }
    }

    const removeProduct = async (id: string) => {
        setProducts(products.filter(p => p.id !== id));
    }

    const updateProduct = async (id: string, product: Partial<Product>) => {
        const oldProductData = products.find(p => p.id === id);
        if (!oldProductData) return;

        const updatedProduct = { ...oldProductData, ...product };

        setProducts(products.map(p => p.id === id ? updatedProduct : p));

        try {
            await updateProductInDatabase(id, updatedProduct as Product);
        } catch (error) {
            console.log(error);
            setProducts(products.map(p => p.id === id ? { ...p, ...product } : p));
        }
    }

    const handleSetUserState = (state: "EDIT" | "VIEW") => {

        setUserState(state);
    }

    return (
        <ListContext.Provider
            value={{
                list,
                products,
                addProduct,
                removeProduct,
                updateProduct,
            }
            }>
            {children}
        </ListContext.Provider>
    )
}

const useProducts = () => useContext(ListContext);

export default useProducts;