import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface ConnectButtonProps {
  className?: string;
}

export function ConnectButton({ className }: ConnectButtonProps) {
  return (
    <Button className={cn(['text-lg', 'font-semibold', className])}>
      Connect a Wallet
    </Button>
  );
}
