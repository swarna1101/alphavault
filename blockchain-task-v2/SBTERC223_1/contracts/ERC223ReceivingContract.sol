// SPDX-License-Identifier: MIT
pragma solidity 0.8.11;

interface ERC223ReceivingContract {
    function tokenFallback(address from, uint value, bytes calldata data) external;
}
