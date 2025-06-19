import { Grid } from "@/components/blog/Grid";
import React from "react";
import { MainLayoutHome } from "../../components/layout/main-layout/main-layout";
import { NextPageWithLayout } from "../../models/common";

const BlogPages:NextPageWithLayout =()=>{
    return(
        <React.Fragment>
            <Grid/>
        </React.Fragment>
    )   
};

BlogPages.Layout=MainLayoutHome
export default BlogPages;