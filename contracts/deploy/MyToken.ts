import { HardhatRuntimeEnvironment } from "hardhat/types";
import type { DeployFunction } from "hardhat-deploy/types";
import type { Entity } from "../typechain-types";
import { ethers } from 'ethers';

// Encode the values for name, location, and product description
//create 10 sets

const name1 = ethers.encodeBytes32String("AquaPolymers Inc.");
const location1 = ethers.encodeBytes32String("Houston, Texas, USA");
const productDesc1 = ethers.encodeBytes32String("Polyethylene Terephthalate");
const esgScore1 = 50;

const name2 = ethers.encodeBytes32String("GreenPlast Co.");
const location2 = ethers.encodeBytes32String("Frankfurt, Germany");
const productDesc2 = ethers.encodeBytes32String("Polypropylene (PP)");
const esgScore2 = 79;

const name3 = ethers.encodeBytes32String("EcoPlast Industries");
const location3 = ethers.encodeBytes32String("Shanghai, China");
const productDesc3 = ethers.encodeBytes32String("High-Density Polyethylene");
const esgScore3 = 61;

const name4 = ethers.encodeBytes32String("PurePlas Manufacturing Ltd");
const location4 = ethers.encodeBytes32String("Sao Paulo, Brazil");
const productDesc4 = ethers.encodeBytes32String("Low-Density PET film rolls");
const esgScore4 = 71;

const name5 = ethers.encodeBytes32String("OceanPlast Granule Solutions");
const location5 = ethers.encodeBytes32String("Tokyo, Japan");
const productDesc5 = ethers.encodeBytes32String("Polystyrene pellets");
const esgScore5 = 49;

const name6 = ethers.encodeBytes32String("PETForm Plastics");
const location6 = ethers.encodeBytes32String("Cairo, Egypt");
const productDesc6 = ethers.encodeBytes32String("PPET Preforms");
const esgScore6 = 64;

const name7 = ethers.encodeBytes32String("PlastMold Solutions");
const location7 = ethers.encodeBytes32String("Bangkok, Thailand");
const productDesc7 = ethers.encodeBytes32String("Molded PET Bottles");
const esgScore7 = 62;

const name8 = ethers.encodeBytes32String("PolyBottle Technologies");
const location8 = ethers.encodeBytes32String("Ho Chi Minh City, Vietnam");
const productDesc8 = ethers.encodeBytes32String("Final PET Bottles");
const esgScore8 = 78;

const name9 = ethers.encodeBytes32String("Global Waters Distribution Hub");
const location9 = ethers.encodeBytes32String("Kuala Lumpur, Malaysia");
const productDesc9 = ethers.encodeBytes32String("Bottled water cases");
const esgScore9 = 77;

const name10 = ethers.encodeBytes32String("NTUC Fairprice");
const location10 = ethers.encodeBytes32String("Singapore");
const productDesc10 = ethers.encodeBytes32String("Dasani water bottles");
const esgScore10 = 82;

const name = ethers.encodeBytes32String("Dasani Water Bottle");


const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const { deployments, getUnnamedAccounts, ethers } = hre;
    const { deploy } = deployments;
    const [entity1, entity2, entity3, entity4, entity5, entity6, entity7, entity8, entity9, entity10, esgAuthority] = await getUnnamedAccounts();

    // var num = 1;
    // Deploy the non-upgradeable Entity contract with constructor arguments
    const entityDeployment1 = await deploy("Shipment", {
        contract: "Shipment",
        from: entity4, // Deployer address
        args: [name], // Constructor arguments
        log: true, // Logs the deployment
    });

    // console.log("Entity", num, " deployed to:", entityDeployment1.address);
    // num++;

    // const entityDeployment2 = await deploy("Entity", {
    //     contract: "Entity",
    //     from: entity2, // Deployer address
    //     args: [entity2, esgAuthority, name2, location2, productDesc2, esgScore2], // Constructor arguments
    //     log: true, // Logs the deployment
    // });

    // console.log("Entity", num, " deployed to:", entityDeployment2.address);
    // num++;

    // const entityDeployment3 = await deploy("Entity", {
    //     contract: "Entity",
    //     from: entity3, // Deployer address
    //     args: [entity3, esgAuthority, name3, location3, productDesc3, esgScore3], // Constructor arguments
    //     log: true, // Logs the deployment
    // });

    // console.log("Entity", num, " deployed to:", entityDeployment3.address);
    // num++;

    // const entityDeployment4 = await deploy("Entity", {
    //     contract: "Entity",
    //     from: entity4, // Deployer address
    //     args: [entity4, esgAuthority, name4, location4, productDesc4, esgScore4], // Constructor arguments
    //     log: true, // Logs the deployment
    // });

    // console.log("Entity", num, " deployed to:", entityDeployment4.address);
    // num++;

    // const entityDeployment5 = await deploy("Entity", {
    //     contract: "Entity",
    //     from: entity5, // Deployer address
    //     args: [entity5, esgAuthority, name5, location5, productDesc5, esgScore5], // Constructor arguments
    //     log: true, // Logs the deployment
    // });

    // console.log("Entity", num, " deployed to:", entityDeployment5.address);
    // num++;

    // const entityDeployment6 = await deploy("Entity", {
    //     contract: "Entity",
    //     from: entity6, // Deployer address
    //     args: [entity6, esgAuthority, name6, location6, productDesc6, esgScore6], // Constructor arguments
    //     log: true, // Logs the deployment
    // });

    // console.log("Entity", num, " deployed to:", entityDeployment6.address);
    // num++;

    // const entityDeployment7 = await deploy("Entity", {
    //     contract: "Entity",
    //     from: entity7, // Deployer address
    //     args: [entity7, esgAuthority, name7, location7, productDesc7, esgScore7], // Constructor arguments
    //     log: true, // Logs the deployment
    // });

    // console.log("Entity", num, " deployed to:", entityDeployment7.address);
    // num++;

    // const entityDeployment8 = await deploy("Entity", {
    //     contract: "Entity",
    //     from: entity8, // Deployer address
    //     args: [entity8, esgAuthority, name8, location8, productDesc8, esgScore8], // Constructor arguments
    //     log: true, // Logs the deployment
    // });

    // console.log("Entity", num, " deployed to:", entityDeployment8.address);
    // num++;

    // const entityDeployment9 = await deploy("Entity", {
    //     contract: "Entity",
    //     from: entity9, // Deployer address
    //     args: [entity9, esgAuthority, name9, location9, productDesc9, esgScore9], // Constructor arguments
    //     log: true, // Logs the deployment
    // });

    // console.log("Entity", num, " deployed to:", entityDeployment9.address);
    // num++;

    // const entityDeployment10 = await deploy("Entity", {
    //     contract: "Entity",
    //     from: entity10, // Deployer address
    //     args: [entity10, esgAuthority, name10, location10, productDesc10, esgScore10], // Constructor arguments
    //     log: true, // Logs the deployment
    // });

    // console.log("Entity", num, " deployed to:", entityDeployment10.address);
    // num++;

};

func.id = "shipment-non-upgradeablev2"; // Updated deployment ID
func.tags = ["shipment"]; // Tag for running this deployment
func.dependencies = []; // No dependencies

export default func;
