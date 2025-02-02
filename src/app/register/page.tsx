import React, { useState } from 'react';
import { AIImageAnalysis } from '@/components/AIImageAnalysis';
import { useRouter } from 'next/navigation';

const Register: React.FC = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newProduct = { name, price, image, description };

        // 로컬 스토리지에 상품 추가
        const storedProducts = localStorage.getItem('products');
        const products = storedProducts ? JSON.parse(storedProducts) : [];
        products.push(newProduct);
        localStorage.setItem('products', JSON.stringify(products));

        // 상품 목록 페이지로 이동
        router.push('/products');
    };

    const handleAIDescription = (aiDescription: string) => {
        setDescription(aiDescription);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">상품 등록</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="상품 이름"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border p-2 w-full rounded"
                    required
                />
                <input
                    type="number"
                    placeholder="가격"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="border p-2 w-full rounded"
                    required
                />
                <input
                    type="text"
                    placeholder="이미지 URL"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    className="border p-2 w-full rounded"
                    required
                />
                {image && <AIImageAnalysis imageUrl={image} onAnalysisComplete={handleAIDescription} />}
                <textarea
                    placeholder="상품 설명"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="border p-2 w-full rounded h-32"
                />
                <div className="flex justify-between">
                    <button
                        type="button"
                        onClick={() => router.push('/products')}
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    >
                        취소
                    </button>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        등록하기
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Register;
