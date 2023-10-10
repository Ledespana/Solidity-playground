const hre = require("hardhat");
const { ethers } = hre;
import { parseFixed, BigNumber } from "@ethersproject/bignumber";

export function getBigNumberUsingDecimals(amount: number = 1, decimals: number = 18): BigNumber {
  return parseFixed(amount.toString(), decimals);
}

async function main() {
  const BaseContract = await ethers.getContractFactory("CoinFlipExercise");
  console.log(`Deploying CoinflipExercise to: ${hre.network.name}`);
  const CoinflipExercise = await BaseContract.deploy().then((f: any) => f.deployed());
  console.log("☑️ Verify with the following command:");
  process.stdout.write("npx hardhat verify --network " + process.env.HARDHAT_NETWORK + " ");
  process.stdout.write(CoinflipExercise.address + "");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
