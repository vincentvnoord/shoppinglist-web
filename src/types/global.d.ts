type List = {
    id: number;
    name: string;
}

type Product = {
    id: string;
    name: string;
    amount: string;
    notes?: string;
    completed: boolean;
    latestUIEvent?: ProductUserEvent | null;
}

type ProductUserEvent = {
    type: "ADD" | "UPDATE" | "DELETE";
    payload: Product;
}