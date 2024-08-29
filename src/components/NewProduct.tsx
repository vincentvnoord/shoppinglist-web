"use client";

import { PlusIcon } from "lucide-react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import useProducts from "./ListProvider";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";

export default function NewProduct() {
    const { addProduct } = useProducts();
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const [notes, setNotes] = useState<string | undefined>(undefined);

    const [isOpen, setIsOpen] = useState(false);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(e.target.value);
    }

    const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNotes(e.target.value);
    }

    const onClose = () => {
        setName("");
        setAmount("");
        setNotes(undefined);
        setIsOpen(false);
    }

    const handleAddProduct = () => {
        if (name === "") return;

        addProduct({
            id: Math.random().toString(36).substring(7),
            name,
            amount,
            notes,
            completed: false,
        });

        onClose();
    }

    const onNameBlur = () => {
        if (name === "") {
            setIsOpen(false);
        }
    }

    return (
        <div className="flex w-full flex-col">
            <div className="flex items-center p-2 gap-2">
                <Input
                    onFocus={() => setIsOpen(true)}
                    onBlur={onNameBlur}
                    className="focus:border-b-0 border-0 border-b-2 border-primary" id="name" placeholder="Nieuw Product" value={name} onChange={handleNameChange} />
                <PlusIcon className="text-primary" size={24} />
            </div>
            <motion.div
                initial={{ height: 0 }}
                animate={isOpen ? { height: "auto" } : { height: 0 }}
                className="flex flex-col gap-2 overflow-hidden">
                <div className="flex flex-col gap-2 p-2">
                    <Input id="amount" placeholder="Hoeveelheid" value={amount} onChange={handleAmountChange} />
                    <Textarea id="notes" placeholder="Notities (optioneel)" value={notes ? notes : ""} onChange={handleNotesChange} />
                    <div className="flex gap-3">
                        <Button onClick={onClose} variant={"outline"}>Annuleren</Button>
                        <Button onClick={handleAddProduct} className="flex-grow">Toevoegen</Button>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}