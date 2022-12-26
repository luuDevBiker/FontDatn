import { CmsEmployees } from "@/components/cms/cms-employees/cms-employees";
import React, { useState } from "react";
import { ProductDetail } from "../../../components/home/product-detail";
import { MainLayoutHome } from "../../../components/layout/main-layout/main-layout";
import { NextPageWithLayout } from "../../../models/common";

const EmployeesPages: NextPageWithLayout = () => {
  const n: number = 0;
  return (
    <React.Fragment>
      <CmsEmployees />
    </React.Fragment>
  );
};

EmployeesPages.Layout = MainLayoutHome;
export default EmployeesPages;
