const axios = require('axios');
const hre = require("hardhat");

async function getContractSourceCode(contractAddress) {
    const apiKey = process.env.ETHERSCAN_API_KEY;
    const url = `https://api.etherscan.io/api?module=contract&action=getsourcecode&address=${contractAddress}&apikey=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data && response.data.result && response.data.result[0]) {
            return response.data.result[0].SourceCode;
        }
        return null;
    } catch (error) {
        console.error(error);
        return null;
    }
}

function extractTwitterUrls(sourceCode) {
    const twitterUrlPattern = /https:\/\/twitter\.com\/[\w\d\/]+/g;
    // todo add X.com option
    return sourceCode.match(twitterUrlPattern) || [];
}

async function main() {
  const contractAddress = '0x576e2bed8f7b46d34016198911cdf9886f78bea7';

  console.log(`Fetching source code for contract: ${contractAddress}`);
  const sourceCode = await getContractSourceCode(contractAddress);
  if (sourceCode) {
      const twitterUrls = extractTwitterUrls(sourceCode);
      console.log("Extracted Twitter URLs:", twitterUrls);
  } else {
      console.log("No source code found or the contract is not verified.");
  }
}

main()
 .then(() => process.exit(0))
 .catch((error) => {
   console.error(error);
   process.exit(1);
 });
