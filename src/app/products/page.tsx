import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const Products: React.FC = () => {
    const [products, setProducts] = useState<any[]>([]);

    useEffect(() => {
        // 로컬 스토리지에서 상품 데이터 가져오기
        const storedProducts = localStorage.getItem('products');
        if (storedProducts) {
            setProducts(JSON.parse(storedProducts));
        }
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4 dark:text-white">상품 목록</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.length > 0 ? (
                    products.map((product, index) => (
                        <Link href={`/products/${index}`} key={index}>
                            <div className="border dark:border-gray-700 p-4 rounded shadow hover:shadow-lg transition-shadow duration-200 bg-white dark:bg-gray-800">
                                <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-2 rounded" />
                                <h2 className="text-xl font-semibold dark:text-white">{product.name}</h2>
                                <p className="text-gray-700 dark:text-gray-300">가격: {product.price}원</p>
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
