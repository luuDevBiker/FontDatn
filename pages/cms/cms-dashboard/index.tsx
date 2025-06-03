import { CmsDashBoard } from "@/components/cms/cms-dashboard/cms-dashboard";
import React from "react";
import { MainLayoutHome } from "../../../components/layout/main-layout/main-layout";
import { NextPageWithLayout } from "../../../models/common";

const ProductDetailPages: NextPageWithLayout = () => {
  const n: number = 0;
  return (
    <React.Fragment>
      <CmsDashBoard />
    </React.Fragment>
  );
};

ProductDetailPages.Layout = MainLayoutHome;
export default ProductDetailPages;
