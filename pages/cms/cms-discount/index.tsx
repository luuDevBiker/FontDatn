import { Discount } from "@/components/cms/cms-discount/discount";
import { MainLayoutHome } from "@/components/layout/main-layout/main-layout";
import { NextPageWithLayout } from "@/models/common";
import React from "react";


 const DiscountPage:NextPageWithLayout=()=>{



    return (
        <React.Fragment>
            <Discount/>
        </React.Fragment>
        
    )
}

DiscountPage.Layout=MainLayoutHome
export default DiscountPage;