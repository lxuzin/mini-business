import React, { useEffect, useState } from 'react';

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
            <h1 className="text-2xl font-bold mb-4">상품 목록</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.length > 0 ? (
                    products.map((product, index) => (
                        <div key={index} className="border p-4 rounded shadow">
                            <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-2" />
                            <h2 className="text-xl font-semibold">{product.name}</h2>
                            <p className="text-gray-700">가격: {product.price}원</p>
                        </div>
                    ))
                ) : (
                    <p>등록된 상품이 없습니다.</p>
                )}
            </div>
        </div>
    );
};

export default Products;
