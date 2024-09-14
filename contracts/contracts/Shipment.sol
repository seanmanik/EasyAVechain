// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface EntityInterface {
    function carbonUsage() external view returns (uint256);
    function waterUsage() external view returns (uint256);
    function plasticUsage() external view returns (uint256);
    function produceWeight() external view returns (uint256);
    function esgScore() external view returns (uint8);
    function lastUpdated() external view returns (uint256);
}

contract Shipment {

    // Array to store the addresses of Entity contracts
    EntityInterface[] public entities;

    // Function to add a new Entity contract address to the list
    function addEntity(address _entityAddress) public {
        // Add the address to the array
        entities.push(EntityInterface(_entityAddress));
    }

    // Function to get the number of Entity contracts added
    function getEntityCount() public view returns (uint256) {
        return entities.length;
    }

    // Function to retrieve carbon usage from a specific Entity contract by index
    function getCarbonUsage(uint256 index) public view returns (uint256) {
        require(index < entities.length, "Invalid index");
        return entities[index].carbonUsage();
    }

    // Function to retrieve water usage from a specific Entity contract by index
    function getWaterUsage(uint256 index) public view returns (uint256) {
        require(index < entities.length, "Invalid index");
        return entities[index].waterUsage();
    }

    // Function to retrieve plastic usage from a specific Entity contract by index
    function getPlasticUsage(uint256 index) public view returns (uint256) {
        require(index < entities.length, "Invalid index");
        return entities[index].plasticUsage();
    }

    // Function to retrieve produce weight from a specific Entity contract by index
    function getProduceWeight(uint256 index) public view returns (uint256) {
        require(index < entities.length, "Invalid index");
        return entities[index].produceWeight();
    }

    // Function to retrieve ESG score from a specific Entity contract by index
    function getEsgScore(uint256 index) public view returns (uint8) {
        require(index < entities.length, "Invalid index");
        return entities[index].esgScore();
    }

    // Function to retrieve the last updated timestamp from a specific Entity contract by index
    function getLastUpdated(uint256 index) public view returns (uint256) {
        require(index < entities.length, "Invalid index");
        return entities[index].lastUpdated();
    }
}
