const hre = require("hardhat");

async function main() {
  const CeloDiceRoll = await hre.ethers.getContractFactory("CeloDiceRoll");
  console.log("Deploying CeloDiceRoll to Celo mainnet...");
  const contract = await CeloDiceRoll.deploy();
  await contract.waitForDeployment();

  const address = await contract.getAddress();
  console.log(`CeloDiceRoll deployed to: ${address}`);

  console.log("Waiting for CeloScan indexing...");
  await new Promise((resolve) => setTimeout(resolve, 30000));

  try {
    await hre.run("verify:verify", { address, constructorArguments: [] });
    console.log("Verified on CeloScan");
  } catch (error) {
    console.log("Verification failed:", error.message);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
