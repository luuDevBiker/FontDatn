import { CmsEmployees } from "@/components/cms/cms-employees/cms-employees";
import { Orders } from "@/components/orders/orders";
import React, { useState } from "react";
import { ProductDetail } from "../../components/home/product-detail";
import { MainLayoutHome } from "../../components/layout/main-layout/main-layout";
import { NextPageWithLayout } from "../../models/common";



const OrdersPages:NextPageWithLayout =()=>{
    const n:number=0;


    return(
        <React.Fragment>
            <Orders/>
        </React.Fragment>
    )
};

OrdersPages.Layout=MainLayoutHome
export default OrdersPages;