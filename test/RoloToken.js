const { expect } = require("chai")
const { ethers } = require("hardhat")

const initialSupply = 100000
const tokenName = "RoloToken"
const tokenSymbol = "ROLO"

describe("Rolo token test", function() {
  before(async function() {
    const availableSigners = await ethers.getSigner();
    this.deployer = availableSigners[0];

    const RoloToken = await ethers.getContractFactory("RoloToken");
    this.roloToken = await RoloToken.deploy(tokenName, tokenSymbol);
    await this.roloToken.deployed()

    it('Should be named RoloToken', async function () {
      const fetchedTokenName = await this.roloToken.name()
      expect(fetchedTokenName).to.be.equal(tokenName);
    } )

    it('Should have symbol "ROLO"', async function() {
      const fetchedTokenSymbol = await this.roloToken.symbol()
      expect(fetchedTokenSymbol).to.be.equal(tokenSymbol)
    })

    it('Should have totalSupply passed in during deploying', async function() {
      const [fetchedTotalSupply, decimals] = await Promise.all([
        this.roloToken.totalSupply(),
        this.roloToken.decimals()
      ]);
      const expectedTotalSupply = ethers.BigNumber.from(initialSupply).mul(ethers.BigNumber.from(10).pow(decimals));
      expect(fetchedTotalSupply.toString.eq(expectedTotalSupply)).to.be.true;
    })
  })
})
