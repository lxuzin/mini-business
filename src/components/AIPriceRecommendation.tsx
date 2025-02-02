import React, { useState } from 'react';

interface AIPriceRecommendationProps {
    productName: string;
    onPriceRecommended: (price: number) => void;
}

export const AIPriceRecommendation: React.FC<AIPriceRecommendationProps> = ({
    productName,
    onPriceRecommended
}) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getRecommendedPrice = async () => {
        setLoading(true);
        setError(null);

        try {
            // 실제 API 연동 대신 임시로 랜덤 가격 생성
            // TODO: 실제 API 연동 시 이 부분을 수정
            await new Promise(resolve => setTimeout(resolve, 1500)); // API 호출 시뮬레이션
            const averagePrice = Math.floor(Math.random() * (500000 - 50000) + 50000);
            const recommendedPrice = Math.floor(averagePrice * (Math.random() * (1.2 - 0.8) + 0.8));
            
            onPriceRecommended(recommendedPrice);
        } catch (err) {
            setError('가격 추천을 가져오는 중 오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-4">
            <button
                onClick={getRecommendedPrice}
                disabled={loading}
                className={`px-4 py-2 rounded ${
                    loading
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700'
                } text-white transition-colors`}
            >
                {loading ? '가격 분석 중...' : 'AI 가격 추천받기'}
            </button>
            {error && (
                <p className="mt-2 text-red-500 dark:text-red-400 text-sm">
                    {error}
                </p>
            )}
        </div>
    );
};
