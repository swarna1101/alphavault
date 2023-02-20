const crypto = require('crypto');

// Hashes a string using the SHA-256 algorithm
function sha256(str) {
    return crypto.createHash('sha256').update(str).digest('hex');
}

module.exports = { sha256 };
