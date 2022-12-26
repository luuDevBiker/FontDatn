import { CmsProduct } from "@/components/cms/cms-products/cms-product";
import { CreateTransfer } from "@/components/cms/cms-warehouse/create-tranfers";
import { CmsWareHouse } from "@/components/cms/cms-warehouse/transfer";
import { VerifyTransfer } from "@/components/cms/cms-warehouse/verify-transfer";
import React, { useState } from "react";
import { MainLayoutHome } from "../../../../components/layout/main-layout/main-layout";
import { NextPageWithLayout } from "../../../../models/common";



const VerifyTransferPage:NextPageWithLayout =()=>{
    const n:number=0;


    return(
        <React.Fragment>
            <VerifyTransfer/>
        </React.Fragment>
    )
};

VerifyTransferPage.Layout=MainLayoutHome
export default VerifyTransferPage;