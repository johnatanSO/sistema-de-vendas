import React, { useState, useContext } from "react";
import { CompanyTable } from "../CompanyTable";
import { api } from "../../services/api";
import { Buildings } from "phosphor-react";
import { userDataContext } from "../../userDataContext";
import Loading from "../Loading";

export function CompanyContainer() {
  const { companiesList, setCompaniesList, token } =
    useContext(userDataContext);

  const [fantasyName, setFantasyName] = useState("");
  const [socialName, setSocialName] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [loading, setLoading] = useState(false);

  async function createNewCompany(e) {
    e.preventDefault();
    setLoading(true);
    if (!fantasyName || !socialName || !cnpj) {
      alert("Preencha todos os campos por favor!");
      setLoading(false);
      return;
    }

    await api.post("/company/createCompany", {
        fantasyName,
        socialName,
        cnpj,
      },{headers: { Authorization: token }})
      .then((res) => {
        setCompaniesList([...companiesList, res.data.company]);
      })
      .catch((err) => {
        if (err.response.status === 400) {
          alert(err.response.data.error);
        }
      });
    setFantasyName("");
    setSocialName("");
    setCnpj("");
    setLoading(false);
  }

  return (
    <div className="main-container">
      <div className="main-header">
        <form>
          <h2>Cadastrar nova empresa</h2>
          <input
            value={fantasyName}
            onChange={(e) => setFantasyName(e.target.value)}
            placeholder="Nome fantasia"
            type="text"
          />

          <input
            value={socialName}
            onChange={(e) => setSocialName(e.target.value)}
            placeholder="Razão social"
            type="text"
          />

          <input
            value={cnpj}
            onChange={(e) => setCnpj(e.target.value)}
            placeholder="CNPJ"
            type="text"
          />

          <button onClick={createNewCompany} type="submit">
            {!loading ? "Cadastrar" : <Loading />}
          </button>
        </form>
        <Buildings size={200} />
      </div>
      <div className="main-body">
        <h3>Lista de empresas</h3>

        <CompanyTable companiesList={companiesList} />
      </div>
    </div>
  );
}
