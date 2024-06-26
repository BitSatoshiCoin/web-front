import './globals.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { WagmiProvider } from '@/components/wagmi-provider';
import { ThemeProvider } from '@/components/theme-provider';
import { SiteHeader } from '@/components/site-header';
import { SIteThemeBg } from '@/components/site-theme-bg';
import { cn } from '@/lib/utils';
import { locales } from '@/config/locale-config';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

// 构建时静态生成路由
export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={cn([inter.className, 'min-w-full', 'min-h-screen'])}>
        <WagmiProvider>
          <ThemeProvider defaultTheme="light" enableSystem>
            <SIteThemeBg />
            <SiteHeader locale={locale} />
            <main>{children}</main>
          </ThemeProvider>
        </WagmiProvider>
      </body>
    </html>
  );
}
