'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ReviewSection } from '@/components/ReviewSection';

interface Product {
    id: number;
    name: string;
    price: string;
    image: string;
    description: string;
}

interface PageProps {
    params: {
        id: string;
    };
}

export async function generateStaticParams() {
    // 여기서는 빈 배열을 반환하고, 실제 제품 ID는 클라이언트 사이드에서 처리합니다
    return [];
}

export default function ProductDetail({ params }: PageProps) {
    const [product, setProduct] = useState<Product | null>(null);
    const router = useRouter();

    useEffect(() => {
        // 로컬 스토리지에서 상품 데이터 가져오기
        const storedProducts = localStorage.getItem('products');
        if (storedProducts) {
            const products = JSON.parse(storedProducts);
            const foundProduct = products[parseInt(params.id)];
            if (foundProduct) {
                setProduct({ ...foundProduct, id: parseInt(params.id) });
            }
        }
    }, [params.id]);

    if (!product) {
        return <div className="container mx-auto p-4">상품을 찾을 수 없습니다.</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <div className="max-w-2xl mx-auto">
                <img src={product.image} alt={product.name} className="w-full h-96 object-cover rounded-lg shadow-lg" />
                <div className="mt-4">
                    <h1 className="text-3xl font-bold">{product.name}</h1>
                    <p className="text-xl text-gray-700 mt-2">가격: {product.price}원</p>
                    {product.description && (
                        <p className="mt-4 text-gray-600">{product.description}</p>
                    )}
                </div>
                <div className="mt-8 flex space-x-4">
                    <button
                        onClick={() => router.back()}
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    >
                        뒤로 가기
                    </button>
                    <Link
                        href={`/products/${params.id}/edit`}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        수정하기
                    </Link>
                </div>
                
                {/* 리뷰 섹션 */}
                <ReviewSection productId={product.id} />
            </div>
        </div>
    );
}
