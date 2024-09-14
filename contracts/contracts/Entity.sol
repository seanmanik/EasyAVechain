// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
import "@openzeppelin/contracts/access/AccessControl.sol";

pragma solidity ^0.8.20;

contract Entity is AccessControl {

    bytes32 public constant ESG_MANAGER_ROLE = keccak256("ESG_MANAGER_ROLE");

    bytes32 public name;
    bytes32 public location; 
    bytes32 public productDescription;
    uint256 public carbonUsage;
    uint256 public waterUsage;
    uint256 public plasticUsage;
    uint256 public produceWeight;
    uint8 public esgScore;
    uint256 public lastUpdated;

    // Constructor to initialize the contract
    constructor(address entity, address esgAuthority, bytes32 initialName, bytes32 initialLocation, bytes32 initialProductDesc) {
        name = initialName;
        location = initialLocation;
        productDescription = initialProductDesc;
        // carbonUsage = 0;
        // waterUsage = 0;
        // plasticUsage = 0;
        // produceWeight = 0;
        // esgScore = 0;
        _grantRole(ESG_MANAGER_ROLE, esgAuthority);
        _grantRole(DEFAULT_ADMIN_ROLE, entity);
        lastUpdated = block.timestamp;
    }

    // Function to update production statistics
    function produce(uint256 newCarbonUsage, uint256 newWaterUsage, uint256 newPlasticUsage, uint256 newProduceWeight) public onlyRole(DEFAULT_ADMIN_ROLE) {
        carbonUsage += newCarbonUsage;
        waterUsage += newWaterUsage;
        plasticUsage += newPlasticUsage;
        produceWeight += newProduceWeight;
        lastUpdated = block.timestamp;
    }

    // Function to update ESG score
    function updateEsgScore(uint8 updatedEsgScore) public onlyRole(ESG_MANAGER_ROLE) {
        require(updatedEsgScore <= 5, "ESG score must be 5 or lower");
        esgScore = updatedEsgScore;
        lastUpdated = block.timestamp;
    }
}
