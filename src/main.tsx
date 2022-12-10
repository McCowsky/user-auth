import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { worker } from "./mocks/browser";
import { AuthProvider } from "./context/AuthProvider";

worker.start({
  serviceWorker: {
    //url: "/Trello-clone/mockServiceWorker.js",
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
