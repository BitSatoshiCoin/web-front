'use client';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ConnectButton as NextConnectButton } from '@rainbow-me/rainbowkit';
import Image from 'next/image';
import { useConnections } from 'wagmi';
export function ConnectButton() {
  const connections = useConnections();
  return (
    <div>
      <NextConnectButton.Custom>
        {({
          account,
          chain,
          openAccountModal,
          openChainModal,
          openConnectModal,
          authenticationStatus,
          mounted,
        }) => {
          // Note: If your app doesn't use authentication, you
          // can remove all 'authenticationStatus' checks
          const ready = mounted && authenticationStatus !== 'loading';
          const connected =
            ready &&
            account &&
            chain &&
            (!authenticationStatus || authenticationStatus === 'authenticated');

          return (
            <div
              {...(!ready && {
                'aria-hidden': true,
                style: {
                  opacity: 0,
                  pointerEvents: 'none',
                  userSelect: 'none',
                },
              })}
            >
              {(() => {
                if (!connected) {
                  return (
                    <Button onClick={openConnectModal} type="button">
                      Connect Wallet
                    </Button>
                  );
                }

                if (chain.unsupported) {
                  return (
                    <Button onClick={openChainModal} type="button">
                      Wrong network
                    </Button>
                  );
                }
                const address = account.address;
                const connection = connections.find((item) =>
                  item.accounts.includes(address as `0x${string}`)
                );
                const connector = connection?.connector;

                return (
                  <Button type="button" onClick={openAccountModal}>
                    {connector && connector.icon && (
                      <Image
                        src={connector.icon}
                        alt={connector.name}
                        width={20}
                        height={20}
                        className="mr-1"
                      />
                    )}
                    {account.displayName}
                  </Button>
                );
              })()}
            </div>
          );
        }}
      </NextConnectButton.Custom>
    </div>
  );
}
