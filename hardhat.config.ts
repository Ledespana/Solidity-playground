import "hardhat-gas-reporter";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-solhint";
import "@typechain/hardhat";
import { HardhatUserConfig } from "hardhat/config";
import "./hardhat.task";
require("@openzeppelin/hardhat-upgrades");
require("dotenv").config();

import { CHAIN_IDS } from "./constants";

export function getNetworkURL(networkId: number): string {
  switch (networkId) {
    case CHAIN_IDS.ETHEREUM_MAINNET:
      return `https://mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`;
    case CHAIN_IDS.ETHEREUM_GOERLI:
      return `https://goerli.infura.io/v3/${process.env.INFURA_PROJECT_ID}`;
    case CHAIN_IDS.ETHEREUM_SEPOLIA:
      return `https://sepolia.infura.io/v3/${process.env.INFURA_PROJECT_ID}`;
    case CHAIN_IDS.POLYGON_MAINNET:
      return `https://polygon-mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`;
    case CHAIN_IDS.POLYGON_MUMBAI:
      return `https://polygon-mumbai.infura.io/v3/${process.env.INFURA_PROJECT_ID}`;
    case CHAIN_IDS.OPTIMISM_MAINNET:
      return `https://mainnet.optimism.io`;
    case CHAIN_IDS.ARBITRUM_MAINNET:
      return "https://arb1.arbitrum.io/rpc";
    case CHAIN_IDS.ARBITRUM_RINKEBY:
      return `https://arbitrum-rinkeby.infura.io/v3/${process.env.INFURA_PROJECT_ID}`;
    case CHAIN_IDS.AVALANCHE_MAINNET:
      return "https://api.avax.network/ext/bc/C/rpc";
    case CHAIN_IDS.AVALANCHE_FUJI:
      return "https://api.avax-test.network/ext/bc/C/rpc";
    case CHAIN_IDS.BNB_SMART_CHAIN_MAINNET:
      return "https://bsc-dataseed.binance.org/";
    case CHAIN_IDS.BNB_SMART_CHAIN_TESTNET_CHAPEL:
      return "https://data-seed-prebsc-1-s1.binance.org:8545/";
    default:
      return "";
  }
}

function getArchiveNodeURL(networkId: number): string {
  switch (networkId) {
    case CHAIN_IDS.ETHEREUM_MAINNET:
      return `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`;

    case CHAIN_IDS.ETHEREUM_GOERLI:
      return `https://eth-goerli.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`;
    default:
      return `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`;
  }
}

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
const accounts = process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [];
export default {
  networks: {
    hardhat: {
      allowUnlimitedContractSize: true,
      chainId: 1337,
      forking: {
        url: getArchiveNodeURL(CHAIN_IDS.ETHEREUM_GOERLI),
        blockNumber: 8619612,
      },
      accounts: {
        mnemonic: process.env.DEV_MNEMONIC,
      },
    },
    /** Ethereum **/
    mainnet: {
      url: getNetworkURL(CHAIN_IDS.ETHEREUM_MAINNET),
      accounts: accounts,
    },
    goerli: {
      url: getNetworkURL(CHAIN_IDS.ETHEREUM_GOERLI),
      accounts,
    },
    sepolia: {
      url: getNetworkURL(CHAIN_IDS.ETHEREUM_SEPOLIA),
      accounts, 
    },
    polygonMumbai: {
      url: getNetworkURL(CHAIN_IDS.POLYGON_MUMBAI),
      accounts,
    },
    polygon: {
      url: getNetworkURL(CHAIN_IDS.POLYGON_MAINNET),
      accounts: accounts,
    },

    /** Optimism **/
    optimisticEthereum: {
      url: `https://mainnet.optimism.io`,
      accounts: accounts,
    },

    arbitrumOne: {
      url: getNetworkURL(CHAIN_IDS.ARBITRUM_MAINNET),
      accounts: accounts,
    },
    /** Avalanche **/
    avalanche: {
      url: getNetworkURL(CHAIN_IDS.AVALANCHE_MAINNET),
      accounts: accounts,
    },
    fuji: {
      url: getNetworkURL(CHAIN_IDS.AVALANCHE_FUJI),
      accounts: accounts,
    },
    /** BNB Smart Chain **/
    bsc: {
      url: getNetworkURL(CHAIN_IDS.BNB_SMART_CHAIN_MAINNET),
      chainId: CHAIN_IDS.BNB_SMART_CHAIN_MAINNET,
      accounts: accounts,
    },
    bscTestnet: {
      url: getNetworkURL(CHAIN_IDS.BNB_SMART_CHAIN_TESTNET_CHAPEL),
      chainId: CHAIN_IDS.BNB_SMART_CHAIN_TESTNET_CHAPEL,
      accounts: accounts,
    },
  },
  solidity: {
    compilers: [
      {
        version: "0.8.7",
        settings: {
          optimizer: {
            enabled: true,
            runs: 1000,
          },
        },
      },
      {
        version: "0.8.17",
        settings: {
          optimizer: {
            enabled: true,
            runs: 1000,
          },
          viaIR: true,
        },
      },
    ],
  },
  // Reference:
  // /node_modules/@nomiclabs/hardhat-etherscan/src/types.ts
  // https://hardhat.org/plugins/nomiclabs-hardhat-etherscan.html#multiple-api-keys-and-alternative-block-explorers
  etherscan: {
    apiKey: {
      mainnet: process.env.ETHERSCAN_API_KEY,
      goerli: process.env.ETHERSCAN_API_KEY,
      sepolia: process.env.ETHERSCAN_API_KEY,
      polygonMumbai: process.env.POLYSCAN_API_KEY,
      arbitrumOne: process.env.ARBISCAN_API_KEY,
      polygon: process.env.POLYSCAN_API_KEY,
      optimisticEthereum: process.env.OPTIMISM_API_KEY,
      avalanche: process.env.SNOWTRACE_API_KEY,
      avalancheFujiTestnet: process.env.SNOWTRACE_API_KEY,
      bsc: process.env.BSCSCAN_API_KEY,
      bscTestnet: process.env.BSCSCAN_API_KEY,
    },
  },
  gasReporter: {
    currency: "USD",
    coinmarketcap: process.env.COIN_MARKET_CAP_API_KEY,
    token: "ETH",
    gasPriceApi: process.env.ETHERSCAN_API_KEY,
  },
} as unknown as HardhatUserConfig;
