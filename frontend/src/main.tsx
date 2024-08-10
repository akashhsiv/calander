import { createRoot } from "react-dom/client";
import App from "./App";
import  AuthProvider  from 'react-auth-kit/AuthProvider';
import createStore from "react-auth-kit/createStore";

const container = document.getElementById("root");
const root = createRoot(container!);

const store = createStore({
  authName: "_auth",
  authType: "cookie",
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === "https:",
});

root.render(
  <AuthProvider store={store}>
    <App />
  </AuthProvider>
);
