'use client';

import React, { useState, useEffect } from 'react';

interface Review {
    id: number;
    productId: number;
    userName: string;
    rating: number;
    comment: string;
    createdAt: string;
}

interface ReviewSectionProps {
    productId: number;
}

export const ReviewSection: React.FC<ReviewSectionProps> = ({ productId }) => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [newReview, setNewReview] = useState({
        userName: '',
        rating: 5,
        comment: ''
    });

    useEffect(() => {
        // 로컬 스토리지에서 리뷰 데이터 가져오기
        const storedReviews = localStorage.getItem('reviews');
        if (storedReviews) {
            const allReviews = JSON.parse(storedReviews);
            const productReviews = allReviews.filter((review: Review) => review.productId === productId);
            setReviews(productReviews);
        }
    }, [productId]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const review: Review = {
            id: Date.now(),
            productId,
            userName: newReview.userName,
            rating: newReview.rating,
            comment: newReview.comment,
            createdAt: new Date().toISOString()
        };

        // 로컬 스토리지에서 기존 리뷰 가져오기
        const storedReviews = localStorage.getItem('reviews');
        const allReviews = storedReviews ? JSON.parse(storedReviews) : [];
        
        // 새 리뷰 추가
        const updatedReviews = [...allReviews, review];
        localStorage.setItem('reviews', JSON.stringify(updatedReviews));

        // 현재 제품의 리뷰 업데이트
        const productReviews = updatedReviews.filter((r: Review) => r.productId === productId);
        setReviews(productReviews);

        // 폼 초기화
        setNewReview({
            userName: '',
            rating: 5,
            comment: ''
        });
    };

    return (
        <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">리뷰</h2>
            
            {/* 리뷰 작성 폼 */}
            <form onSubmit={handleSubmit} className="mb-8 space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">이름</label>
                    <input
                        type="text"
                        value={newReview.userName}
                        onChange={(e) => setNewReview({ ...newReview, userName: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">평점</label>
                    <select
                        value={newReview.rating}
                        onChange={(e) => setNewReview({ ...newReview, rating: parseInt(e.target.value) })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                        {[1, 2, 3, 4, 5].map((num) => (
                            <option key={num} value={num}>{num}점</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">리뷰 내용</label>
                    <textarea
                        value={newReview.comment}
                        onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 h-32"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    리뷰 작성
                </button>
            </form>

            {/* 리뷰 목록 */}
            <div className="space-y-4">
                {reviews.length > 0 ? (
                    reviews.map((review) => (
                        <div key={review.id} className="border p-4 rounded">
                            <div className="flex justify-between items-center mb-2">
                                <div>
                                    <span className="font-semibold">{review.userName}</span>
                                    <span className="ml-2 text-yellow-500">{'★'.repeat(review.rating)}{'☆'.repeat(5-review.rating)}</span>
                                </div>
                                <span className="text-sm text-gray-500">
                                    {new Date(review.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                            <p className="text-gray-700">{review.comment}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">아직 리뷰가 없습니다.</p>
                )}
            </div>
        </div>
    );
};
