export const CONTRACT_ADDRESS =
  process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "0x943DfC4aFe76B2042031556516799ba03396B3F3";
export const CELO_RPC = "https://forno.celo.org";
export const MINIPAY_FEE_CURRENCY = "0x765DE816845861e75A25fCA122bb6898B8B1282a" as const;
export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

export function shortenAddress(address: string, head = 6, tail = 4): string {
  if (!address) return "";
  return `${address.slice(0, head)}...${address.slice(-tail)}`;
}

export function formatNumber(value: number): string {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`;
  return value.toLocaleString();
}

// cfg: 1776459887468

// cfg: 1776479321596

// cfg: 1776493463283

// cfg: 1776518008852

// cfg: 1776549378853

// cfg: 1776584903237

// cfg: 1776618971740

// cfg: 1776644175162

// cfg: 1776671908441

// cfg: 1776679099952

// cfg: 1776701206251

// cfg: 1776751444701

// cfg: 1776780755919

// cfg: 1776804124323

// cfg: 1776817180860

// cfg: 1776833883239

// cfg: 1776862843185

// cfg: 1776875950870

// cfg: 1776889310774

// cfg: 1776938596221

// cfg: 1776961867485

// cfg: 1777000933382

// cfg: 1777024528673

// cfg: 1777036856552

// cfg: 1777066112137

// cfg: 1777102940127

// cfg: 1777118951829

// cfg: 1777183757822

// cfg: 1777194019474

// cfg: 1777237232464
