# Ethereum Blockchain Monitor
This program monitors the Ethereum blockchain for new transactions to specific addresses and inserts them into a MySQL database. It uses the Kovan testnet, but can be easily modified to use other testnets or the mainnet.

## Installation
1. Clone this repository to your local machine using `git clone`.
2. Install the required npm packages by running `npm install`.
3. Create a `.env` file in the root directory of the project and set the required environment variables. See the `.env.example` file for an example.
4. Create a MySQL database and update the database configuration in the `db.js` file.
5. Start the program by running `npm start`.

## Usage
The program generates a new Ethereum address using a mnemonic passphrase and the Kovan testnet. It then generates 100 new addresses from this wallet, and monitors the blockchain for new transactions to these addresses. When a new transaction is detected, the program inserts the transaction details into a MySQL database.

You can view the transaction details in the transactions table of the database. The blocks table contains information about the most recent block processed by the program.