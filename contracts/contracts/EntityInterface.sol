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
