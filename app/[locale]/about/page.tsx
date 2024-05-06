import { useTranslations } from 'next-intl';

export default function Page() {
  const t = useTranslations('About');

  return (
    <div className="relative max-w-5xl mx-auto pt-20 sm:pt-24 lg:pt-32">
      <h1 className="text-slate-900 font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-center dark:text-white">
        {t('mainTitle')}
      </h1>
      <p className="mt-6 text-lg text-slate-600 text-center max-w-3xl mx-auto dark:text-slate-400">
        {t('subtitle')}
      </p>
    </div>
  );
}
