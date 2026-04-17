# Celo Dice Roll

On-chain dice game for Celo and MiniPay. Players pick a target side, roll the dice through a Celo transaction, and track personal and global stats.

Contract: `0x943DfC4aFe76B2042031556516799ba03396B3F3`
CeloScan: https://celoscan.io/address/0x943DfC4aFe76B2042031556516799ba03396B3F3#code

## Project Structure

- `contracts/` - Solidity contract deployed to Celo mainnet
- `frontend/` - Next.js MiniApp frontend with MiniPay support
- `sdk/` - TypeScript SDK used by the frontend
- `scripts/` - Hardhat deployment script

## Commands

```bash
npm install
npm run compile
npm run deploy
```

```bash
cd sdk
npm install
npm run build
```

```bash
cd frontend
npm install
npm run build
```
