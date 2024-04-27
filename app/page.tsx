import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Button } from "@/components/ui/button"

export default function Home() {  
  return (
    <div>
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
      
      <div className='mb-10 mt-10'>
        <ConnectButton />
      </div>
      <Button>Button</Button>
    </div>
    );
}
