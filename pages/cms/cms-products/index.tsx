import { CmsProduct } from "@/components/cms/cms-products/cms-product";
import React from "react";
import { MainLayoutHome } from "../../../components/layout/main-layout/main-layout";
import { NextPageWithLayout } from "../../../models/common";

const ProductDetailPages:NextPageWithLayout =()=>{
    return(
        <React.Fragment>
            <CmsProduct/>
        </React.Fragment>
    )
};

ProductDetailPages.Layout=MainLayoutHome
export default ProductDetailPages;