import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { TagInput } from '@/components/TagInput';
import { AIImageAnalysis } from '@/components/AIImageAnalysis';
import { AIPriceRecommendation } from '@/components/AIPriceRecommendation';

export default function Register() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState<string[]>([]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const storedProducts = localStorage.getItem('products');
        const products = storedProducts ? JSON.parse(storedProducts) : {};
        const newId = Object.keys(products).length;
        products[newId] = {
            id: newId,
            name,
            price: parseFloat(price),
            imageUrl,
            description,
            tags,
        };
        localStorage.setItem('products', JSON.stringify(products));
        router.push('/products');
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">상품 등록</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">상품명</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-2 border rounded dark:bg-gray-700"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">가격</label>
                    <div className="flex space-x-2">
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="w-full p-2 border rounded dark:bg-gray-700"
                            required
                        />
                        <AIPriceRecommendation
                            productName={name}
                            onPriceRecommended={(recommendedPrice) => setPrice(recommendedPrice.toString())}
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">이미지 URL</label>
                    <div className="flex space-x-2">
                        <input
                            type="url"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            className="w-full p-2 border rounded dark:bg-gray-700"
                            required
                        />
                        <AIImageAnalysis
                            imageUrl={imageUrl}
                            onTagsGenerated={(generatedTags) => setTags([...tags, ...generatedTags])}
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">설명</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-2 border rounded dark:bg-gray-700"
                        rows={4}
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">태그</label>
                    <TagInput tags={tags} onChange={setTags} />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                >
                    등록하기
                </button>
            </form>
        </div>
    );
}
