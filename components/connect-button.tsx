'use client';
import { useState } from 'react';
import { abbreviateAddress } from '@/lib/utils';
import { useAccount, useDisconnect, useBalance } from 'wagmi';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import Image from 'next/image';
import { useToast } from '@/components/ui/use-toast';
import { ToastAction } from '@/components/ui/toast';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { ConnectButton as NextConnectButton } from '@rainbow-me/rainbowkit';
import { Button } from '@/components/ui/button';
import { Copy, LogOut } from 'lucide-react';

export function ConnectButton() {
  const [open, setOpen] = useState(false);
  const curAccount = useAccount();

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
                      Connect a Wallet
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
                const connector = curAccount?.connector;

                return (
                  <Button
                    type="button"
                    onClick={() => {
                      setOpen(!open);
                    }}
                  >
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
      <SideDialog open={open} setOpen={setOpen} />
    </div>
  );
}

/**
 * 侧边弹窗组件
 */
const SideDialog = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const { disconnect } = useDisconnect();
  const account = useAccount();
  const { data } = useBalance({
    address: account.address,
  });
  const { toast } = useToast();

  /**
   * 复制函数
   * @param address
   */
  const copyAddress = async (address: string) => {
    let dismissFn: () => void;
    try {
      await navigator.clipboard.writeText(address);
      const { dismiss } = toast({
        description: 'Copy Sucess.',
      });
      dismissFn = dismiss;
    } catch (err) {
      const { dismiss } = toast({
        variant: 'destructive',
        description: 'Copy Failure .',
        action: (
          <ToastAction altText="Try again" onClick={() => copyAddress(address)}>
            Try again
          </ToastAction>
        ),
      });
      dismissFn = dismiss;
    }
    setTimeout(() => {
      dismissFn();
    }, 3000);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="rounded-l-lg">
        <SheetHeader>
          <SheetTitle>Your Accounts</SheetTitle>
          <SheetDescription>
            {/* Make changes to your profile here. Click save when you're done. */}
          </SheetDescription>
        </SheetHeader>
        {account && account.isConnected && (
          <>
            {/* 头像部分 */}
            <div className="flex w-full relative mt-4">
              <Avatar className="p-2 w-12	h-12 bg-slate-100">
                <AvatarImage
                  src={account.connector!.icon || ''}
                  alt={account.connector!.name}
                />
              </Avatar>
              <div className="ml-2">
                <div className="flex">
                  <span className="text-base font-semibold text-zinc-800	">
                    {abbreviateAddress(account.address as string)}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-6 h-6"
                    onClick={() => {
                      copyAddress(account.address as string);
                    }}
                  >
                    <Copy size={16} className="stroke-gray-400" />
                  </Button>
                </div>
                <div className="text-neutral-400 text-sm">
                  {account && account?.chain?.name}
                </div>
              </div>
              <Button
                className="absolute right-0"
                variant="outline"
                size="icon"
                onClick={() => {
                  disconnect();
                  setOpen(false);
                }}
              >
                <LogOut className="stroke-zinc-500" />
              </Button>
            </div>
            {/* 下面余额部分 */}
            <div>
              {data?.formatted}
              {data?.symbol}
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};
