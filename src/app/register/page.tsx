'use client';

import React, { useState } from 'react';
import { AIImageAnalysis } from '@/components/AIImageAnalysis';
import { TagInput } from '@/components/TagInput';
import { AIPriceRecommendation } from '@/components/AIPriceRecommendation';
import { useRouter } from 'next/navigation';

const Register: React.FC = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState<string[]>([]);
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newProduct = { name, price, image, description, tags };

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

    const handlePriceRecommendation = (recommendedPrice: number) => {
        setPrice(recommendedPrice.toString());
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4 dark:text-white">상품 등록</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="상품 이름"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border p-2 w-full rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    required
                />
                <div>
                    <input
                        type="number"
                        placeholder="가격"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="border p-2 w-full rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                        required
                    />
                    {name && <AIPriceRecommendation productName={name} onPriceRecommended={handlePriceRecommendation} />}
                </div>
                <input
                    type="text"
                    placeholder="이미지 URL"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    className="border p-2 w-full rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    required
                />
                {image && <AIImageAnalysis imageUrl={image} onAnalysisComplete={handleAIDescription} />}
                <textarea
                    placeholder="상품 설명"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="border p-2 w-full rounded h-32 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                />
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        태그
                    </label>
                    <TagInput tags={tags} onChange={setTags} />
                </div>
                <div className="flex justify-between">
                    <button
                        type="button"
                        onClick={() => router.push('/products')}
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600"
                    >
                        취소
                    </button>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
                    >
                        등록하기
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Register;
