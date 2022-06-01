const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const jwt = require("jsonwebtoken");

router.post("/createAccount", async (req, res) => {
  const { email, username, password } = req.body;

  if (!email || !username || !password) {
    return res.status(400).send({ error: "Dados insuficientes" });
  }

  try {
    await User.create({
      email,
      username,
      password: bcrypt.hashSync(password),
    }).then((user) => {
      return res.status(200).send({
        message: "Usuário criado com sucesso!",
        user,
      });
    });
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

router.post("/login", async (req, res) => {
  const { usernameOrEmail, password } = req.body;

  const user = await User.findOne({
    $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
  });
  if (!user) {
    return res.status(400).send({ message: "Usuário ou senha incorreto!" });
  }

  const passwordMath = bcrypt.compareSync(password, user.password);
  if (!passwordMath) {
    return res.status(400).send({ message: "Usuário ou senha incorreto!" });
  }

  const token = jwt.sign({ id: user._id }, process.env.PRIVATE_KEY);

  res.status(200).send({
    token,
    message: "Usuário logado com sucesso!",
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
    },
  });
});

module.exports = router;
