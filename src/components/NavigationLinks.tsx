'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingCart, CheckCircle } from 'lucide-react';
import useProducts from './ProductListProvider';
import { motion } from 'framer-motion';

function getProductCounts(products: Product[]) {
    const counts = {
        total: 0,
        completed: 0,
        due: 0,
    };

    for (const product of products) {
        counts.total++;
        if (product.completed) {
            counts.completed++;
        } else {
            counts.due++;
        }
    }

    return counts;
}

export default function NavigationLinks() {
    const pathname = usePathname(); // Get the current pathname
    const { products } = useProducts();
    const counts = getProductCounts(products);

    const getNewPath = (newSegment: string) => {
        const parts = pathname.split('/');
        parts[parts.length - 1] = newSegment; // Replace the last segment
        return parts.join('/');
    };

    return (
        <nav className='w-full'>
            <ul className="flex justify-center gap-9 items-center p-3">
                <li>
                    <Link href={getNewPath('list')}>
                        <div className='relative'>
                            <ShoppingCart size={35} />
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={counts.due > 0 ? { scale: 1 } : { scale: 0 }}
                                className="absolute -top-2 -right-2 bg-primary font-semibold rounded-full w-6 h-6 flex items-center justify-center"
                            >
                                <span>{counts.due > 0 ? counts.due : 1}</span>
                            </motion.div>
                        </div>
                    </Link>
                </li>
                <li>
                    <Link href={getNewPath('completed')}>
                        <CheckCircle size={35} />
                    </Link>
                </li>
            </ul>
        </nav>
    );
}
