import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { TagInput } from '@/components/TagInput';
import { AIPriceRecommendation } from '@/components/AIPriceRecommendation';

interface Product {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    description: string;
    tags: string[];
}

export default function EditProduct() {
    const router = useRouter();
    const { id } = router.query;
    const [product, setProduct] = useState<Product | null>(null);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState<string[]>([]);

    useEffect(() => {
        if (id) {
            const storedProducts = localStorage.getItem('products');
            if (storedProducts) {
                const products = JSON.parse(storedProducts);
                const foundProduct = products[id as string];
                if (foundProduct) {
                    setProduct(foundProduct);
                    setName(foundProduct.name);
                    setPrice(foundProduct.price.toString());
                    setImageUrl(foundProduct.imageUrl);
                    setDescription(foundProduct.description);
                    setTags(foundProduct.tags);
                }
            }
        }
    }, [id]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const storedProducts = localStorage.getItem('products');
        if (storedProducts && id) {
            const products = JSON.parse(storedProducts);
            products[id as string] = {
                id: parseInt(id as string),
                name,
                price: parseFloat(price),
                imageUrl,
                description,
                tags,
            };
            localStorage.setItem('products', JSON.stringify(products));
            router.push('/products');
        }
    };

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">상품 수정</h1>
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
                    <input
                        type="url"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        className="w-full p-2 border rounded dark:bg-gray-700"
                        required
                    />
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
                    수정하기
                </button>
            </form>
        </div>
    );
}
