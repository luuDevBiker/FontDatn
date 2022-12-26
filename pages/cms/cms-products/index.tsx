import { CmsProduct } from "@/components/cms/cms-products/cms-product";
import React, { useState } from "react";
import { ProductDetail } from "../../../components/home/product-detail";
import { MainLayoutHome } from "../../../components/layout/main-layout/main-layout";
import { NextPageWithLayout } from "../../../models/common";



const ProductDetailPages:NextPageWithLayout =()=>{
    const n:number=0;


    return(
        <React.Fragment>
            <CmsProduct/>
        </React.Fragment>
    )
};

ProductDetailPages.Layout=MainLayoutHome
export default ProductDetailPages;