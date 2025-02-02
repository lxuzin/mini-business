import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ReviewSection } from '@/components/ReviewSection';

interface Product {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    description: string;
    tags: string[];
}

export default function ProductDetail() {
    const router = useRouter();
    const { id } = router.query;
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        if (id) {
            const storedProducts = localStorage.getItem('products');
            if (storedProducts) {
                const products = JSON.parse(storedProducts);
                const foundProduct = products[id as string];
                if (foundProduct) {
                    setProduct(foundProduct);
                }
            }
        }
    }, [id]);

    const handleEdit = () => {
        router.push(`/products/${id}/edit`);
    };

    const handleDelete = () => {
        const storedProducts = localStorage.getItem('products');
        if (storedProducts) {
            const products = JSON.parse(storedProducts);
            delete products[id as string];
            localStorage.setItem('products', JSON.stringify(products));
            router.push('/products');
        }
    };

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-64 object-cover rounded-lg mb-4"
                />
                <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
                <p className="text-xl mb-4">{product.price.toLocaleString()}원</p>
                <p className="mb-4">{product.description}</p>
                <div className="mb-4">
                    {product.tags.map((tag, index) => (
                        <span
                            key={index}
                            className="inline-block bg-gray-200 dark:bg-gray-700 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
                <div className="flex space-x-2">
                    <button
                        onClick={handleEdit}
                        className="bg-sky-300 text-white px-4 py-2 rounded hover:bg-sky-400 transition-colors"
                    >
                        수정
                    </button>
                    <button
                        onClick={handleDelete}
                        className="bg-rose-300 text-white px-4 py-2 rounded hover:bg-rose-400 transition-colors"
                    >
                        삭제
                    </button>
                </div>
            </div>
            <div className="mt-8">
                <ReviewSection productId={id as string} />
            </div>
        </div>
    );
}
