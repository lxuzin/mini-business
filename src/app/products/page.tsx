import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface Product {
    name: string;
    price: string;
    image: string;
    description: string;
    tags: string[];
}

const Products: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedTag, setSelectedTag] = useState<string>('');
    const [allTags, setAllTags] = useState<string[]>([]);

    useEffect(() => {
        // 로컬 스토리지에서 상품 데이터 가져오기
        const storedProducts = localStorage.getItem('products');
        if (storedProducts) {
            const parsedProducts = JSON.parse(storedProducts);
            setProducts(parsedProducts);

            // 모든 태그 수집
            const tags = new Set<string>();
            parsedProducts.forEach((product: Product) => {
                if (product.tags) {
                    product.tags.forEach(tag => tags.add(tag));
                }
            });
            setAllTags(Array.from(tags));
        }
    }, []);

    const filteredProducts = selectedTag
        ? products.filter(product => product.tags && product.tags.includes(selectedTag))
        : products;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4 dark:text-white">상품 목록</h1>
            
            {/* 태그 필터 */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    태그로 필터링
                </label>
                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={() => setSelectedTag('')}
                        className={`px-3 py-1 rounded-full text-sm ${
                            !selectedTag
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                        }`}
                    >
                        전체
                    </button>
                    {allTags.map(tag => (
                        <button
                            key={tag}
                            onClick={() => setSelectedTag(tag)}
                            className={`px-3 py-1 rounded-full text-sm ${
                                selectedTag === tag
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                            }`}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </div>

            {/* 상품 목록 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product, index) => (
                        <Link href={`/products/${index}`} key={index}>
                            <div className="border dark:border-gray-700 p-4 rounded shadow hover:shadow-lg transition-shadow duration-200 bg-white dark:bg-gray-800">
                                <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-2 rounded" />
                                <h2 className="text-xl font-semibold dark:text-white">{product.name}</h2>
                                <p className="text-gray-700 dark:text-gray-300">가격: {product.price}원</p>
                                {product.tags && product.tags.length > 0 && (
                                    <div className="mt-2 flex flex-wrap gap-1">
                                        {product.tags.map((tag, tagIndex) => (
                                            <span
                                                key={tagIndex}
                                                className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </Link>
                    ))
                ) : (
                    <p className="text-gray-500 dark:text-gray-400">등록된 상품이 없습니다.</p>
                )}
            </div>
            <div className="mt-8">
                <Link href="/register" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 transition-colors">
                    상품 등록하기
                </Link>
            </div>
        </div>
    );
};

export default Products;
