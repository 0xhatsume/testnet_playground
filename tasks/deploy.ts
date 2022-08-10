import { task } from "hardhat/config";
import {utils, Contract, BytesLike} from "ethers";
import { PassThrough } from "stream";

task("erc20Factory", "Deploy a standard ERC20 Token.")
.addParam("name", "Name of ERC20 Token")
.addParam("symbol", "Symbol of ERC20 Token")
.setAction(async (taskArgs, hre) => {
  //const signers = await ethers.getSigners();

    const ERC20Factory = await hre.ethers.getContractFactory("ERC20");
    const ERC20 = await ERC20Factory.deploy(
        taskArgs.name,
        taskArgs.symbol
    );

    await ERC20.deployed();
    console.log(`ERC20 ${taskArgs.name, taskArgs.symbol} deployed to: ${ERC20.address}`);
});

task("deploy-cake-token")
.setAction(async(taskArgs, hre)=>{
    const caketoken = await hre.ethers.getContractFactory("CakeToken").then(
                async(c)=>{
                return await c.deploy();
                }
    )
    console.log(`Cake Token deployed at: ${caketoken.address}`)
})