const TokenVesting = artifacts.require("TokenVesting");

module.exports = function (deployer) {
    const startTime = Math.floor(Date.now() / 1000); // start vesting immediately
    const founder = "0x1234567890123456789012345678901234567890"; // replace with actual address
    const advisorAddress = "0x0987654321098765432109876543210987654321"; // replace with actual address
    const teamAddress = "0x2468013579246801357924680135792468013579"; // replace with actual address
    const tokenAddress = "0xabcdef1234567890abcdef1234567890abcdef12"; // replace with actual address

    deployer.deploy(
        TokenVesting,
        startTime,
        founder,
        advisorAddress,
        teamAddress,
        tokenAddress
    );
};
