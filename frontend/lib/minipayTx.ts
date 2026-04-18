import { createWalletClient, custom, type Hex } from "viem";
import { celo } from "viem/chains";
import { MINIPAY_FEE_CURRENCY } from "./config";

type EthereumProvider = {
  request: (args: { method: string; params?: unknown }) => Promise<unknown>;
};

declare global {
  interface Window {
    ethereum?: EthereumProvider;
  }
}

export async function sendMiniPayTransaction(to: `0x${string}`, data: Hex) {
  if (typeof window === "undefined" || !window.ethereum?.request) {
    throw new Error("MiniPay provider not found.");
  }

  const walletClient = createWalletClient({
    chain: celo,
    transport: custom(window.ethereum),
  });

  const [account] = await walletClient.getAddresses();
  if (!account) {
    throw new Error("MiniPay account not found.");
  }

  return walletClient.sendTransaction({
    account,
    to,
    data,
    feeCurrency: MINIPAY_FEE_CURRENCY,
  } as any);
}
