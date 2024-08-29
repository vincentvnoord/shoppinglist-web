"use client";

import { CheckIcon, NotepadText, Scale, XIcon } from "lucide-react"
import { motion, useInView } from "framer-motion"
import useProducts from "./ListProvider";
import React, { useRef, useState } from "react";

export const ProductCard = ({ product, index }: { product: Product, index: number }) => {
    const ref = useRef<HTMLLIElement>(null);
    const isInView = useInView(ref, { once: false });
    const [viewDetails, setViewDetails] = useState(false);
    const { updateProduct } = useProducts();
    const { name, amount, completed, notes, id } = product;
    const baseAnimation = completed ? { opacity: 0.6, scale: 0.98 } : { opacity: 1, scale: 1 };
    const animation = isInView ? { ...baseAnimation, y: 0 } : { ...baseAnimation, opacity: 0, y: "-70%" };

    const onClick = () => {
        updateProduct(product.id, { ...product, completed: !completed, latestUIEvent: { type: "UPDATE", payload: product } });
    }

    const toggleDetails = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        setViewDetails(!viewDetails);
    }

    return (
        <motion.li
            ref={ref}
            initial={{ opacity: 0, y: "-70%", scale: 1 }}
            animate={animation}
            transition={{ staggerChildren: 0.4 }}
            onClick={onClick} className={`flex items-center gap-2 p-2 rounded-lg bg-muted ${completed ? "opacity-0" : ""}`}>
            <motion.div
                className="overflow-hidden"
            >
            </motion.div>
            <div className="flex flex-col">
                <h3 className={`font ${completed ? "line-through" : ""}`}>{name}</h3>
                <p className="text-sm text-muted-foreground">{amount}</p>
                <motion.div className="overflow-hidden" initial={{ height: 0 }} animate={viewDetails ? { height: "auto" } : { height: 0 }}>
                    <p className="text-xs">{notes ? notes : "Geen notities..."}</p>
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