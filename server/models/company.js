const mongoose = require("../database");

const CompanySchema = new mongoose.Schema({
  fantasyName: {
    type: String,
  },
  socialName: {
    type: String,
  },
  cnpj: {
    type: String,
  }
})

const Company = mongoose.model("Company", CompanySchema)
module.exports = Company