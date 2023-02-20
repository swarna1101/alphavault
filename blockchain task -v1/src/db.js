const mysql = require('mysql2/promise');
const config = require('./config');

// Create a connection pool
const pool = mysql.createPool({
    host: config.db.host,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

// Insert a new block into the database
async function insertBlock(blockHash, previousHash, timestamp, process) {
    const conn = await pool.getConnection();
    try {
        const sql = `INSERT INTO Blocks (Block_Hash, Previous_Hash, Timestamp, Process)
                 VALUES (?, ?, ?, ?)`;
        const values = [blockHash, previousHash, timestamp, process];
        await conn.query(sql, values);
    } finally {
        conn.release();
    }
}

// Insert a new transaction into the database
async function insertTransaction(txHash, fromAddress, toAddress, amount, timestamp) {
    const conn = await pool.getConnection();
    try {
        const sql = `INSERT INTO Transactions (Transaction_Hash, FromAddress, ToAddress, Amount, Timestamp)
                 VALUES (?, ?, ?, ?, ?)`;
        const values = [txHash, fromAddress, toAddress, amount, timestamp];
        await conn.query(sql, values);
    } finally {
        conn.release();
    }
}

module.exports = {
    insertBlock,
    insertTransaction,
};
