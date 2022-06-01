const mongoose = require("../database");

const ClientSchema = new mongoose.Schema({
  clientName: {
    type: String,
  },
  email: {
    type: String,
  },
  tel: {
    type: String,
  },
  company: {
    type: String,
  }
})

const Client = mongoose.model("Client", ClientSchema)
module.exports = Client