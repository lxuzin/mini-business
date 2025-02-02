'use client';

import React from 'react';

interface AIImageAnalysisProps {
    imageUrl: string;
    onTagsGenerated: (tags: string[]) => void;
}

export function AIImageAnalysis({ imageUrl, onTagsGenerated }: AIImageAnalysisProps) {
    const handleAnalyze = async () => {
        // 실제로는 AI 이미지 분석 API를 호출하겠지만, 여기서는 더미 데이터를 반환합니다.
        const dummyTags = ['깨끗한', '상태좋음', '인기상품'];
        onTagsGenerated(dummyTags);
    };

    return (
        <button
            onClick={handleAnalyze}
            type="button"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
            disabled={!imageUrl}
        >
            이미지 분석
        </button>
    );
}
