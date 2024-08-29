import { ThemeToggle } from "@/components/ui/theme-toggle"
import { ShoppingCart, CheckCircle } from "lucide-react"
import Link from "next/link";
import { ProductStateProvider } from "@/components/ProductListProvider"
import NavigationLinks from "@/components/NavigationLinks";

export default async function GroceryListLayout({ children, params }: { children: React.ReactNode, params: { code: string } }) {
    const currentCode = params.code;

    const products: Product[] = [
        {
            id: "1", name: "Komkommer", amount: "2 stuks",
            completed: false,
            notes: "Liefst biologisch",
        },
        {
            id: "2", name: "Paprika", amount: "1 stuks",
            completed: true,
        },
        {
            id: "3", name: "Kipfilet", amount: "200 gram",
            completed: false,
        },
    ]

    return (
        <ProductStateProvider initialProducts={products}>
            <main className="flex h-dvh flex-col justify-between gap-2 p-2">
                <header className="flex justify-between items-center">
                    <h1 className="font-semibold">Fam van noord</h1>
                    <ThemeToggle />
                </header>

                {children}

                <NavigationLinks />
            </main>
        </ProductStateProvider>
    )
}