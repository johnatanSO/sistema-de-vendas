const mongoose = require("../database");

const ProductSchema = new mongoose.Schema({
  productName: {
    type: String,
  },
  value: {
    type: String,
  },
  description: {
    type: String,
  },
  company: {
    type: String,
  }
})

const Product = mongoose.model("Product", ProductSchema)
module.exports = Product