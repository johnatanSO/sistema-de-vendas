import React, { useState, useContext, useEffect } from "react";
import { LoginScreen } from "./components/LoginScreen";
import "./styles/global.scss";
import { CreateAccountSuccessModal } from "./components/CreateAccountSuccessModal";
import Modal from "react-modal";
import {Dashboard} from "./components/Dashboard";
import {userDataContext} from './userDataContext'


Modal.setAppElement("#root");

function App() {
  const {token, setToken} = useContext(userDataContext);
  const [createAccountSuccess, setCreateAccountSuccess] = useState(false);

  useEffect(() =>{
    setToken(localStorage.getItem('token'));
  },[])

  function handleCloseCreateAccountModal() {
    setCreateAccountSuccess(false);
  }

  return (
    <>
      <CreateAccountSuccessModal
        onRequestClose={handleCloseCreateAccountModal}
        isOpen={createAccountSuccess}
      />
      {!token ? (
        <LoginScreen
          setCreateAccountSuccess={setCreateAccountSuccess}
        />
      ) : (
        <Dashboard />
      )}
    </>
  );
}

export default App;
