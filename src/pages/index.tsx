import React from 'react';
import Link from 'next/link';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">중고 거래 서비스</h1>
        <ThemeToggle />
      </div>
      <div className="space-y-4">
        <Link
          href="/products"
          className="block bg-blue-500 text-white text-center px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          상품 목록 보기
        </Link>
        <Link
          href="/register"
          className="block bg-green-500 text-white text-center px-4 py-2 rounded hover:bg-green-600 transition-colors"
        >
          상품 등록하기
        </Link>
      </div>
    </div>
  );
}
