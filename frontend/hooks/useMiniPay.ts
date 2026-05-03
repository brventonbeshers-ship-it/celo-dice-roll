"use client";

import { useCallback, useEffect, useState } from "react";
import { useAccount, useConnect } from "wagmi";

interface MiniPayState {
  isMiniPay: boolean;
  address: string | null;
  isConnected: boolean;
  connect: () => Promise<void>;
}

let hasAttemptedMiniPayAutoConnect = false;

export function useMiniPay(): MiniPayState {
  const [isMiniPay, setIsMiniPay] = useState(false);
  const { address, isConnected } = useAccount();
  const { connectAsync, connectors } = useConnect();

  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).ethereum?.isMiniPay) {
      setIsMiniPay(true);
    }
  }, []);

  const connect = useCallback(async () => {
    if (!isMiniPay || isConnected) return;
    const connector = connectors.find((item) => item.id === "injected") ?? connectors[0];
    if (!connector) return;
    try {
      await connectAsync({ connector });
    } catch (error) {
      console.warn("MiniPay connection failed", error);
    }
  }, [connectAsync, connectors, isConnected, isMiniPay]);

  useEffect(() => {
    if (!isMiniPay || isConnected || hasAttemptedMiniPayAutoConnect) return;
    hasAttemptedMiniPayAutoConnect = true;
    void connect();
  }, [connect, isConnected, isMiniPay]);

  return { isMiniPay, address: address ?? null, isConnected, connect };
}

// minipay: 1776460012985

// minipay: 1776479373395

// minipay: 1776493410465

// minipay: 1776518100941

// minipay: 1776549451386

// minipay: 1776585096340

// minipay: 1776619115602

// minipay: 1776644039602

// minipay: 1776672070636

// minipay: 1776679114967

// minipay: 1776701104784

// minipay: 1776751343482

// minipay: 1776780649215

// minipay: 1776804090006

// minipay: 1776817234220

// minipay: 1776833985676

// minipay: 1776862791338

// minipay: 1776876056063

// minipay: 1776889259565

// minipay: 1776938715291

// minipay: 1776962018626

// minipay: 1777000954212

// minipay: 1777024468180

// minipay: 1777036835292

// minipay: 1777066168541

// minipay: 1777102997180

// minipay: 1777118916510

// minipay: 1777168934842

// minipay: 1777194095051

// minipay: 1777237075510

// minipay: 1777265730691

// minipay: 1777278154805

// minipay: 1777328426037

// minipay: 1777355818073

// minipay: 1777447634811

// minipay: 1777586545672

// minipay: 1777612769393

// minipay: 1777656356704

// minipay: 1777699578275

// minipay: 1777798188334
