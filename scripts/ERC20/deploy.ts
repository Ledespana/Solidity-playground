const hre = require("hardhat");
const { ethers } = hre;
import { parseFixed, BigNumber } from "@ethersproject/bignumber";

export function getBigNumberUsingDecimals(amount: number = 1, decimals: number = 18): BigNumber {
  return parseFixed(amount.toString(), decimals);
}

async function main() {

  // EXAMPLE
  // const name = "Lol";
  // const symbol = "LOL";
  // const initialSupply = getBigNumberUsingDecimals(1_000_000);
  // const BaseContract = await ethers.getContractFactory("MockERC20");
  // console.log(`Deploying MockERC20 to: ${hre.network.name}`);
  // const token = await BaseContract.deploy(name, symbol, walletTo, initialSupply).then((f: any) => f.deployed());
  // console.log("☑️ Verify with the following command:");
  // process.stdout.write("npx hardhat verify --network " + hre.network.name + " ");
  // process.stdout.write(token.address + " " + name + " " + symbol + " " + walletTo + " " + initialSupply + "\n");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
