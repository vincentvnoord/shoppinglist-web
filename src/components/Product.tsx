"use client";

import { Check, CheckIcon, ChevronDown, ChevronLeft, DessertIcon, Droplets, EllipsisVertical, FileCheck, InfoIcon, MenuIcon, Notebook, NotebookIcon, NotepadText, XIcon } from "lucide-react"
import { easeInOut, motion, stagger, useInView } from "framer-motion"
import useProducts from "./ListProvider";
import React, { useRef, useState } from "react";
import { Button } from "./ui/button";
import { easeIn } from "framer-motion/dom";

export const ProductCard = ({ product, index }: { product: Product, index: number }) => {
    const ref = useRef<HTMLLIElement>(null);
    const isInView = useInView(ref, { once: true });
    const [viewDetails, setViewDetails] = useState(false);
    const { updateProduct } = useProducts();
    const { name, amount, completed, notes, id } = product;

    const onClick = () => {
        updateProduct(product.id, { completed: !completed, latestUIEvent: { type: "UPDATE", payload: product } });
    }

    const toggleDetails = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        setViewDetails(!viewDetails);
    }

    return (
        <motion.li
            ref={ref}
            initial={{ opacity: 0, x: "-50%" }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: "-50%" }}
            transition={{ staggerChildren: 0.4 }}
            onClick={onClick} className={`flex items-center gap-2 p-2 rounded-lg bg-muted ${completed ? "opacity-0" : ""}`}>
            <motion.div
                className="overflow-hidden"
            >
                <div className={`transition-colors duration-200 ease-in-out w-8 h-8 rounded-full ${completed ? "bg-green-400" : "bg-background"} flex items-center text-background justify-center`}>
                    <motion.div
                        initial={{ scale: 0, rotate: 90 }}
                        animate={{ scale: completed ? 1 : 0, rotate: completed ? 0 : 180 }}
                    >
                        <CheckIcon size={26} />
                    </motion.div>
                </div>
            </motion.div>
            <div className="flex flex-col">
                <h3 className="font-semibold">{name}</h3>
                <p className="text-sm text-muted-foreground">{amount}</p>
                <motion.div className="overflow-hidden" initial={{ height: 0 }} animate={viewDetails ? { height: "auto" } : { height: 0 }}>
                    <p className="pt-2 text-xs">{notes ? notes : "Geen notities..."}</p>
                </motion.div>
            </div>

            <div className="flex-grow flex items-center justify-end pr-2">
                {notes &&
                    <div onClick={toggleDetails} className="relative text-muted-foreground">
                        <InfoButton showDetails={viewDetails} />
                        <InfoButton showDetails={viewDetails} isClose />
                    </div>
                }
            </div>
        </motion.li>
    )
}

const InfoButton = ({ isClose = false, showDetails }: { isClose?: boolean, showDetails: boolean }) => {
    const variants = {
        visible: {
            scale: 1,
            rotate: 0,
        },
        hidden: {
            scale: 0,
            rotate: 90,
        }
    }

    return (
        <motion.div
            variants={variants}
            className={`${isClose ? "absolute top-0" : ""}`}
            initial={isClose ? "hidden" : "visible"}
            animate={(showDetails && isClose) || (!showDetails && !isClose) ? "visible" : "hidden"}
        >
            {
                isClose ? <XIcon size={25} /> : <NotepadText size={25} />
            }
        </motion.div>
    )
}