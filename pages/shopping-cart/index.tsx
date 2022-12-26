import { CmsEmployees } from "@/components/cms/cms-employees/cms-employees";
import { ShoppingCart } from "@/components/shopping-cart/shopping-cart";
import React, { useState } from "react";
import { ProductDetail } from "../../components/home/product-detail";
import { MainLayoutHome } from "../../components/layout/main-layout/main-layout";
import { NextPageWithLayout } from "../../models/common";



const ShoppingCartPages:NextPageWithLayout =()=>{
    const n:number=0;


    return(
        <React.Fragment>
            <ShoppingCart/>
        </React.Fragment>
    )
};

ShoppingCartPages.Layout=MainLayoutHome
export default ShoppingCartPages;