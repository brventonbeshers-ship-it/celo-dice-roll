import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { celo } from "wagmi/chains";

export const config = getDefaultConfig({
  appName: "Celo Dice Roll",
  projectId: "celo-dice-roll-minipay-app",
  chains: [celo],
  ssr: true,
});
