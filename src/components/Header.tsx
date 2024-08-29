"use client";

import { CheckIcon, CopyIcon, CrossIcon, ShareIcon, XIcon } from "lucide-react"
import { Button } from "./ui/button"
import { ThemeToggle } from "./ui/theme-toggle"
import { motion } from "framer-motion";
import { useState } from "react";

export default function Header({ list }: { list: List }) {
    const [copied, setCopied] = useState<null | boolean>(null);

    const handleLinkCopy = async () => {
        try {
            navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            const timeout = 1000; // Replace 1000 with the desired timeout value in milliseconds
            setTimeout(() => {
                setCopied(null);
            }, timeout);
        } catch (error) {
            setCopied(false);
            const timeout = 1000; // Replace 1000 with the desired timeout value in milliseconds
            setTimeout(() => {
                setCopied(null);
            }, timeout);
        }
    }

    const variants = {
        visible: {
            opacity: 1,
            rotate: 0,
            x: 0,
        },
        hidden: {
            opacity: 0,
            rotate: 90,
            x: -20,
        }
    }

    return (
        <header className="flex justify-between items-center">
            <span className="flex gap-2 items-center">
                <h1 className="font-semibold">{list.name}</h1>
                <div className="relative">
                    <motion.div variants={variants} initial="copied" animate={copied == null ? "visible" : "hidden"}>
                        <CopyIcon onClick={handleLinkCopy} size={20} />
                    </motion.div>

                    <motion.div className="absolute top-0 left-0" variants={variants} initial="hidden" animate={copied ? "visible" : "hidden"}>
                        <CheckIcon size={20} />
                    </motion.div>

                    <motion.div className="absolute top-0 left-0" variants={variants} initial="hidden" animate={copied === false ? "visible" : "hidden"}>
                        <XIcon size={20} />
                    </motion.div>
                </div>
            </span>
            <ThemeToggle />
        </header>
    )
}