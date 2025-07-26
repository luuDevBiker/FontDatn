import MainHeader from "../../common/header/header";
import { LayoutProps } from "../../../models/common";
import React from "react";
import { MainLayOut, MainWrapper } from "./MainLayoutStyled";
import { Footer } from "@/components/footer/footer";

export interface IMainLayout {}

export function MainLayoutHome({ children }: LayoutProps) {
  return (
    <React.StrictMode>
      <MainWrapper style={{ minHeight: "100vh" }}>
        <MainWrapper className="site-layout" style={{ marginLeft: 0 }}>
          <MainHeader />
          <MainLayOut>{children}</MainLayOut>
          <Footer />
        </MainWrapper>
      </MainWrapper>
    </React.StrictMode>
  );
}
