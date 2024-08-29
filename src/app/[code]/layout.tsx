import { ThemeToggle } from "@/components/ui/theme-toggle"
import { ShoppingCart, CheckCircle, HomeIcon } from "lucide-react"
import Link from "next/link";
import { ListStateProvider } from "@/components/ListProvider";
import NavigationLinks from "@/components/NavigationLinks";
import { API_URL } from "@/lib/api";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";

export default async function GroceryListLayout({ children, params }: { children: React.ReactNode, params: { code: string } }) {
    const currentCode = params.code;

    const listResponse = await fetch(API_URL + "/list/" + currentCode);
    let list: List | null = null;
    if (listResponse.ok) {
        const data = await listResponse.json();
        list = {
            id: data.id,
            name: data.name,
        }
    }

    if (!list) {
        return (
            <main className="flex h-dvh flex-col gap-3 justify-center items-center">
                <h1>Geen boodschappenlijstje gevonden</h1>
                <Link href="/">
                    <Button className="gap-2">
                        <HomeIcon size={24} />
                        <span>Terug naar home</span>
                    </Button>
                </Link>
            </main>
        )
    }

    const productsResponse = await fetch(API_URL + "/products/" + list.id);
    let products: Product[] = [];
    if (productsResponse.ok) {
        const data = await productsResponse.json();
        products = data.map((p: any) => ({
            id: p.id,
            name: p.name,
            amount: p.amount,
            notes: p.notes,
            completed: p.completed,
        }));
    }

    return (
        <ListStateProvider initialProducts={products} initialList={list}>
            <main className="flex h-dvh flex-col justify-between gap-2 p-2">
                <Header list={list} />

                {children}

                <NavigationLinks />
            </main>
        </ListStateProvider>
    )
}