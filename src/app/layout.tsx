import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Akshay Kumar | AI Product Manager",
  description: "AI Product Manager with 10+ years of experience building enterprise AI products at S&P Global, C3 AI, and beyond. Expert in RAG pipelines, Agentic workflows, and turning complex AI into business value.",
  keywords: ["Akshay Kumar", "AI Product Manager", "Enterprise AI", "RAG", "LLMs", "S&P Global", "C3 AI", "Columbia"],
  authors: [{ name: "Akshay Kumar" }],
  openGraph: {
    title: "Akshay Kumar | AI Product Manager",
    description: "Building AI-powered products that drive real business impact",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
