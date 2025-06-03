import { CmsOder } from "@/components/cms/cms-order/view-order";
import React from "react";
import { MainLayoutHome } from "../../../components/layout/main-layout/main-layout";
import { NextPageWithLayout } from "../../../models/common";

const OderPages: NextPageWithLayout = () => {
    return (
        <React.Fragment>
            <CmsOder />
        </React.Fragment>
    )
};
OderPages.Layout = MainLayoutHome
export default OderPages;