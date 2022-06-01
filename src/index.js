import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { UserDataContextProvider } from "./userDataContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserDataContextProvider>
      <App />
    </UserDataContextProvider>
  </React.StrictMode>
);
