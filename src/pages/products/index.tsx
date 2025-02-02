import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ThemeToggle } from '@/components/ThemeToggle';

interface Product {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    description: string;
    tags: string[];
}

export default function Products() {
    const [products, setProducts] = useState<Record<string, Product>>({});

    useEffect(() => {
        const storedProducts = localStorage.getItem('products');
        if (storedProducts) {
            setProducts(JSON.parse(storedProducts));
        }
    }, []);

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold">상품 목록</h1>
                <div className="flex items-center space-x-4">
                    <Link
                        href="/register"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                    >
                        상품 등록
                    </Link>
                    <ThemeToggle />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(products).map(([id, product]) => (
                    <Link key={id} href={`/products/${id}`}>
                        <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                            <img
                                src={product.imageUrl}
                                alt={product.name}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                                <p className="text-lg mb-2">{product.price.toLocaleString()}원</p>
                                <div className="flex flex-wrap gap-2">
                                    {product.tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-full text-sm"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
