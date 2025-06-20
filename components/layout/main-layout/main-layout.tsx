// import { useAppSelector } from '@/app/hooks';
import MainHeader from "../../common/header/header";

import { IMainHeaderProps, LayoutProps } from "../../../models/common";
import React from "react";
import { MainLayOut, MainWrapper } from "./MainLayoutStyled";
import { Footer } from "@/components/footer/footer";
import { selectUser } from "@/features/user-slice";
import { useAppSelector } from "@/app/hooks";


export interface IMainLayout {}

export function MainLayoutHome({ children }: LayoutProps) {


  const { loginInfo } = useAppSelector(selectUser);
  const headerProps: IMainHeaderProps = {
    loginInfo: loginInfo,
  };


  return (
    <React.StrictMode>
      <MainWrapper style={{ minHeight: "100vh" }}>
        <MainWrapper className="site-layout" style={{ marginLeft: 0 }}>
          <MainHeader {...headerProps} />
          <MainLayOut>{children}</MainLayOut>
          <Footer />
        </MainWrapper>
      </MainWrapper>
    </React.StrictMode>
  );
}
