"use strict"

const SHA256 = require("crypto-js/sha256");

module.exports = class Block {
    constructor(index, timestamp, data, previousHash) {
        previousHash = typeof previousHash  !== 'undefined' ? previousHash : ''

        this.index = index;
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.data = data;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash() {
        return SHA256(this.index + this.nonce + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }

    mineBlock(difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            console.log("nonce calculating =>", this.nonce)
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log("BLOCK MINED: " + this.hash);
    }
}
