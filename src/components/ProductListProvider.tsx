"use client";

import React, { useContext } from "react"

type ProductContextType = {
    products: Product[];
    addProduct: (product: Product) => void;
    removeProduct: (id: string) => void;
    updateProduct: (id: string, product: Partial<Product>) => void;
}

const ProductContext = React.createContext<ProductContextType>({
    products: [],
    addProduct: () => { },
    removeProduct: () => { },
    updateProduct: () => { },
});

export const ProductStateProvider = ({ children, initialProducts }: { children: React.ReactNode, initialProducts?: Product[] }) => {
    const [products, setProducts] = React.useState<Product[]>(initialProducts ?? []);
    const [userState, setUserState] = React.useState<"EDIT" | "VIEW">("VIEW");

    const addProduct = (product: Product) => {
        setProducts([...products, product]);
    }

    const removeProduct = (id: string) => {
        setProducts(products.filter(p => p.id !== id));
    }

    const updateProduct = (id: string, product: Partial<Product>) => {
        console.log(id, product);
        setProducts(products.map(p => p.id === id ? { ...p, ...product } : p));
    }

    const handleSetUserState = (state: "EDIT" | "VIEW") => {

        setUserState(state);
    }

    return (
        <ProductContext.Provider
            value={{
                products,
                addProduct,
                removeProduct,
                updateProduct,
            }
            }>
            {children}
        </ProductContext.Provider>
    )
}

const useProducts = () => useContext(ProductContext);

export default useProducts;