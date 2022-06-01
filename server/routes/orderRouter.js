const express = require("express");
const router = express.Router();
const Order = require("../models/order");

router.get("/listOrders", async (req, res) => {
  const orders = await Order.find();
  req.headers.authorization
    ? res.status(200).send(orders)
    : res
        .status(401)
        .send({ message: "Você não tem permissão para acessar essa rota!" });
});

router.post("/createOrder", async (req, res) => {
  const { client, company, products, observer } = req.body;
  if (!client || !observer || !products || !company) {
    return res.status(400).send({ error: "Dados insuficientes" });
  }
  const numberOrder = Math.floor(Math.random() * (9999 - 1000) + 1000);
  const totalOrder = products.reduce((total, product) => {
    return total + product.value * product.quantity;
  }, 0);

  try {
    await Order.create({
      numberOrder,
      client,
      company,
      observer,
      products,
      totalOrder,
    }).then((order) => {
      return res.status(200).send({
        message: "Pedido feito com sucesso!",
        order,
      });
    });
  } catch (err) {
    res.status(400).send({
      error: err,
      message: "Erro ao realizar pedido!",
    });
  }
});

module.exports = router;
