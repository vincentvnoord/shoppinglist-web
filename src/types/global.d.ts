type Product = {
    id: string;
    name: string;
    amount: string;
    notes?: string;
    completed: boolean = false;
    latestUIEvent?: ProductUserEvent | null = null;
}

type ProductUserEvent = {
    type: "ADD" | "UPDATE" | "DELETE";
    payload: Product;
}