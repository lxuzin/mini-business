'use client';

import React, { useState } from 'react';

interface AIImageAnalysisProps {
    imageUrl: string;
    onAnalysisComplete: (description: string) => void;
}

export const AIImageAnalysis: React.FC<AIImageAnalysisProps> = ({ imageUrl, onAnalysisComplete }) => {
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const analyzeImage = async () => {
        setIsAnalyzing(true);
        setError(null);
        
        try {
            // 여기에 Windsurf AI API 호출 로직이 들어갈 예정
            // 현재는 더미 응답을 반환
            const dummyDescription = "이 상품은 고품질의 제품으로 보입니다. 상세한 설명은 AI 통합 후 제공됩니다.";
            
            setTimeout(() => {
                onAnalysisComplete(dummyDescription);
                setIsAnalyzing(false);
            }, 1000);
        } catch (err) {
            setError('이미지 분석 중 오류가 발생했습니다.');
            setIsAnalyzing(false);
        }
    };

    return (
        <div className="mt-4">
            <button
                onClick={analyzeImage}
                disabled={isAnalyzing}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:bg-gray-400"
            >
                {isAnalyzing ? '분석 중...' : 'AI로 상품 설명 생성'}
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
    );
};
