"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useMiniPay } from "@/hooks/useMiniPay";

export default function Header() {
  const { isMiniPay } = useMiniPay();

  return (
    <header className="sticky top-0 z-20 border-b border-line bg-ink/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6">
        <div>
          <h1 className="text-xl font-semibold tracking-normal text-white">Celo Dice Roll</h1>
          <p className="text-sm text-slate-400">Pick a side, roll on-chain.</p>
        </div>
        {!isMiniPay && <ConnectButton />}
      </div>
    </header>
  );
}

// header: 1776459824457
