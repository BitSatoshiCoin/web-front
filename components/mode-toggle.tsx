'use client';

import { useEffect } from 'react';
import { Sun as SunIcon, MoonStar as MoonIcon } from 'lucide-react';
import { useTheme } from 'next-themes';

import { THEME_DRAK, THEME_LIGHT } from '@/config/const';

import { Button } from '@/components/ui/button';

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  useEffect(() => {
    document.documentElement.classList.add(theme || '');
  }, []);

  /**
   * 切换主题
   */
  const toggleTheme = () => {
    let deleteClass;
    let addClass;
    if (theme === THEME_LIGHT) {
      addClass = THEME_DRAK;
      deleteClass = THEME_LIGHT;
      setTheme(THEME_DRAK);
    } else {
      addClass = THEME_LIGHT;
      deleteClass = THEME_DRAK;
      setTheme(THEME_LIGHT);
    }
    document.documentElement.classList.remove(deleteClass);
    document.documentElement.classList.add(addClass);
  };

  return (
    <Button variant="ghost" className="w-9 px-0" onClick={toggleTheme}>
      <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
