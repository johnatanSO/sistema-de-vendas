import React, { useState, useContext } from "react";
import { ClientTable } from "../ClientTable";
import { UsersThree } from "phosphor-react";
import { userDataContext } from "../../userDataContext";
import { api } from "../../services/api";
import Loading from "../Loading";

export function ClientsContainer() {
  const { companiesList, clientsList, setClientsList, token } = useContext(userDataContext);

  const [clientName, setClientName] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [company, setCompany] = useState("");
  const [loading, setLoading] = useState(false);

  async function createNewClient(e) {
    e.preventDefault();
    setLoading(true);

    if (!clientName || !email || !tel || !company) {
      alert("Preencha todos os campos por favor!");
      setLoading(false);
      return;
    }
    await api
      .post("/client/createClient", {
        clientName,
        email,
        tel,
        company,
      }, { headers: { Authorization: token } })
      .then((res) => {
        setClientsList([...clientsList, res.data.client]);
      })
      .catch((err) => {
        if (err.response.status === 400) {
          console.log(err);
          alert(err.response.data.message);
        } else {
          console.log(err);
        }
      });
    setClientName("");
    setEmail("");
    setTel("");
    setLoading(false);
  }

  return (
    <div className="main-container">
      <div className="main-header">
        <form>
          <h2>Cadastrar novo cliente</h2>
          <input
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            placeholder="Nome do cliente"
            type="text"
          />

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail do cliente"
            type="text"
          />

          <input
            value={tel}
            onChange={(e) => setTel(e.target.value)}
            placeholder="Telefone do cliente"
            type="text"
          />

          <select
            value={company}
            onChange={(e) => {
              setCompany(e.target.value);
            }}
            placeholder="Selecione uma opção por favor"
            className="select-container"
            name="companies"
            id="companies"
          >
            <option className="option-disabled" disabled value="">
              Selecione...
            </option>
            {companiesList.map((company, key) => {
              return (
                <option
                  className="option"
                  key={key}
                  value={company ? company.fantasyName : "Default"}
                >
                  {company ? company.fantasyName : "Default"}
                </option>
              );
            })}
          </select>

          <button onClick={createNewClient} type="submit">
            {!loading ? "Cadastrar" : <Loading />}
          </button>
        </form>
        <UsersThree size={200} />
      </div>
      <div className="main-body">
        <h3>Lista de clientes</h3>

        <ClientTable clientsList={clientsList} />
      </div>
    </div>
  );
}
