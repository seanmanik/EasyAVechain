import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@vechain/sdk-hardhat-plugin";
import '@vechain/sdk-hardhat-plugin'
import "@openzeppelin/hardhat-upgrades";
import "hardhat-deploy";
import "hardhat-deploy-ethers";

const accounts = [
  'f519df21ea7ad71c5c7ea63d5123732525b1dbbc6ea3f03b7d440916ad80f6f0', // 1
  'c6877574d06e5456a4f7beb1da05b0cb3fcece3ab66615dc26f73d5bf6c1361c', // 2
  'eb1fd69890a5e68008536e9442411d3a91b3f91a2516cbe898fbd0febfe8f151', // 3
  'c12c0607af6903d3df56b2240b3fb202fd7a86dc419521cc6ff3c10681e30d19', // 4
  'b1a2a71c316948c833ec86cba6ed8691082412ccbb4117b96d39717fd146946d', // 5
  '70cf85072d11ec2a1d157b8f6ef9cbb44ed012f866494dbc93db0bf7a6874c57', // 6
  'cf1ef5b91a79d29617ced52a748909b86bcb8d97b677620e855d46a50fca7929', // 7
  '3dee6a1b0f53689476da7888fb0e0aa6716972b7ab3f6fd2e3277ed2039adcfb', // 8
  'f5b117c44f93985fb567eef7c10ccd47a0356fd3f6db371c5070d5f894b6d34d', // 9
  'adce001e13ef1b7ea8ad441b627a13238036ef95c4a64bf02da3d08a7ba1ce36', // 10
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
