import { Orders } from "@/components/cms/cms-order/order";
import { CmsOder } from "@/components/cms/cms-order/view-order";
import { CmsProduct } from "@/components/cms/cms-products/cms-product";
import React, { useState } from "react";
import { ProductDetail } from "../../../../components/home/product-detail";
import { MainLayoutHome } from "../../../../components/layout/main-layout/main-layout";
import { NextPageWithLayout } from "../../../../models/common";



const OderPages:NextPageWithLayout =()=>{
    const n:number=0;


    return(
        <React.Fragment>
            <Orders/>
        </React.Fragment>
    )
};

OderPages.Layout=MainLayoutHome
export default OderPages;