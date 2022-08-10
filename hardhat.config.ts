import * as dotenv from "dotenv";
import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-web3";

import "@typechain/hardhat";

import "@nomicfoundation/hardhat-toolbox";
import "hardhat-gas-reporter";
import "hardhat-watcher";
import "./tasks/deploy.ts";

dotenv.config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
          version: "0.8.16",
          settings: {
            optimizer: {
              enabled: true,
              runs: 200
            }
          }
        },
    ]
  },

  networks: {
    ropsten: {
      url: process.env.ROPSTEN_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    // hardhat:{
    //   forking: {
    //     url: "https://data-seed-prebsc-1-s1.binance.org:8545/"
    //   }
    // },

    // deploying more on ftm testnet cos their faucet gives gas readily

    ftm: {
      url: "https://rpc.ftm.tools/",
      accounts: [process.env.PRIVATE_KEY || ""],
    },
    ftmtestnet: {
      url: "https://rpc.testnet.fantom.network/",
      accounts: [process.env.PRIVATE_KEY || ""],
      loggingEnabled: true
    },
    
    bsc:{
      url:"https://bsc-dataseed1.binance.org",
      accounts: [process.env.PRIVATE_KEY || ""],
    },
    bsctestnet: {
      url: "https://data-seed-prebsc-1-s2.binance.org:8545/",
      accounts: [process.env.PRIVATE_KEY || ""],
      //gasPrice: 20e9,
      //gas: 25e6,
      //gasMultiplier: 2
    },
  },

  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },

  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },

  watcher: {
    compilation: {
      tasks: ["compile"],
    }
  },

  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  
};

export default config;
