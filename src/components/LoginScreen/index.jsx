import React from "react";
import "./style.scss";
import { CreateAccountForm } from "../CreateAccountForm";
import { LoginForm } from "../LoginForm";



export function LoginScreen({ setCreateAccountSuccess }) {

  return (
    <div className="container">
      <div className="containerLoginScreen">
        <LoginForm />

        <span>Ou</span>

        <CreateAccountForm setCreateAccountSuccess={setCreateAccountSuccess} />
      </div>
    </div>
  );
}
