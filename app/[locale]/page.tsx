import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import {SwapForm} from "@/components/swap-form";

export default function Home() {
  const t = useTranslations('Basic');
  return (
    <div className='mx-auto w-144'>
      {/*<Button className="dark:w-10">Ghost</Button>*/}
      {/*{t('text')}*/}
        <SwapForm/>
    </div>
  );
}
