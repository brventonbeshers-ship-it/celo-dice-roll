"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useMiniPay } from "@/hooks/useMiniPay";

export default function Header() {
  const { isMiniPay, isConnected, connect } = useMiniPay();

  return (
    <header className="sticky top-0 z-20 border-b border-line bg-ink/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6">
        <div>
          <h1 className="text-xl font-semibold tracking-normal text-white">Celo Dice Roll</h1>
          <p className="text-sm text-slate-400">Pick a side, roll on-chain.</p>
        </div>
        {isMiniPay ? (
          !isConnected && (
            <button
              type="button"
              onClick={() => void connect()}
              className="rounded-md border border-white/20 px-3 py-2 text-sm font-medium text-white transition hover:bg-white/10"
            >
              Connect MiniPay
            </button>
          )
        ) : (
          <ConnectButton />
        )}
      </div>
    </header>
  );
}

// header: 1776459824457

// header: 1776479377658

// header: 1776493357037

// header: 1776518092430

// header: 1776549444334

// header: 1776584990007

// header: 1776619105838

// header: 1776644117042

// header: 1776671913948

// header: 1776679258981

// header: 1776701199755

// header: 1776751387495

// header: 1776780797966

// header: 1776804055985

// header: 1776817231952

// header: 1776834042007

// header: 1776862829426

// header: 1776876104746

// header: 1776889362265

// header: 1776938759213

// header: 1776961961952

// header: 1777001124803

// header: 1777024545692

// header: 1777036982660

// header: 1777066160013

// header: 1777102898966

// header: 1777118948577

// header: 1777168817914

// header: 1777193974371

// header: 1777214395587
