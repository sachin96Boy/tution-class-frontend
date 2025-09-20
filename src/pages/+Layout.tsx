import React from "react";

import { Analytics } from "@vercel/analytics/react";

import { Provider as UIProvider } from "../components/ui/provider";
import { Toaster } from "@/components/ui/toaster";
import { Provider } from "react-redux";
import { store } from "../store";

import { PhotoProvider } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "@fontsource/roboto";
import "@fontsource/noto-sans-sinhala";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <React.StrictMode>
      <Analytics />
      <UIProvider>
        <Provider store={store}>
          <PhotoProvider maskOpacity={0.5}>{children}</PhotoProvider>
        </Provider>
        <Toaster />
      </UIProvider>
    </React.StrictMode>
  );
}

export default Layout;
