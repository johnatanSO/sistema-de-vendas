import { api } from "./api";

export const getDataList = {
  getCompaniesList: (token, setCompaniesList) => {
    api
      .get("/company/listCompanies", { headers: { Authorization: token } })
      .then((res) => {
        setCompaniesList(res.data);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          alert("Você não está logado!");
        }
      });
  },
  getProductsList: (token, setProductsList) => {
    api
      .get("/product/listProducts", { headers: { Authorization: token } })
      .then((res) => {
        setProductsList(res.data);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          alert("Você não está logado!");
        }
      });
  },
  getClientsList: (token, setClientsList) => {
    api
      .get("/client/listClients", { headers: { Authorization: token } })
      .then((res) => {
        setClientsList(res.data);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          alert("Você não está logado!");
        }
      });
  },
};
