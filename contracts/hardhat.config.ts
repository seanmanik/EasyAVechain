import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@vechain/sdk-hardhat-plugin";
import '@vechain/sdk-hardhat-plugin'
import "@openzeppelin/hardhat-upgrades";
import "hardhat-deploy";
import "hardhat-deploy-ethers";

const accounts = [
  'f519df21ea7ad71c5c7ea63d5123732525b1dbbc6ea3f03b7d440916ad80f6f0',
  'c6877574d06e5456a4f7beb1da05b0cb3fcece3ab66615dc26f73d5bf6c1361c',
  'eb1fd69890a5e68008536e9442411d3a91b3f91a2516cbe898fbd0febfe8f151',
  'c12c0607af6903d3df56b2240b3fb202fd7a86dc419521cc6ff3c10681e30d19',
  'b0c86c545559f630798991a4be4e0a84cb74ff3b9c70ac8785092b54a060bba6'];

  // entity#1, esg authority
const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    vechain_testnet: {
      url: "https://testnet.vechain.org",
      accounts,
      // optionally use fee delegation 
      // delegator: {
      //   delegatorUrl: "https://sponsor-testnet.vechain.energy/by/90"
      // },
      // enableDelegation: true,
    },
    vechain_mainnet: {
      url: "https://mainnet.vechain.org",
      accounts,
    },
  },
};

export default config;
