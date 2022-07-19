/** @type import('hardhat/config').HardhatUserConfig */
require('dotenv').config();
require('@nomiclabs/hardhat-waffle');



module.exports = {
  solidity: "0.8.9",
  defaultNetwork: 'hardhat',
  paths: {
    artifacts: './src/artifacts'
  },
  networks: {
    rinkeby: {
      url: process.env.RPC_URL,
      accounts:[process.env.PRIVATE_KEY],
      chainId: 4
    }
  }
};
