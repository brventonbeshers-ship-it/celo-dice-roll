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

// abi: 1776479396880

// abi: 1776493341776

// abi: 1776518022835

// abi: 1776549553425

// abi: 1776585094090

// abi: 1776618913251

// abi: 1776644214344

// abi: 1776671845119

// abi: 1776679013745

// abi: 1776700987586

// abi: 1776751446979

// abi: 1776780780972

// abi: 1776804249603

// abi: 1776816997148

// abi: 1776833942144

// abi: 1776862837933

// abi: 1776876067817

// abi: 1776889454521

// abi: 1776938711047

// abi: 1776961810587

// abi: 1777001147331

// abi: 1777024556464

// abi: 1777037012717

// abi: 1777066114391

// abi: 1777103134636

// abi: 1777118869359

// abi: 1777169009748

// abi: 1777183874294

// abi: 1777194021700

// abi: 1777214524707

// abi: 1777237282123

// abi: 1777265697187

// abi: 1777278160060

// abi: 1777328249214

// abi: 1777447638050

// abi: 1777612807533

// abi: 1777656612256

// abi: 1777699485508

// abi: 1777719592862

// abi: 1777756026360

// abi: 1777798079288

// abi: 1777880127414
