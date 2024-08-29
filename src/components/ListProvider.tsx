"use client";

import { API_URL } from "@/lib/api";
import { list } from "postcss";
import React, { useContext } from "react"
import { json } from "stream/consumers";
import { addProductToDatabase, updateProductInDatabase } from "@/actions/productActions";

type ListContextType = {
    list: List;
    products: Product[];
    addProduct: (product: Product) => void;
    removeProduct: (id: string) => void;
    updateProduct: (id: string, product: Product) => void;
}

const ListContext = React.createContext<ListContextType>({
    list: { id: 0, name: "" },
    products: [],
    addProduct: () => { },
    removeProduct: () => { },
    updateProduct: () => { },
});


export const ListStateProvider = ({ children, initialProducts, initialList }: { children: React.ReactNode, initialProducts?: Product[], initialList?: List }) => {
    const [list, setList] = React.useState<List>(initialList ?? { id: 0, name: "" });
    const [products, setProducts] = React.useState<Product[]>(initialProducts ?? []);
    const [userState, setUserState] = React.useState<"EDIT" | "VIEW">("VIEW");

    const addProduct = async (product: Product) => {
        setProducts([...products, product]);

        try {
            const response = await addProductToDatabase(list.id, product);
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