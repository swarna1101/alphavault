module.exports = {
    // Ethereum Kovan testnet configuration
    ethereum: {
        providerUrl: 'https://kovan.infura.io/v3/your-project-id',
        privateKey: 'your-private-key',
        addresses: ['0x...'], // an array of 100 Ethereum addresses generated from the mnemonic passphrase
    },

    // MySQL configuration
    db: {
        host: 'localhost',
        user: 'root',
        password: 'your-password',
        database: 'your-database-name',
    },
};
