import { CmsEmployees } from "@/components/cms/cms-employees/cms-employees";
import { OrdersShipping } from "@/components/orders/orders-shipping";
import React, { useState } from "react";
import { ProductDetail } from "../../../components/home/product-detail";
import { MainLayoutHome } from "../../../components/layout/main-layout/main-layout";
import { NextPageWithLayout } from "../../../models/common";



const OrdersShippingPages:NextPageWithLayout =()=>{
    const n:number=0;
    return(
        <React.Fragment>
            <OrdersShipping/>
        </React.Fragment>
    )
};

OrdersShippingPages.Layout=MainLayoutHome
export default OrdersShippingPages;