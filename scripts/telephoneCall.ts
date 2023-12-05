const hre = require("hardhat");
const { ethers } = hre;

async function main() {
  const BaseContract = await ethers.getContractFactory("TelephoneCall");
  console.log(`Deploying contract to: ${hre.network.name}`);
  const exercise = await BaseContract.deploy().then((f: any) => f.deployed());
  console.log("☑️ Verify with the following command:");
  process.stdout.write("npx hardhat verify --network " + process.env.HARDHAT_NETWORK + " ");
  process.stdout.write(exercise.address + "");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
