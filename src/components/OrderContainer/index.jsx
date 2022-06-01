import React, { useState, useContext, useEffect } from "react";
import { OrderTable } from "../OrderTable";
import { Note } from "phosphor-react";
import { userDataContext } from "../../userDataContext";
import { api } from "../../services/api";
import Loading from "../Loading";

export function OrdersContainer() {
  const { token, companiesList, clientsList, productsList } =
    useContext(userDataContext);

  const [client, setClient] = useState("");
  const [company, setCompany] = useState("");
  const [productName, setProductName] = useState("");
  const [observer, setObserver] = useState("");
  const [ordersList, setOrdersList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(0);
  let products = [];

  useEffect(() => {
    api
      .get("/order/listOrders", { headers: { Authorization: token } })
      .then((res) => {
        setOrdersList(res.data);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          alert("Você não está logado!");
        }
      });
  }, []);

  async function createNewOrder(e) {
    e.preventDefault();
    setLoading(true);

    if (!client || !company || !productName) {
      alert("Preencha todos os campos por favor!");
      setLoading(false);
      return;
    }

    let product = {
      productName,
      value: productsList.find((product) => {
        if (product.productName === productName) {
          return product.value;
        }
      }).value,
      quantity: quantity,
    };

    products.push(product);

    await api
      .post("/order/createOrder", {
        client,
        company,
        products,
        observer,
      }, { headers: { Authorization: token } })
      .then((res) => {
        console.log(res.data);
        setOrdersList([...ordersList, res.data.order]);
      })
      .catch((err) => {
        if (err.response.status === 400) {
          console.log(err);
          alert(err.response.data.message);
        } else {
          console.log(err);
        }
      });
    setLoading(false);
  }

  return (
    <div className="main-container">
      <div className="main-header">
        <form>
          <h2>Fazer novo pedido</h2>
          <select
            value={client}
            onChange={(e) => {
              setClient(e.target.value);
            }}
            className="select-container"
            name="companies"
            id="companies"
          >
            <option className="option-disabled" disabled value="">
              Selecione um cliente...
            </option>
            {clientsList.map((client, key) => {
              return (
                <option
                  className="option"
                  key={key}
                  value={client ? client.clientName : "Default"}
                >
                  {client ? client.clientName : "Default"}
                </option>
              );
            })}
          </select>

          
            <select
              value={company}
              onChange={(e) => {
                setCompany(e.target.value);
              }}
              className="select-container"
              name="companies"
              id="companies"
            >
              <option className="option-disabled" disabled value="">
                Selecione uma empresa...
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
          

          <div className="products">
            <input onChange={(e) => setQuantity(e.target.value)}placeholder="Qtd" className="quantityProduct" type="number" name="quantityProduct" id="quantityProduct" />
            <select
              value={productName}
              onChange={(e) => {
                setProductName(e.target.value);
              }}
              className="select-container product"
              name="companies"
              id="companies"
            >
              <option className="option-disabled" disabled value="">
                Selecione um produto...
              </option>
              {productsList.map((product, key) => {
                return (
                  <option
                    className="option"
                    key={key}
                    value={product ? product.productName : "Default"}
                  >
                    {product ? product.productName + ' - ' + new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.value) : "Default"}
                  </option>
                );
              })}
            </select>
          </div>

          <input
            value={observer}
            onChange={(e) => setObserver(e.target.value)}
            placeholder="Observação"
            type="text"
          />

          <button onClick={createNewOrder} type="submit">
            {!loading ? "Cadastrar" : <Loading />}
          </button>
        </form>
        <Note size={200} />
      </div>
      <div className="main-body">
        <h3>Lista de pedidos</h3>

        <OrderTable ordersList={ordersList} />
      </div>
    </div>
  );
}
