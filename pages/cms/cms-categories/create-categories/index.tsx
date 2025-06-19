import CreateCategories from "@/components/cms/cms-categories/create-categories";
import React from "react";
import { MainLayoutHome } from "../../../../components/layout/main-layout/main-layout";
import { NextPageWithLayout } from "../../../../models/common";

const ProductDetailPages:NextPageWithLayout =()=>{
    return(
        <React.Fragment>
            <CreateCategories/>
        </React.Fragment>
    )
};

ProductDetailPages.Layout=MainLayoutHome
export default ProductDetailPages;