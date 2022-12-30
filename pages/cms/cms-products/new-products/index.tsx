import { CmsProduct } from "@/components/cms/cms-products/cms-product";
import { CreateProduct } from "@/components/cms/cms-products/create-product";
import React, { useState } from "react";

import { MainLayoutHome } from "../../../../components/layout/main-layout/main-layout";
import { NextPageWithLayout } from "../../../../models/common";



const NewProductPages:NextPageWithLayout =()=>{
    const n:number=0;


    return(
        <React.Fragment>
            <CreateProduct/>
        </React.Fragment>
    )
};

NewProductPages.Layout=MainLayoutHome
export default NewProductPages;