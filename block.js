"use strict"

const SHA256 = require("crypto-js/sha256");

module.exports = class Block {
    constructor(timestamp, transactions, previousHash) {
        previousHash = typeof previousHash  !== 'undefined' ? previousHash : ''

        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash() {
        return SHA256(this.nonce + this.previousHash + this.timestamp + JSON.stringify(this.transactions)).toString();
    }

    mineBlock(difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            //console.log("nonce calculating =>", this.nonce)
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log("BLOCK MINED: " + this.hash);
    }
}
