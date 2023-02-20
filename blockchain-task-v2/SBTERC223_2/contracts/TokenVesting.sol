// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract TokenVesting {
    using SafeMath for uint256;

    uint256 public constant TOTAL_SUPPLY = 160000000 * 10**18; // 160 million tokens
    uint256 public constant INVESTOR_SUPPLY = 120000000 * 10**18; // 120 million tokens for investors
    uint256 public constant ADVISOR_SUPPLY = 16000000 * 10**18; // 16 million tokens for advisors
    uint256 public constant DEVELOPER_SUPPLY = 24000000 * 10**18; // 24 million tokens for developers

    uint256 public constant VESTING_DURATION = 90 days; // 90 days vesting period
    uint256 public constant VESTING_INTERVAL = 10 minutes; // release tokens every 10 minutes

    uint256 public investorReleased;
    uint256 public advisorReleased;
    uint256 public developerReleased;

    uint256 public startTime;
    address public founder;
    address public advisorAddress;
    address public teamAddress;
    IERC20 public token;

    constructor(
        uint256 _startTime,
        address _founder,
        address _advisorAddress,
        address _teamAddress,
        address _tokenAddress
    ) {
        require(
            _founder != address(0),
            "TokenVesting: founder address is zero"
        );
        require(
            _advisorAddress != address(0),
            "TokenVesting: advisor address is zero"
        );
        require(
            _teamAddress != address(0),
            "TokenVesting: team address is zero"
        );
        require(
            _tokenAddress != address(0),
            "TokenVesting: token address is zero"
        );

        startTime = _startTime;
        founder = _founder;
        advisorAddress = _advisorAddress;
        teamAddress = _teamAddress;
        token = IERC20(_tokenAddress);
    }

    function getInvestorVesting() public view returns (uint256) {
        uint256 currentBalance = token.balanceOf(address(this));
        uint256 investorVesting = INVESTOR_SUPPLY
            .mul(block.timestamp.sub(startTime))
            .div(VESTING_DURATION);
        if (currentBalance < investorVesting) {
            return currentBalance;
        }
        return investorVesting.sub(investorReleased);
    }

    function getAdvisorVesting() public view returns (uint256) {
        uint256 currentBalance = token.balanceOf(address(this));
        uint256 advisorVesting = ADVISOR_SUPPLY
            .mul(block.timestamp.sub(startTime))
            .div(VESTING_DURATION);
        if (currentBalance < advisorVesting) {
            return currentBalance;
        }
        return advisorVesting.sub(advisorReleased);
    }

    function getDeveloperVesting() public view returns (uint256) {
        uint256 currentBalance = token.balanceOf(address(this));
        uint256 developerVesting = DEVELOPER_SUPPLY
            .mul(block.timestamp.sub(startTime))
            .div(VESTING_DURATION);
        if (currentBalance < developerVesting) {
            return currentBalance;
        }
        return developerVesting.sub(developerReleased);
    }

    function releaseInvestorTokens() public {
        require(block.timestamp >= startTime, "TokenVesting: not started yet");
        uint256 amount = getInvestorVesting();
        require(amount > 0, "TokenVesting: no tokens to release");

        investorReleased = investorReleased.add(amount);
        token.transfer(msg.sender, amount);
    }

    function releaseAdvisorTokens() public {
        require(msg.sender == advisorAddress, "TokenVesting: not advisor");
        require(block.timestamp >= startTime, "TokenVesting: not started yet");
        uint256 amount = getAdvisorVesting();
        require(amount > 0, "TokenVesting: no tokens to release");

        advisorReleased = advisorReleased.add(amount);
        token.transfer(msg.sender, amount);
    }

    function releaseDeveloperTokens() public {
        require(msg.sender == teamAddress, "TokenVesting: not team");
        require(block.timestamp >= startTime, "TokenVesting: not started yet");
        uint256 amount = getDeveloperVesting();
        require(amount > 0, "TokenVesting: no tokens to release");

        developerReleased = developerReleased.add(amount);
        token.transfer(msg.sender, amount);
    }
}
