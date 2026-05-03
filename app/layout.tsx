import { AppConfig } from "@/config/app.config";
import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import "./globals.css";
import ToastProvider from "@/components/providers/ToastProvider";
import StoreProviders from "@/redux/StoreProviders";

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({ subsets: ['latin'] })
export const metadata: Metadata = {
  title: AppConfig().app.name,
  description: AppConfig().app.slogan,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className}`}>
        <StoreProviders>
          <ToastProvider />
          {children}
        </StoreProviders>
      </body>
    </html>
  );
}
