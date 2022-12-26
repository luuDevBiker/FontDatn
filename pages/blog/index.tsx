import { Blog } from "@/components/blog/blog";
import { Grid } from "@/components/blog/Grid";
import { CmsProduct } from "@/components/cms/cms-products/cms-product";
import React, { useState } from "react";
import { MainLayoutHome } from "../../components/layout/main-layout/main-layout";
import { NextPageWithLayout } from "../../models/common";



const BlogPages:NextPageWithLayout =()=>{
    const n:number=0;


    return(
        <React.Fragment>
            <Grid/>
        </React.Fragment>
    )   
};

BlogPages.Layout=MainLayoutHome
export default BlogPages;