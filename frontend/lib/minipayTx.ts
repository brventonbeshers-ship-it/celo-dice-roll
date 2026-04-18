import { createPublicClient, createWalletClient, custom, http, type Hex } from "viem";
import { celo } from "viem/chains";
import { CELO_RPC, MINIPAY_FEE_CURRENCY } from "./config";

type EthereumProvider = {
  request: (args: { method: string; params?: unknown }) => Promise<unknown>;
};

declare global {
  interface Window {
    ethereum?: EthereumProvider;
  }
}

const publicClient = createPublicClient({
  chain: celo,
  transport: http(CELO_RPC),
});

async function getMiniPayFeeParams(account: `0x${string}`, to: `0x${string}`, data: Hex) {
  const [gas, gasPriceHex, priorityFeeHex] = await Promise.all([
    publicClient.estimateGas({
      account,
      to,
      data,
      feeCurrency: MINIPAY_FEE_CURRENCY,
    } as any),
    publicClient.request({
      method: "eth_gasPrice",
      params: [MINIPAY_FEE_CURRENCY],
    } as any),
    publicClient.request({
      method: "eth_maxPriorityFeePerGas",
      params: [MINIPAY_FEE_CURRENCY],
    } as any),
  ]);

  return {
    gas: (gas * BigInt(120)) / BigInt(100),
    maxFeePerGas: BigInt(gasPriceHex as string),
    maxPriorityFeePerGas: BigInt(priorityFeeHex as string),
  };
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

  const feeParams = await getMiniPayFeeParams(account, to, data);

  return walletClient.sendTransaction({
    account,
    to,
    data,
    feeCurrency: MINIPAY_FEE_CURRENCY,
    ...feeParams,
  } as any);
}
