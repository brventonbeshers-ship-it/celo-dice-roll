import { CONTRACT_ADDRESS } from "./config";

export const CELO_DICE_ROLL_ABI = [
  {
    inputs: [{ name: "target", type: "uint256" }],
    name: "roll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "totalRolls",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ name: "player", type: "address" }],
    name: "getUserStats",
    outputs: [
      { name: "rolls", type: "uint256" },
      { name: "wins", type: "uint256" },
      { name: "latestTarget", type: "uint256" },
      { name: "latestRoll", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getLeaderboard",
    outputs: [
      { name: "", type: "address[10]" },
      { name: "", type: "uint256[10]" },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

export const contractConfig = {
  address: CONTRACT_ADDRESS as `0x${string}`,
  abi: CELO_DICE_ROLL_ABI,
} as const;

// abi: 1776459844525
