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
    EntityInterface[] public rawMaterials;
    EntityInterface[] public processors;
    EntityInterface public distributor;
    EntityInterface public retailer;
    bytes32 public name;
    
    // Constructor to initialize the contract
    constructor(bytes32 initialName)  {
        name = initialName;
    }
    
    // Function to add a new Entity contract address to the list
    function addRawMaterials(address _entityAddress) public {
        // Add the address to the array
        rawMaterials.push(EntityInterface(_entityAddress));
    }

    function addProcessors(address _entityAddress) public {
        // Add the address to the array
        processors.push(EntityInterface(_entityAddress));
    }

    function setDistributor(address _entityAddress) public {
        distributor = EntityInterface(_entityAddress);
    }

    function setRetailer(address _entityAddress) public {
        retailer = EntityInterface(_entityAddress);
    }
}
