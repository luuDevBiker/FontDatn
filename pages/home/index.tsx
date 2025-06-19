import React from "react";
import { Home } from "../../components/home/home";
import { MainLayoutHome } from "../../components/layout/main-layout/main-layout";
import { NextPageWithLayout } from "../../models/common";

const HomePages:NextPageWithLayout =()=>{
    return(
        <React.Fragment>
            <Home/>
        </React.Fragment>
    )
};

HomePages.Layout=MainLayoutHome
export default HomePages;