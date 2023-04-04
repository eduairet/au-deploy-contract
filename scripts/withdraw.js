require('dotenv').config();
const hre = require('hardhat');
const ethers = require('ethers');
const { SEPOLIA_RPC, PRIV_KEY_2 } = process.env;

async function main() {
    const [url, privKey] = [SEPOLIA_RPC, PRIV_KEY_2],
        address = '0x88aB90F58De99F76C519338D2A868a9514FA9021',
        { abi } = await hre.artifacts.readArtifact('Faucet');

    const provider = new ethers.providers.JsonRpcProvider(url),
        wallet = new ethers.Wallet(privKey, provider),
        faucet = new ethers.Contract(address, abi, wallet);

    // Call the withdraw function
    const tx = await faucet.withdraw(ethers.utils.parseEther('0.1'));
    console.log(
        `Success! check your transation here:\nhttps://sepolia.etherscan.io/tx/${tx.hash}`
    );
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
