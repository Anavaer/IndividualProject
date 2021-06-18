const mongoose = require("mongoose");

const Wallet = mongoose.model(
  "Wallet",
  new mongoose.Schema({
    user: String,
    investments: [
      {
        name: String,
        position: String,
        volume: Number,
        price: Number
      }
    ]
  })
);

module.exports = Wallet;
