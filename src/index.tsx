import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

import { BrowserRouter as Router } from "react-router-dom";
import { Provider as UIProvider } from "./components/ui/provider";

import { Provider } from "react-redux";

import "@fontsource/roboto";
import "@fontsource/noto-sans-sinhala";
import { store } from "./store";
import { Toaster } from "./components/ui/toaster";

import { PhotoProvider } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Analytics } from "@vercel/analytics/react";

import { HelmetProvider } from "react-helmet-async";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Analytics />
    <UIProvider>
      <Router>
        <Provider store={store}>
          <PhotoProvider maskOpacity={0.5}>
            <HelmetProvider>
              <App />
            </HelmetProvider>
          </PhotoProvider>
        </Provider>
      </Router>
      <Toaster />
    </UIProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
