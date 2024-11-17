import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next.js Ollama Starter Kit",
  description: "Ollama Starter Kit built with Next JS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="bg-muted/50 flex h-100vh flex-1 flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}
