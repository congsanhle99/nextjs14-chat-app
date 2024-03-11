"use client";
import { ConfigProvider } from "antd";
import React from "react";

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#31304d",
          borderRadius: 4,
        },
        components: {
          Button: {
            controlHeight: 45,
            boxShadow: "none",
            colorPrimaryBgHover: "#31304d",
            colorPrimaryHover: "#31304d",
            controlOutline: "none",
            colorBorder: "#31304d",
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default ThemeProvider;
