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
      <head>
        <meta
          name="talentapp:project_verification"
          content="82c3cd9bd10bea6cbe5361e2c9625a1c8472e1e25f6e3057b2e186200cb54e8513a7d44f04fd4356544d91a0875472e81a41369e0441a2d54277ff8cc31f7498"
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

// layout: 1776459942303

// layout: 1776479444198

// layout: 1776493483553

// layout: 1776518141897

// layout: 1776549501424

// layout: 1776584936558

// layout: 1776618920737

// layout: 1776644113793

// layout: 1776672018432

// layout: 1776679152982

// layout: 1776700975821

// layout: 1776751335987

// layout: 1776780790478
