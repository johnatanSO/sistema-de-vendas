import React from "react";
import { useState } from "react";
import { api } from "../../services/api";
import Loading from "../Loading";

export function CreateAccountForm({ setCreateAccountSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleCreateAccount(event) {
    event.preventDefault();
    if (!username || !password || !email) {
      alert("Por favor, preencha todos os campos");
      return;
    }
    setLoading(true);
    await api
      .post("user/createAccount", {
        id: Math.random() * 100,
        email,
        username,
        password,
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setCreateAccountSuccess(true);
        }
      })
      .catch((err) => {
        if (err.response.status === 400) {
          alert("E-mail já existe, escolha outro por favor!");
        }
      });
    setEmail("");
    setUsername("");
    setPassword("");
    setLoading(false);
  }

  return (
    <div className="inputs">
      <h2>Cadastrar uma nova conta</h2>
      <form>
        <input
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          type="email"
          name="email"
          id="emailCreateAccount"
          placeholder="E-mail"
        />

        <input
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          value={username}
          type="text"
          name="username"
          id="usernameCreateAccount"
          placeholder="Usuário"
        />

        <input
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type="password"
          name="password"
          id="passwordCreateAccount"
          placeholder="Senha"
        />

        <button onClick={handleCreateAccount} type="submit">
          {loading ? <Loading /> : "Cadastrar"}
        </button>
      </form>
    </div>
  );
}
