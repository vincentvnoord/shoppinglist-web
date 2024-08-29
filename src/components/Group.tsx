"use client";

import useProducts from "./ListProvider"
import { ProductCard } from "./Product";

export default function ProductGroup({ completed = false }: { completed?: boolean }) {
    const { products, updateProduct } = useProducts();
    let filteredProducts = [];
    console.log(products);
    if (completed) {
        for (let i = 0; i < products.length; i++) {
            if (products[i].completed) {
                if (products[i].latestUIEvent) {
                    updateProduct(products[i].id, { latestUIEvent: undefined });
                }
                filteredProducts.unshift(products[i]);
            }
        }
    } else {
        for (let i = 0; i < products.length; i++) {
            if (products[i].completed && products[i].latestUIEvent === undefined) {
            } else if (products[i].completed && completed) {
                filteredProducts.push(products[i]);
            }
            else {
                filteredProducts.push(products[i]);
            }
        }
    }

    return (
        <div className="flex w-full flex-col gap-1">
            <ul className="flex flex-col gap-2 pl-2 pr-2">
                {filteredProducts.map((product, index) => (
                    <ProductCard key={product.id} product={product} index={index} />
                ))}
            </ul>
        </div>
    )
}