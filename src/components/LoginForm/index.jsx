import React from "react";
import { useState } from "react";
import { api } from "../../services/api";
import { useContext } from "react";
import { userDataContext } from "../../userDataContext";
import Loading from "../Loading";

export function LoginForm() {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setName, setToken } = useContext(userDataContext);
  const [loading, setLoading] = useState(false);

  async function handleLogin(event) {
    event.preventDefault();
    if (!usernameOrEmail || !password) {
      alert("Por favor, preencha todos os campos");
      return;
    }
    setLoading(true);
    await api
      .post("user/login", {
        id: Math.random() * 100,
        usernameOrEmail,
        password,
      })
      .then(async (res) => {
        if (res.status === 200) {
          await setName(res.data.user.username);
          await setToken(res.data.token);
          localStorage.setItem("token", res.data.token);
          
        }
      })
      .catch((err) => {
        if (err.response.status === 400) {
          alert("Usuário e/ou senha inválido(s)");
          setUsernameOrEmail("");
          setPassword("");
        }
      });
    setLoading(false);
  }

  return (
    <div className="inputs">
      <h2>Entrar com uma conta existente</h2>
      <form>
        <input
          onChange={(e) => {
            setUsernameOrEmail(e.target.value);
          }}
          value={usernameOrEmail}
          type="text"
          name="usernameOrEmailLogin"
          id="usernameOrEmailLogin"
          placeholder="Nome de usuário ou E-mail"
        />
        <input
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type="password"
          name="password"
          id="passwordLogin"
          placeholder="Senha"
        />
        <button disabled={loading} onClick={handleLogin} type="submit">
          {loading ? <Loading /> : "Entrar"}
        </button>
      </form>
    </div>
  );
}
