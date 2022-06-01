const mongoose = require("../database");

const OrderSchema = new mongoose.Schema({
  numberOrder:{
    type: Number,
  },
  client:{
    type: String,
  },
  company: {
    type: String,
  },
  observer: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  products: [
    {
      productName: {
        type: String,
      },
      value: {
        type: Number,
      },
      quantity: {
        type: Number,
      },
    }
  ],
  totalOrder: {
    type: Number,
  }
})

const Order = mongoose.model("Order", OrderSchema)
module.exports = Order