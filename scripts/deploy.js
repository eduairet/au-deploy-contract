const ethers = require('ethers');
require('dotenv').config();
const { SEPOLIA_RPC, PRIV_KEY } = process.env;

async function main() {
    const url = SEPOLIA_RPC;

    let artifacts = await hre.artifacts.readArtifact('Faucet');
    const provider = new ethers.providers.JsonRpcProvider(url);
    let privateKey = PRIV_KEY;
    let wallet = new ethers.Wallet(privateKey, provider);

    // Create an instance of a Faucet Factory
    let factory = new ethers.ContractFactory(
        artifacts.abi,
        artifacts.bytecode,
        wallet
    );

    let faucet = await factory.deploy();
    console.log('Faucet address:', faucet.address);
    await faucet.deployed();
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
