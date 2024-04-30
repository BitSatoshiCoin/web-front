import {useTranslations} from 'next-intl';
import {SwapForm} from "@/components/swap-form";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";

export default function Home() {
    const t = useTranslations('Basic');
    return (
        <div className='mx-auto w-144'>
            {/*<Button className="dark:w-10">Ghost</Button>*/}
            {/*{t('text')}*/}
            <Card>
                <CardHeader className='text-center'>
                    <CardTitle>Places Send Me Your Gold</CardTitle>
                    <CardDescription>And then turn gold into coins by minting it.</CardDescription>
                </CardHeader>
                <CardContent>
                    <SwapForm/>
                </CardContent>
                <CardFooter>
                    <p>Card Footer</p>
                </CardFooter>
            </Card>
        </div>
    );
}
