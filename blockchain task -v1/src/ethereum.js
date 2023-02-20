const Web3 = require('web3');
const HDWalletProvider = require('@truffle/hdwallet-provider');
const config = require('./config');
const db = require('./db');

// Create a Web3 provider using the mnemonic passphrase and Kovan testnet URL
const provider = new HDWalletProvider(config.mnemonic, config.kovanUrl);

// Create a new Web3 instance
const web3 = new Web3(provider);

// Define the addresses we're interested in tracking
const addresses = ['0x123...', '0x456...', ...];

// Start monitoring the Kovan blockchain for new transactions
async function monitorBlockchain() {
    // Get the latest block number
    const latestBlockNumber = await web3.eth.getBlockNumber();

    // Start monitoring from the latest block
    let currentBlockNumber = latestBlockNumber;

    while (true) {
        // Get the latest block
        const latestBlock = await web3.eth.getBlock('latest');

        // If the latest block number has changed, update the current block number
        if (latestBlock.number > currentBlockNumber) {
            currentBlockNumber = latestBlock.number;
        }

        // Check all transactions in the latest block
        for (const tx of latestBlock.transactions) {
            // Get the transaction details
            const txDetails = await web3.eth.getTransaction(tx);

            // Check if the transaction involves any of our addresses
            if (addresses.includes(txDetails.to)) {
                // Insert the transaction into the database
                await db.insertTransaction(txDetails.hash, txDetails.from, txDetails.to, txDetails.value, txDetails.timestamp);
            }
        }

        // Wait for the next block
        await new Promise(resolve => setTimeout(resolve, config.blockInterval * 1000));
    }
}

// Start monitoring the blockchain
monitorBlockchain().catch(err => console.error(err));
