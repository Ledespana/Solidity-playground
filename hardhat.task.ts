import { task } from "hardhat/config";
import { ethers } from "ethers";
import { updateBlockListAddress, updateFeeRecipients, updateContractOwner } from "./utils/deployUtils";
const { types } = require("hardhat/config");

task("generate").setAction(async () => {
  const wallet = ethers.Wallet.createRandom();
  console.log(wallet.address);
  console.log(wallet.privateKey);
});
