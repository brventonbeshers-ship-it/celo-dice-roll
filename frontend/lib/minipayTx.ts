import { createPublicClient, formatUnits, http, numberToHex, type Hex } from "viem";
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

const balanceOfAbi = [
  {
    inputs: [{ name: "account", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
] as const;

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

async function getMiniPayAccount(provider: EthereumProvider) {
  const accounts = (await provider.request({ method: "eth_accounts" })) as `0x${string}`[];
  if (accounts?.[0]) return accounts[0];

  const requestedAccounts = (await provider.request({ method: "eth_requestAccounts" })) as `0x${string}`[];
  return requestedAccounts?.[0];
}

function getRpcErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  try {
    return JSON.stringify(error);
  } catch {
    return String(error);
  }
}

export async function sendMiniPayTransaction(to: `0x${string}`, data: Hex) {
  if (typeof window === "undefined" || !window.ethereum?.request) {
    throw new Error("MiniPay provider not found.");
  }

  const account = await getMiniPayAccount(window.ethereum);
  if (!account) {
    throw new Error("MiniPay account not found.");
  }

  const feeParams = await getMiniPayFeeParams(account, to, data);
  const usdBalance = await publicClient.readContract({
    address: MINIPAY_FEE_CURRENCY,
    abi: balanceOfAbi,
    functionName: "balanceOf",
    args: [account],
  });
  const requiredFee = feeParams.gas * feeParams.maxFeePerGas;

  if (usdBalance < requiredFee) {
    throw new Error(
      `Not enough USDm for gas. Balance: ${formatUnits(usdBalance, 18)} USDm, required up to: ${formatUnits(requiredFee, 18)} USDm.`,
    );
  }

  const request = {
    from: account,
    to,
    data,
    type: "0x7b",
    feeCurrency: MINIPAY_FEE_CURRENCY,
    gas: numberToHex(feeParams.gas),
    maxFeePerGas: numberToHex(feeParams.maxFeePerGas),
    maxPriorityFeePerGas: numberToHex(feeParams.maxPriorityFeePerGas),
  };

  try {
    return (await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [request],
    })) as `0x${string}`;
  } catch (error) {
    throw new Error(`MiniPay rejected transaction: ${getRpcErrorMessage(error)}`);
  }
}
