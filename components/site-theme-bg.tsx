'use client';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

export function SIteThemeBg() {
  const [mounted, setMounted] = useState(false);
  const { theme, themes } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  return (
    theme == 'light' && (
      <div
        style={{
          backgroundImage: `url(/images/light-bg.png),url(/images/light-top-bg.jpg)`,
          backgroundPosition: 'left bottom, left top',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 36%, 100% 100%',
        }}
        className="w-full h-full absolute top-0	left-0 -z-50"
      ></div>
    )
  );
}
