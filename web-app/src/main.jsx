import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "@asgardeo/auth-react";
import "animate.css/animate.min.css";
import "react-notifications-component/dist/theme.css";
import { ReactNotifications } from "react-notifications-component";

// Load environment variables
const signInRedirectURL = import.meta.env.VITE_SIGN_IN_REDIRECT_URL;
const signOutRedirectURL = import.meta.env.VITE_SIGN_OUT_REDIRECT_URL;
const clientID = import.meta.env.VITE_CLIENT_ID;
const baseUrl = import.meta.env.VITE_BASE_URL;
const scope = import.meta.env.VITE_SCOPE.split(",");

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider
      config={{
        signInRedirectURL,
        signOutRedirectURL,
        clientID,
        baseUrl,
        scope,
      }}
    >
      <ReactNotifications />
      <App />
    </AuthProvider>
  </React.StrictMode>
);
