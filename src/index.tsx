import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider as UIProvider } from "./components/ui/provider";

import { Provider } from "react-redux";

import "@fontsource/roboto";
import "@fontsource/noto-sans-sinhala";
import { store } from "./store";
import { Toaster } from "./components/ui/toaster";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UIProvider>
      <Router>
        <Provider store={store}>
          <App />
        </Provider>
      </Router>
      <Toaster />
    </UIProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
