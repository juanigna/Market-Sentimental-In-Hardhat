const {expect} = require("chai");
const {ethers} = require("hardhat");

let ContractFactory;
let ContractInstance;

let signers = {};

describe("MarketSentiment", function(){
    describe("Deploy", function(){
        it("Should deploy the smart contract", async function(){
            const [deployer, firstUser, secondUser] = await ethers.getSigners();
            ContractFactory = await ethers.getContractFactory("MarketSentiment");
            ContractInstance = await ContractFactory.deploy();
            ContractInstance.deployed();
        })
    })

    describe("Ticker", function(){
        it("Should allow to add a ticket", async function(){
            let setTicketRx = await ContractInstance.addTicker("Juani");
            await setTicketRx.wait();
        })

        it("Should not allow to add a ticket an other person", async function(){
            const firstUserContractInstance = await ContractInstance.connect(signers.firstUser);
            let setTicketRx =  firstUserContractInstance.addTicker("Juani");
            expect(setTicketRx).to.revertedWith("Caller is not the owner");
        })
    })
})