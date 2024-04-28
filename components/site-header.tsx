import { Montserrat } from 'next/font/google';
import { ModeToggle } from '@/components/mode-toggle';
import { LanguageToggle } from '@/components/language-toggle';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Github } from 'lucide-react';
const font = Montserrat({
  weight: '600',
  subsets: ['latin'],
});

const navigation = [
  { name: 'Home', href: '#' },
  { name: 'Wallet', href: '/' },
  { name: 'Share to X', href: 'https://twitter.com/VitalikButerin' },
  { name: 'githup', href: 'https://github.com' },
];

export function SiteHeader({ locale }: { locale: string }) {
  return (
    <nav className="flex h-16 justify-between px-24">
      <Link href="/" className="flex items-center">
        <div className="relative mr-4 h-8 w-8 flex items-center justify-center">
          {/* <Image
						width={64}
						height={64}
						alt="Logo"
						src="/logo1.jpg"
						priority
						sizes=""
					/> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 256 256"
            className="h-6 w-6"
          >
            <rect width="256" height="256" fill="none"></rect>
            <line
              x1="208"
              y1="128"
              x2="128"
              y2="208"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="16"
            ></line>
            <line
              x1="192"
              y1="40"
              x2="40"
              y2="192"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="16"
            ></line>
          </svg>
        </div>
        <h1 className={cn('hidden font-bold sm:inline-block', font.className)}>
          Wallet
        </h1>
      </Link>
      <div className="hidden lg:flex lg:gap-x-12 items-center">
        {navigation.map((item) => (
          <a key={item.name} href={item.href} target="_blank">
            <Button variant="ghost">{item.name}</Button>
          </a>
        ))}
        <LanguageToggle locale={locale} />
        <ModeToggle />
      </div>
    </nav>
  );
}
