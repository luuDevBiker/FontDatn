import { ProductDetailComponents } from "@/components/product-detail-components";
import React, { useState } from "react";
import { MainLayoutHome } from "../../components/layout/main-layout/main-layout";
import { NextPageWithLayout } from "../../models/common";



const ShoppingCartPages:NextPageWithLayout =()=>{
    return(
        <React.Fragment>
            <ProductDetailComponents/>
        </React.Fragment>
    )
};

ShoppingCartPages.Layout=MainLayoutHome
export default ShoppingCartPages;