const { expect } = require("chai");

describe("MyToken", function () {
    it("Deployment should assign the total supply of tokens to the owner", async function () {
        const [owner] = await ethers.getSigners();

        const MyToken = await ethers.getContractFactory("MyToken");

        const hardhatToken = await MyToken.deploy(1000000);

        const ownerBalance = await hardhatToken.balanceOf(owner.address);
        expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
    });
});
