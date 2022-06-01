import React, { useState, useContext } from "react";
import { ProductTable } from "../ProductTable";
import { ShoppingCart } from "phosphor-react";
import { userDataContext } from "../../userDataContext";
import { api } from "../../services/api";
import Loading from '../Loading'

export function ProductsContainer() {
  const { companiesList, productsList, setProductsList, token } = useContext(userDataContext);

  const [productName, setProductName] = useState("");
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");
  const [company, setCompany] = useState("");
  const [loading, setLoading] = useState(false);

  async function createNewProduct(e) {
    e.preventDefault();
    setLoading(true);
    
    if (!productName || !value || !description || !company) {
      alert("Preencha todos os campos por favor!");
      setLoading(false)
      return;
    }
    await api
      .post("/product/createProduct", {
        productName,
        value,
        description,
        company,
      }, { headers: { Authorization: token } })
      .then((res) => {
        setProductsList([...productsList, res.data.product]);
      })
      .catch((err) => {
        if (err.response.status === 400) {
          alert(err.response.data.error);
        } else {
          console.log(err);
        }
      });
    setProductName("");
    setValue("");
    setDescription("");
    setLoading(false);
  }

  return (
    <div className="main-container">
      <div className="main-header">
        <form>
          <h2>Cadastrar novo produto</h2>
          <input
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="Nome do produto"
            type="text"
          />

          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Valor do produto"
            type="number"
          />

          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descrição do produto"
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
            <option className="option-disabled" disabled value="">Selecione...</option>
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

          <button onClick={createNewProduct} type="submit">
            {!loading ? "Cadastrar" : <Loading />}
          </button>
        </form>
        <ShoppingCart size={200} />
      </div>
      <div className="main-body">
        <h3>Lista de produtos</h3>

        <ProductTable productsList={productsList} />
      </div>
    </div>
  );
}
