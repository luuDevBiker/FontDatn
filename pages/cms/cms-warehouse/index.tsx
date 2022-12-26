import { CmsProduct } from "@/components/cms/cms-products/cms-product";
import { CmsWareHouse } from "@/components/cms/cms-warehouse/transfer";
import React, { useState } from "react";
import { MainLayoutHome } from "../../../components/layout/main-layout/main-layout";
import { NextPageWithLayout } from "../../../models/common";



const WarehousePages:NextPageWithLayout =()=>{
    const n:number=0;


    return(
        <React.Fragment>
            <CmsWareHouse/>
        </React.Fragment>
    )
};

WarehousePages.Layout=MainLayoutHome
export default WarehousePages;