import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { TagInput } from '@/components/TagInput';
import { AIPriceRecommendation } from '@/components/AIPriceRecommendation';

interface Product {
    name: string;
    price: string;
    image: string;
    description: string;
    tags: string[];
}

export default function EditProduct({ params }: { params: { id: string } }) {
    const [product, setProduct] = useState<Product>({
        name: '',
        price: '',
        image: '',
        description: '',
        tags: []
    });
    const router = useRouter();

    useEffect(() => {
        // 로컬 스토리지에서 상품 데이터 가져오기
        const storedProducts = localStorage.getItem('products');
        if (storedProducts) {
            const products = JSON.parse(storedProducts);
            const foundProduct = products[parseInt(params.id)];
            if (foundProduct) {
                setProduct({
                    ...foundProduct,
                    tags: foundProduct.tags || []
                });
            }
        }
    }, [params.id]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const storedProducts = localStorage.getItem('products');
        if (storedProducts) {
            const products = JSON.parse(storedProducts);
            products[parseInt(params.id)] = product;
            localStorage.setItem('products', JSON.stringify(products));
            router.push(`/products/${params.id}`);
        }
    };

    const handlePriceRecommendation = (recommendedPrice: number) => {
        setProduct({ ...product, price: recommendedPrice.toString() });
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4 dark:text-white">상품 수정</h1>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">상품명</label>
                    <input
                        type="text"
                        value={product.name}
                        onChange={(e) => setProduct({ ...product, name: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">가격</label>
                    <input
                        type="number"
                        value={product.price}
                        onChange={(e) => setProduct({ ...product, price: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                        required
                    />
                    <AIPriceRecommendation productName={product.name} onPriceRecommended={handlePriceRecommendation} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">이미지 URL</label>
                    <input
                        type="text"
                        value={product.image}
                        onChange={(e) => setProduct({ ...product, image: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">상품 설명</label>
                    <textarea
                        value={product.description}
                        onChange={(e) => setProduct({ ...product, description: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 h-32 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">태그</label>
                    <TagInput
                        tags={product.tags}
                        onChange={(newTags) => setProduct({ ...product, tags: newTags })}
                    />
                </div>
                <div className="flex justify-between">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600"
                    >
                        취소
                    </button>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
                    >
                        수정하기
                    </button>
                </div>
            </form>
        </div>
    );
}
