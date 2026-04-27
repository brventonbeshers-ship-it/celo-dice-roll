"use client";

import "@rainbow-me/rainbowkit/styles.css";
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { config } from "@/lib/wagmi";

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={darkTheme({
            accentColor: "#35D07F",
            accentColorForeground: "#07110C",
            borderRadius: "medium",
          })}
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

// providers: 1776459999153

// providers: 1776479461150

// providers: 1776493459027

// providers: 1776518155893

// providers: 1776549542777

// providers: 1776585001766

// providers: 1776619102604

// providers: 1776643978311

// providers: 1776671849383

// providers: 1776679018981

// providers: 1776701043559

// providers: 1776751392777

// providers: 1776780699130

// providers: 1776804260336

// providers: 1776817040708

// providers: 1776833990945

// providers: 1776862779316

// providers: 1776876060323

// providers: 1776889444775

// providers: 1776938652794

// providers: 1776961903927

// providers: 1777000994266

// providers: 1777024543453

// providers: 1777036852309

// providers: 1777066228358

// providers: 1777102993952

// providers: 1777119063701

// providers: 1777168894318

// providers: 1777183799516

// providers: 1777194057663

// providers: 1777214637243

// providers: 1777237313146

// providers: 1777265608885

// providers: 1777278342996

// providers: 1777328155840
