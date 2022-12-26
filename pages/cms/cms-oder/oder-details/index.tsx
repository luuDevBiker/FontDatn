import { Oders } from "@/components/cms/cms-order/oder";
import { CmsOder } from "@/components/cms/cms-order/view-oder";
import { CmsProduct } from "@/components/cms/cms-products/cms-product";
import React, { useState } from "react";
import { ProductDetail } from "../../../../components/home/product-detail";
import { MainLayoutHome } from "../../../../components/layout/main-layout/main-layout";
import { NextPageWithLayout } from "../../../../models/common";



const OderPages:NextPageWithLayout =()=>{
    const n:number=0;


    return(
        <React.Fragment>
            <Oders/>
        </React.Fragment>
    )
};

OderPages.Layout=MainLayoutHome
export default OderPages;