import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { celo } from "wagmi/chains";

export const config = getDefaultConfig({
  appName: "Celo Dice Roll",
  projectId: "celo-dice-roll-minipay-app",
  chains: [celo],
  ssr: true,
});

// wagmi: 1776459949116

// wagmi: 1776479464410

// wagmi: 1776493520911

// wagmi: 1776518063929
