import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "@asgardeo/auth-react";
import "animate.css/animate.min.css";
import "react-notifications-component/dist/theme.css";
import { ReactNotifications } from "react-notifications-component";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider
      config={{
        signInRedirectURL: "https://0746d51b-516c-4f00-92c8-ffd6e1986e0b.e1-us-east-azure.choreoapps.dev",
        signOutRedirectURL: "https://0746d51b-516c-4f00-92c8-ffd6e1986e0b.e1-us-east-azure.choreoapps.dev",
        clientID: "3ctl4QB9EGLe35WOxfDhW3ytfAQa",
        baseUrl: "https://api.asgardeo.io/t/eternity",
        scope: [
          "openid",
          "address",
          "app_roles",
          "email",
          "groups",
          "phone",
          "profile",
          "admin", 
          "blood_donor",
          "blood_bank",
          "Role"
        ],
      }}
    >
      <ReactNotifications />
        <App />
    </AuthProvider>
  </React.StrictMode>
);
