const express = require("express");
const router = express.Router();
const Company = require("../models/company");

router.get("/listCompanies", async (req,res)=>{
  const companies = await Company.find()
  req.headers.authorization ? res.status(200).send(companies) : res.status(401).send({message: "Você não tem permissão para acessar essa rota!"})
})

router.post("/createCompany", async (req,res)=>{
  

  const {fantasyName, socialName, cnpj} = req.body
  console.log(fantasyName, socialName, cnpj)
  if(!fantasyName || !socialName || !cnpj){
    return res.status(400).send({error: "Dados insuficientes"})
  }else{
    const companyAlreadyExists = await Company.findOne({
      $or: [{socialName}, {cnpj}],
    })
    if(companyAlreadyExists){
      return res.status(400).send({error: "Empresa já cadastrada"})
    }
  }

  try{
    await Company.create({
      fantasyName,
      socialName,
      cnpj,
    }).then((company)=>{
      return res.status(200).send({
        message: "Empresa criada com sucesso!",
        company,
      })
    })
  }
  catch(err){
    res.status(400).send({
      error: err,
      message: "Erro ao criar empresa"
    })
  }
})


module.exports = router