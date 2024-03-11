import React from "react";
import Header from "./layout-components/Header";
import Content from "./layout-components/Content";

const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <Content>{children}</Content>
    </>
  );
};

export default LayoutProvider;
