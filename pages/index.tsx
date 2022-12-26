import { CmsProduct } from "@/components/cms/cms-products/cms-product";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Home } from "../components/home/home";
import { MainLayoutHome } from "../components/layout/main-layout/main-layout";
import MainSidebar from "../components/layout/main-layout/main-sidebar/main-sidebar";
import { NextPageWithLayout } from "../models/common";
import styles from "../styles/Home.module.css";

const HomePages: NextPageWithLayout = () => {
  return (
    <div>
      <Home />
      {/* <CmsProduct /> */}
    </div>
  );
};
HomePages.Layout = MainLayoutHome;
export default HomePages;
