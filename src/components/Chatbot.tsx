'use client';

import React, { useState } from 'react';

interface Message {
    id: number;
    text: string;
    sender: 'user' | 'bot';
    timestamp: string;
}

export const Chatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            text: '안녕하세요! 무엇을 도와드릴까요?',
            sender: 'bot',
            timestamp: new Date().toISOString()
        }
    ]);
    const [inputText, setInputText] = useState('');

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputText.trim()) return;

        // 사용자 메시지 추가
        const userMessage: Message = {
            id: Date.now(),
            text: inputText,
            sender: 'user',
            timestamp: new Date().toISOString()
        };
        setMessages(prev => [...prev, userMessage]);
        setInputText('');

        // 임시 봇 응답 (나중에 Windsurf AI API로 대체)
        const botResponses: { [key: string]: string } = {
            '가격': '상품 가격은 판매자가 직접 설정하며, 협의가 가능합니다.',
            '배송': '배송 방식은 판매자와 구매자가 직접 협의하여 결정합니다.',
            '결제': '현재는 직거래만 지원하고 있습니다.',
            '등록': '상단의 "상품 등록하기" 버튼을 클릭하여 상품을 등록할 수 있습니다.',
        };

        let botResponse = '죄송합니다. 질문하신 내용에 대해 정확한 답변을 드리기 어렵습니다. 더 자세한 내용은 고객센터로 문의해주세요.';
        
        // 간단한 키워드 기반 응답
        for (const [keyword, response] of Object.entries(botResponses)) {
            if (inputText.includes(keyword)) {
                botResponse = response;
                break;
            }
        }

        setTimeout(() => {
            const botMessage: Message = {
                id: Date.now(),
                text: botResponse,
                sender: 'bot',
                timestamp: new Date().toISOString()
            };
            setMessages(prev => [...prev, botMessage]);
        }, 500);
    };

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-4 right-4 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition-colors"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
            </button>
        );
    }

    return (
        <div className="fixed bottom-4 right-4 w-80 bg-white rounded-lg shadow-xl border border-gray-200">
            {/* 챗봇 헤더 */}
            <div className="flex justify-between items-center p-4 border-b">
                <h3 className="font-semibold">고객 지원 챗봇</h3>
                <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-500 hover:text-gray-700"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>

            {/* 메시지 목록 */}
            <div className="h-96 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`max-w-[80%] p-3 rounded-lg ${
                                message.sender === 'user'
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-100 text-gray-800'
                            }`}
                        >
                            {message.text}
                        </div>
                    </div>
                ))}
            </div>

            {/* 입력 폼 */}
            <form onSubmit={handleSendMessage} className="border-t p-4">
                <div className="flex space-x-2">
                    <input
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="메시지를 입력하세요..."
                        className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                    >
                        전송
                    </button>
                </div>
            </form>
        </div>
    );
};
