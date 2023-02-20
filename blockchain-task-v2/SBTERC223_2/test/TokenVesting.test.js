const Token = artifacts.require("Token");
const TokenVesting = artifacts.require("TokenVesting");

contract("TokenVesting", (accounts) => {
    const [founder, advisor, team] = accounts;
    let token, vesting, startTime;

    beforeEach(async () => {
        startTime = Math.floor(Date.now() / 1000);
        token = await Token.new(160 * 10 ** 6);
        vesting = await TokenVesting.new(
            startTime,
            founder,
            advisor,
            team,
            token.address
        );
    });

    it("should vest tokens for investors", async () => {
        const investorsTokens = 120 * 10 ** 6;
        const investor = accounts[5];
        await token.transfer(vesting.address, investorsTokens);

        const vestedTokens = await vesting.calculateVestedTokens(investor);
        assert.equal(vestedTokens, 0, "tokens should not be vested yet");

        await vesting.releaseInvestorTokens({ from: investor });
        const balance = await token.balanceOf(investor);
        assert.equal(
            balance,
            investorsTokens,
            "tokens should be released to investor"
        );
    });

    it("should vest tokens for advisors", async () => {
        const advisorTokens = 16 * 10 ** 6;
        await token.transfer(vesting.address, advisorTokens);

        const vestedTokens = await vesting.calculateVestedTokens(advisor);
        assert.equal(vestedTokens, 0, "tokens should not be vested yet");

        await vesting.releaseAdvisorTokens({ from: advisor });
        const balance = await token.balanceOf(advisor);
        assert.equal(balance, advisorTokens, "tokens should be released to advisor");
    });

    it("should vest tokens for developers", async () => {
        const developerTokens = 24 * 10 ** 6;
        await token.transfer(vesting.address, developerTokens);

        const vestedTokens = await vesting.calculateVestedTokens(team);
        assert.equal(vestedTokens, 0, "tokens should not be vested yet");

        await vesting.releaseTeamTokens({ from: team });
        const balance = await token.balanceOf(team);
        assert.equal(balance, developerTokens, "tokens should be released to team");
    });
});
