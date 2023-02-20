module.exports = {
    networks: {
        development: {
            host: "127.0.0.1",
            port: 8545,
            network_id: "*"
        },
        kovan: {
            provider: function() {
                const HDWalletProvider = require('@truffle/hdwallet-provider');
                const mnemonic = "YOUR WALLET MNEMONIC HERE";
                const providerUrl = "https://kovan.infura.io/v3/YOUR-PROJECT-ID";
                return new HDWalletProvider(mnemonic, providerUrl);
            },
            network_id: 42
        }
    },
    compilers: {
        solc: {
            version: "0.8.11",
            optimizer: {
                enabled: true,
                runs: 200
            }
        }
    }
};
