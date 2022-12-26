import { CmsProduct } from "@/components/cms/cms-products/cms-product";
import { CreateTransfer } from "@/components/cms/cms-warehouse/create-tranfers";
import { CmsWareHouse } from "@/components/cms/cms-warehouse/transfer";
import React, { useState } from "react";
import { MainLayoutHome } from "../../../../components/layout/main-layout/main-layout";
import { NextPageWithLayout } from "../../../../models/common";



const CreateTranfersPage:NextPageWithLayout =()=>{
    const n:number=0;


    return(
        <React.Fragment>
            <CreateTransfer/>
        </React.Fragment>
    )
};

CreateTranfersPage.Layout=MainLayoutHome
export default CreateTranfersPage;