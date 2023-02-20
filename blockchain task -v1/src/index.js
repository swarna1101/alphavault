const config = require('./config');
const db = require('./db');
const ethereum = require('./ethereum');

// Connect to the database
db.connect(config.db);

// Get the latest block number
let latestBlockNumber = 0;
ethereum.getLatestBlockNumber().then((blockNumber) => {
    latestBlockNumber = blockNumber;
});

// Start monitoring new blocks
ethereum.watchNewBlocks((block) => {
    console.log(`New block received: ${block.number}`);

    // Check all transactions in the block for our addresses
    block.transactions.forEach(async (tx) => {
        if (config.addresses.includes(tx.to)) {
            console.log(`Transaction received: ${tx.hash}`);

            // Insert the transaction into the database
            const result = await db.query(
                'INSERT INTO transactions (tx_hash, block_number, address, value) VALUES (?, ?, ?, ?)',
                [tx.hash, block.number, tx.to, tx.value]
            );
            console.log(`Transaction inserted: ${result.insertId}`);
        }
    });

    // Update the latest block number
    latestBlockNumber = block.number;
});

// Check for missing blocks every minute
setInterval(() => {
    for (let i = latestBlockNumber + 1; i <= latestBlockNumber + 10; i++) {
        ethereum.getBlockByNumber(i).then((block) => {
            console.log(`Missing block received: ${block.number}`);

            // Check all transactions in the block for our addresses
            block.transactions.forEach(async (tx) => {
                if (config.addresses.includes(tx.to)) {
                    console.log(`Transaction received: ${tx.hash}`);

                    // Insert the transaction into the database
                    const result = await db.query(
                        'INSERT INTO transactions (tx_hash, block_number, address, value) VALUES (?, ?, ?, ?)',
                        [tx.hash, block.number, tx.to, tx.value]
                    );
                    console.log(`Transaction inserted: ${result.insertId}`);
                }
            });
        });
    }
}, 60000);
