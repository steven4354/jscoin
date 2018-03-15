"use strict"

var Blockchain = require("./blockchain")
var Block = require("./block")

let jscoin = new Blockchain()
jscoin.addBlock(new Block(1, "03/15/2018", {amount: 330}))
jscoin.addBlock(new Block(2, "03/16/2018", {amount: 330}))

// a blockchain will inherently be immutable once a new block has been added
// aka you can't just change the information in a added block have have isChainValid == true anymore

//initially == true
console.log("valid? =>", jscoin.isChainValid())

//change the block even a little and the blockchain isn't valid anymore
jscoin.chain[1].data.amount = 999999999999 //...making more cash...
console.log("valid? =>", jscoin.isChainValid())

//however there is still the issue of being able to create blocks too easily
//AKA spamming
