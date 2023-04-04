require('@nomiclabs/hardhat-waffle');
require('dotenv').config();

const { SEPOLIA_RPC, PRIV_KEY } = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: '0.8.19',
    networks: {
        sepolia: {
            url: SEPOLIA_RPC,
            accounts: [PRIV_KEY],
        },
    },
};
