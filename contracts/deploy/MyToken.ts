import { HardhatRuntimeEnvironment } from "hardhat/types";
import type { DeployFunction } from "hardhat-deploy/types";
import type { Entity } from "../typechain-types";
import { ethers } from 'ethers';

// Encode the values for name, location, and product description
const name = ethers.encodeBytes32String("AquaPolymers Inc.");
const location = ethers.encodeBytes32String("Houston, Texas, USA");
const productDesc = ethers.encodeBytes32String("Polyethylene Terephthalate (PET)");

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const { deployments, getUnnamedAccounts, ethers } = hre;
    const { deploy } = deployments;
    const [entity1, entity2, entity3, entity4, esgAuthority] = await getUnnamedAccounts();

    // Deploy the non-upgradeable Entity contract with constructor arguments
    const entityDeployment = await deploy("Entity", {
        contract: "Entity",
        from: entity1, // Deployer address
        args: [entity1, esgAuthority, name, location, productDesc], // Constructor arguments
        log: true, // Logs the deployment
    });



    // Log the deployed contract's address
    console.log("Entity is deployed at:", entityDeployment.address);
};

func.id = "entity-non-upgradeablev2"; // Updated deployment ID
func.tags = ["entity"]; // Tag for running this deployment
func.dependencies = []; // No dependencies

export default func;
