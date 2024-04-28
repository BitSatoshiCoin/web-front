import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations('Basic');
  return (
    <div>
      <Button className="dark:w-10">Ghost</Button>
      {t('text')}
    </div>
  );
}
