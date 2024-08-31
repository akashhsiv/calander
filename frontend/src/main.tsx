import { createRoot } from "react-dom/client";
import App from "./App";
import AuthProvider from "react-auth-kit/AuthProvider";
import createStore from "react-auth-kit/createStore";
import { Provider } from "react-redux";
import store from "./components/app/store";

const container = document.getElementById("root");
const root = createRoot(container!);

const store1 = createStore({
  authName: "_auth",
  authType: "cookie",
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === "https:",
});

root.render(
  <AuthProvider store={store1}>
    <Provider store={store}>
      <App />
    </Provider>
  </AuthProvider>
);
