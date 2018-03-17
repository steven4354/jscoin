"use strict"

var Blockchain = require("./blockchain")
var Block = require("./block")

let jscoin = new Blockchain()
jscoin.addBlock(new Block(1, "03/15/2018", {amount: 330}))
jscoin.addBlock(new Block(2, "03/16/2018", {amount: 330}))

// ---------------------------------------------------------------------------
// a blockchain will inherently be immutable once a new block has been added
// aka you can't just change the information in a added block have have isChainValid == true anymore
// ---------------------------------------------------------------------------

//initially == true
console.log("valid? =>", jscoin.isChainValid())

//change the block even a little and the blockchain isn't valid anymore
jscoin.chain[1].data.amount = 999999999999 //...making more cash...
console.log("valid? =>", jscoin.isChainValid())

//the above is true because before we add a new block we have an amount ex. 330 and add a variable called hash which is the hash of the current info
//we check validity by comparing the hash of the changed block to the hash of the block that was added
//and since the info is now difference they don't match

// ---------------------------------------------------------------------------
// however there is still the issue of being able to create blocks too easily
// aka block spamming
// ---------------------------------------------------------------------------

//create a "proof of work" mechanism
// - require computing work to be done before a new block can be added (i.e. pay to email)
// - for blockchain's this is through a "nonce" and "mining aka changing the nonce till the block's hash has a certain number of leading zeros before a block can be added"

//see this commit for the changes to the block and blockchain class that enables "proof of work"
//change the this.difficulty to see how long it takes!
