import type { Metadata } from "next";
import { Providers } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Celo Dice Roll",
  description: "On-chain dice game built for Celo and MiniPay.",
  openGraph: {
    title: "Celo Dice Roll",
    description: "Roll dice on Celo, track wins, and climb the leaderboard.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
