// SPDX-License-Identifier: MIT
pragma solidity 0.8.11;

import "./ERC223.sol";
import "./ERC223ReceivingContract.sol";

contract SBTERC223 is ERC223 {
    string public symbol = "SBT";
    string public name = "SBT Token";
    uint8 public decimals = 18;
    uint256 public totalSupply = 400000000 * 10 ** uint256(decimals);

    constructor() {
        balances[msg.sender] = totalSupply;
    }

    function transfer(address to, uint value, bytes memory data) public override returns (bool) {
        require(value <= balances[msg.sender], "Insufficient balance.");
        require(to != address(0), "Invalid recipient address.");
        if (isContract(to)) {
            ERC223ReceivingContract receiver = ERC223ReceivingContract(to);
            receiver.tokenFallback(msg.sender, value, data);
        }
        balances[msg.sender] -= value;
        balances[to] += value;
        emit Transfer(msg.sender, to, value, data);
        return true;
    }

    function transfer(address to, uint value) public override returns (bool) {
        bytes memory empty;
        return transfer(to, value, empty);
    }

    function isContract(address addr) private view returns (bool) {
        uint length;
        assembly {
            length := extcodesize(addr)
        }
        return length > 0;
    }
}
