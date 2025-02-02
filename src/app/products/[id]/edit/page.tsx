import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Product {
    name: string;
    price: string;
    image: string;
}

export default function EditProduct({ params }: { params: { id: string } }) {
    const [product, setProduct] = useState<Product>({ name: '', price: '', image: '' });
    const router = useRouter();

    useEffect(() => {
        // 로컬 스토리지에서 상품 데이터 가져오기
        const storedProducts = localStorage.getItem('products');
        if (storedProducts) {
            const products = JSON.parse(storedProducts);
            const foundProduct = products[parseInt(params.id)];
            if (foundProduct) {
                setProduct(foundProduct);
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

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">상품 수정</h1>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">상품명</label>
                    <input
                        type="text"
                        value={product.name}
                        onChange={(e) => setProduct({ ...product, name: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">가격</label>
                    <input
                        type="number"
                        value={product.price}
                        onChange={(e) => setProduct({ ...product, price: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">이미지 URL</label>
                    <input
                        type="text"
                        value={product.image}
                        onChange={(e) => setProduct({ ...product, image: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                    />
                </div>
                <div className="flex justify-between">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    >
                        취소
                    </button>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        수정하기
                    </button>
                </div>
            </form>
        </div>
    );
}
