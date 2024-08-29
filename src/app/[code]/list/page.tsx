import { CheckCircle, ShoppingCart } from "lucide-react"
import ProductGroup from "@/components/Group"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import NewProduct from "@/components/NewProduct"
import React from "react"

const ShoppingListPage: React.FC = ({ }: {}) => {

    return (
        <>
            <div className="flex flex-col flex-grow items-center gap-3 flex-shrink overflow-scroll overflow-x-hidden">
                <ProductGroup />
            </div>

            <div className="flex items-start justify-center">
                <NewProduct />
            </div>
        </>
    )
}

export default ShoppingListPage;


