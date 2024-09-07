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
        // signInRedirectURL: "https://donor-loop.choreoapps.dev",
        // signOutRedirectURL: "https://donor-loop.choreoapps.dev",
        signInRedirectURL: "http://localhost:5173",
        signOutRedirectURL: "http://localhost:5173",
        // signInRedirectURL: "http://donor-loop.netlify.app/",
        // signOutRedirectURL: "http://donor-loop.netlify.app/",
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
