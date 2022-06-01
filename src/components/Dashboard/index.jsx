import React, { useContext, useEffect } from "react";
import { Sidebar } from "../Sidebar";
import "./styles.scss";
import { CompanyContainer } from "../CompanyContainer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ClientsContainer } from "../ClientContainer";
import { OrdersContainer } from "../OrderContainer";
import { ProductsContainer } from "../ProductsContainer";
import { userDataContext } from "../../userDataContext";
import { WelcomeScreen } from "../WelcomeScreen";
import { getDataList } from "../../services/getDataLists";

export function Dashboard() {
  const { token, setCompaniesList, setClientsList, setProductsList } = useContext(userDataContext);
  
  useEffect(() => {
    getDataList.getCompaniesList(token, setCompaniesList);
    getDataList.getClientsList(token, setClientsList);
    getDataList.getProductsList(token, setProductsList);
  }, []);

  return (
    <div className="dashboard-container">
      <Router>
        <Sidebar />
        <Routes>
          <Route path={"/"} element={<WelcomeScreen />} />
          <Route path={"/company"} element={<CompanyContainer />} />
          <Route path={"/products"} element={<ProductsContainer />} />
          <Route path={"/clients"} element={<ClientsContainer />} />
          <Route path={"/orders"} element={<OrdersContainer />} />
        </Routes>
      </Router>
    </div>
  );
}
