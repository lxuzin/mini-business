import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Chatbot } from "@/components/Chatbot";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "스마트 중고 거래 서비스",
  description: "AI를 활용한 스마트한 중고 거래 플랫폼",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={`${inter.className} bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen transition-colors duration-200`}>
        <ThemeToggle />
        {children}
        <Chatbot />
      </body>
    </html>
  );
}
