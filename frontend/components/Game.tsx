"use client";

import { useEffect, useMemo, useState } from "react";
import { createPublicClient, encodeFunctionData, http } from "viem";
import { celo } from "viem/chains";
import { useAccount, useSendTransaction, useWaitForTransactionReceipt } from "wagmi";
import { useMiniPay } from "@/hooks/useMiniPay";
import { contractConfig } from "@/lib/contract";
import {
  CELO_RPC,
  ZERO_ADDRESS,
  formatNumber,
  shortenAddress,
} from "@/lib/config";
import { sendMiniPayTransaction } from "@/lib/minipayTx";

const publicClient = createPublicClient({ chain: celo, transport: http(CELO_RPC) });
const diceSides = [1, 2, 3, 4, 5, 6];

interface DiceStats {
  rolls: number;
  wins: number;
  lastTarget: number;
  lastRoll: number;
}

interface LeaderboardRow {
  address: string;
  score: number;
}

export default function Game() {
  const { address, isConnected } = useAccount();
  const { isMiniPay } = useMiniPay();
  const [target, setTarget] = useState(3);
  const [totalRolls, setTotalRolls] = useState(0);
  const [stats, setStats] = useState<DiceStats>({ rolls: 0, wins: 0, lastTarget: 0, lastRoll: 0 });
  const [leaderboard, setLeaderboard] = useState<LeaderboardRow[]>([]);
  const [loadError, setLoadError] = useState(false);
  const [txError, setTxError] = useState<string | null>(null);
  const [miniPayHash, setMiniPayHash] = useState<`0x${string}`>();

  const { sendTransactionAsync, data: hash, isPending } = useSendTransaction();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash: miniPayHash ?? hash });

  const busy = isPending || isConfirming;
  const winRate = stats.rolls === 0 ? 0 : Math.round((stats.wins / stats.rolls) * 100);
  const lastOutcome = useMemo(() => {
    if (!stats.lastRoll) return "No roll yet";
    return stats.lastRoll === stats.lastTarget ? "Win" : "Miss";
  }, [stats.lastRoll, stats.lastTarget]);

  useEffect(() => {
    void loadStats();
  }, [address]);

  useEffect(() => {
    if (isSuccess) void loadStats();
  }, [isSuccess]);

  async function loadStats() {
    try {
      setLoadError(false);

      const total = (await publicClient.readContract({
        ...contractConfig,
        functionName: "totalRolls",
      })) as bigint;
      setTotalRolls(Number(total));

      if (address) {
        const [rolls, wins, lastTarget, lastRoll] = (await publicClient.readContract({
          ...contractConfig,
          functionName: "getUserStats",
          args: [address],
        })) as readonly [bigint, bigint, bigint, bigint];

        setStats({
          rolls: Number(rolls),
          wins: Number(wins),
          lastTarget: Number(lastTarget),
          lastRoll: Number(lastRoll),
        });
      }

      const [addresses, scores] = (await publicClient.readContract({
        ...contractConfig,
        functionName: "getLeaderboard",
      })) as readonly [readonly string[], readonly bigint[]];

      const rows: LeaderboardRow[] = [];
      for (let i = 0; i < 10; i++) {
        const rowAddress = addresses[i];
        const score = Number(scores[i]);
        if (rowAddress && rowAddress !== ZERO_ADDRESS && score > 0) {
          rows.push({ address: rowAddress, score });
        }
      }
      setLeaderboard(rows);
    } catch {
      setLoadError(true);
    }
  }

  async function handleRoll() {
    if (!isConnected || !address || busy) return;

    setTxError(null);
    setMiniPayHash(undefined);
    try {
      const data = encodeFunctionData({
        abi: contractConfig.abi,
        functionName: "roll",
        args: [BigInt(target)],
      });

      if (isMiniPay) {
        const nextHash = await sendMiniPayTransaction(contractConfig.address, data);
        setMiniPayHash(nextHash);
      } else {
        await sendTransactionAsync({
          account: address,
          to: contractConfig.address,
          data,
        } as Parameters<typeof sendTransactionAsync>[0]);
      }
    } catch (error) {
      setTxError(error instanceof Error ? error.message.slice(0, 180) : "Transaction rejected or failed.");
    }
  }

  return (
    <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
      <div className="panel p-5 md:p-6">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-medium uppercase text-mint">On-chain game</p>
              <h2 className="mt-1 text-3xl font-semibold tracking-normal text-white">Roll the dice</h2>
            </div>
            <div className="grid grid-cols-2 gap-2 text-right sm:grid-cols-3">
              <Stat label="Total rolls" value={formatNumber(totalRolls)} />
              <Stat label="Your wins" value={formatNumber(stats.wins)} />
              <Stat label="Win rate" value={`${winRate}%`} />
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-[220px_minmax(0,1fr)]">
            <div className="flex items-center justify-center rounded-lg border border-line bg-ink/60 p-6">
              <DiceFace value={stats.lastRoll || target} active={busy || stats.lastRoll > 0} />
            </div>

            <div className="flex flex-col justify-between gap-5">
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-300">Target side</span>
                  <span className="rounded-md border border-line px-2 py-1 text-sm text-sun">
                    {target}
                  </span>
                </div>
                <div className="grid grid-cols-6 gap-2">
                  {diceSides.map((side) => (
                    <button
                      key={side}
                      type="button"
                      onClick={() => setTarget(side)}
                      className={`h-12 rounded-md border text-base font-semibold transition ${
                        target === side
                          ? "border-mint bg-mint text-ink"
                          : "border-line bg-white/5 text-white hover:border-mint"
                      }`}
                    >
                      {side}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <Result label="Last target" value={stats.lastTarget || "-"} />
                <Result label="Last roll" value={stats.lastRoll || "-"} />
                <Result label="Outcome" value={lastOutcome} accent={lastOutcome === "Win"} />
              </div>

              <button
                type="button"
                onClick={handleRoll}
                disabled={!isConnected || busy}
                className="h-14 rounded-lg bg-mint px-5 text-base font-semibold text-ink transition hover:bg-[#58E39A] disabled:cursor-not-allowed disabled:bg-slate-600 disabled:text-slate-300"
              >
                {busy ? "Confirming..." : isConnected ? "Roll on Celo" : "Connect wallet"}
              </button>
              {loadError && (
                <p className="text-sm text-coral">Contract data will load after deployment address is set.</p>
              )}
              {txError && <p className="text-sm text-coral">{txError}</p>}
            </div>
          </div>
        </div>
      </div>

      <aside className="panel p-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">Leaderboard</h3>
          <span className="text-sm text-slate-400">Wins</span>
        </div>
        <div className="space-y-2">
          {leaderboard.length === 0 ? (
            <p className="rounded-md border border-line bg-white/5 px-3 py-4 text-sm text-slate-400">
              No winning rolls yet.
            </p>
          ) : (
            leaderboard.map((row, index) => (
              <div
                key={row.address}
                className="flex items-center justify-between rounded-md border border-line bg-white/5 px-3 py-3"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 text-sm font-semibold text-slate-500">#{index + 1}</span>
                  <span className="text-sm text-white">
                    {row.address === address ? "You" : shortenAddress(row.address)}
                  </span>
                </div>
                <span className="text-sm font-semibold text-sun">{formatNumber(row.score)}</span>
              </div>
            ))
          )}
        </div>
      </aside>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-line bg-white/5 px-3 py-2">
      <div className="text-lg font-semibold text-white">{value}</div>
      <div className="text-xs text-slate-400">{label}</div>
    </div>
  );
}

function Result({ label, value, accent = false }: { label: string; value: number | string; accent?: boolean }) {
  return (
    <div className="rounded-md border border-line bg-ink/60 px-3 py-3">
      <div className={`text-lg font-semibold ${accent ? "text-mint" : "text-white"}`}>{value}</div>
      <div className="text-xs text-slate-400">{label}</div>
    </div>
  );
}

function DiceFace({ value, active }: { value: number; active: boolean }) {
  const pips: Record<number, number[]> = {
    1: [4],
    2: [0, 8],
    3: [0, 4, 8],
    4: [0, 2, 6, 8],
    5: [0, 2, 4, 6, 8],
    6: [0, 2, 3, 5, 6, 8],
  };

  return (
    <div
      className={`grid h-36 w-36 grid-cols-3 gap-3 rounded-lg bg-white p-5 shadow-soft ${
        active ? "animate-lift" : ""
      }`}
      aria-label={`Dice ${value}`}
    >
      {Array.from({ length: 9 }).map((_, index) => (
        <span
          key={index}
          className={`h-5 w-5 rounded-full ${pips[value]?.includes(index) ? "bg-ink" : "bg-transparent"}`}
        />
      ))}
    </div>
  );
}

// game: 1776459898034

// game: 1776479326844

// game: 1776493400964

// game: 1776517957052

// game: 1776549486887

// game: 1776585049287

// game: 1776619065519

// game: 1776643974044

// game: 1776671807220

// game: 1776679162713

// game: 1776701164232

// game: 1776751555820

// game: 1776780896482

// game: 1776804256078

// game: 1776817005637
