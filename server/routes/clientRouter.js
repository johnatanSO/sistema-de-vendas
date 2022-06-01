const express = require("express");
const router = express.Router();
const Client = require("../models/client");

 router.get("/listClients", async (req,res)=>{
  const clients = await Client.find()
  req.headers.authorization ? res.status(200).send(clients) : res.status(401).send({message: "Você não tem permissão para acessar essa rota!"})
}) 

router.post("/createClient", async (req,res)=>{
  const {clientName, email, tel, company} = req.body
  if(!clientName || !email || !tel || !company){
    return res.status(400).send({error: "Dados insuficientes"})
  }else{
    const clientAlreadyExists = await Client.findOne({clientName})
    if(clientAlreadyExists){
      return res.status(400).send({error: "Cliente já cadastrado"})
    }
  }

  try{
    await Client.create({
      clientName,
      email,
      tel,
      company,
    }).then((client)=>{
      return res.status(200).send({
        message: "Cliente criado com sucesso!",
        client,
      })
    })
  }
  catch(err){
    res.status(400).send({
      error: err,
      message: "Erro ao cadastrar cliente!"
    })  
  }
})

module.exports = router