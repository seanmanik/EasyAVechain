import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@vechain/sdk-hardhat-plugin";
import '@vechain/sdk-hardhat-plugin'
import "@openzeppelin/hardhat-upgrades";
import "hardhat-deploy";
import "hardhat-deploy-ethers";

const accounts = ['f519df21ea7ad71c5c7ea63d5123732525b1dbbc6ea3f03b7d440916ad80f6f0'];

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    vechain_testnet: {
      url: "https://testnet.vechain.org",
      accounts,
      // optionally use fee delegation
      delegator: {
        delegatorUrl: "https://sponsor-testnet.vechain.energy/by/90"
      },
      enableDelegation: true,
    },
    vechain_mainnet: {
      url: "https://mainnet.vechain.org",
      accounts,
    },
  },
};

export default config;
