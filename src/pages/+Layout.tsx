import React from "react";

import { Analytics } from "@vercel/analytics/react";

import { Toaster } from "@/components/ui/toaster";
import { Provider } from "react-redux";
import { Provider as UIProvider } from "../components/ui/provider";
import { store } from "../store";

import { PhotoProvider } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

import "@fontsource-variable/noto-sans-sinhala";
import "@fontsource-variable/roboto";
import LayoutWrapper from "./LayoutWrapper";

import "./Layout.css";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <React.StrictMode>
      <Analytics />
      <UIProvider>
        <Provider store={store}>
          <PhotoProvider maskOpacity={0.5}>
            <LayoutWrapper>{children}</LayoutWrapper>
          </PhotoProvider>
        </Provider>
        <Toaster />
      </UIProvider>
    </React.StrictMode>
  );
}

export default Layout;
