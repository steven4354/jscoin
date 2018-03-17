"use strict"

var Block = require("./block")
var Transaction = require("./transaction")

module.exports = class Blockchain{
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 4; //control how long it takes to mine a block

        //holds pending transactions to be added to a block
        this.pendingTransactions = [];

        //controls how many coins a miner gets on a successful mine
        this.miningReward = 100;
    }

    createGenesisBlock() {
        return new Block(0, "03/15/2018", "Genesis block", "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    createTransaction(transaction) {
        //allow users to add a transaction to be for mining and being added to the blockchain

        this.pendingTransactions.push(transaction)
    }

    minePendingTransactions(miningRewardAddress){
        //create a new block with all the transactions
        let block = new Block(Date.now(), this.pendingTransactions)
        block.mineBlock(this.difficulty)

        this.chain.push(block)

        //adds miners reward to transactions list
        this.pendingTransactions = [
          new Transaction(null, miningRewardAddress, this.miningReward)
        ]
    }


    isChainValid() {
        for (let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }

    getBalanceOfAddress(address){
        let balance = 0;

        for(const block of this.chain){
          for(const trans of block.transactions){

              if(trans.fromAddress === address){
                balance -= trans.amount
              }

              if(trans.toAddress === address){
                balance += trans.amount
              }
          }
        }

        console.log(`Balance of ${address}: `, balance)
        return balance;
    }
}
