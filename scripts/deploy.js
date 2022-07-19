const { ethers, run, network } = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  const WavePortal = await hre.ethers.getContractFactory('WavePortal')
  const wave = await WavePortal.deploy();

  await wave.deployed();

  console.log("Wave portal deployed to:", wave.address);
}

main().then(() => process.exit(0)).catch((e) => {console.log(e); process.exit(1)});
