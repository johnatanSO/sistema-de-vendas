const express = require("express");
const router = express.Router();
const Product = require("../models/product");

 router.get("/listProducts", async (req,res)=>{
  const products = await Product.find()
  req.headers.authorization ? res.status(200).send(products) : res.status(401).send({message: "Você não tem permissão para acessar essa rota!"})
})

router.post("/createProduct", async (req,res)=>{
  const {productName, value, description, company} = req.body
  if(!productName || !value || !description || !company){
    return res.status(400).send({error: "Dados insuficientes"})
  }else{
    const productAlreadyExists = await Product.findOne({productName})
    if(productAlreadyExists){
      return res.status(400).send({error: "Produto já cadastrado"})
    }
  }

  try{
    await Product.create({
      productName,
      value,
      description,
      company,
    }).then((product)=>{
      return res.status(200).send({
        message: "Produto criado com sucesso!",
        product,
      })
    })
  }
  catch(err){
    res.status(400).send({
      error: err,
      message: "Erro ao criar produto"
    })  
  }
})


module.exports = router