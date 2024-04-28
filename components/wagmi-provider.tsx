'use client';
import '@rainbow-me/rainbowkit/styles.css';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider as NextWagmiProvider } from 'wagmi';
import { config } from '@/config/wallet-config';
const queryClient = new QueryClient();
export function WagmiProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextWagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider modalSize="compact">{children}</RainbowKitProvider>
      </QueryClientProvider>
    </NextWagmiProvider>
  );
}
