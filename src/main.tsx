import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { RootStore, RootStoreContext } from "./stores/rootStore.ts";
import { Toaster } from "sonner";

const rootStore = new RootStore();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <RootStoreContext.Provider value={rootStore}>
        <App />
        <Toaster position="bottom-right" />
      </RootStoreContext.Provider>
    </BrowserRouter>
  </React.StrictMode>
);
