import { Blog } from "@/components/blog/blog";
import { BlogDetail } from "@/components/blog/blog-details";
import { CmsProduct } from "@/components/cms/cms-products/cms-product";
import React, { useState } from "react";
import { MainLayoutHome } from "../../../components/layout/main-layout/main-layout";
import { NextPageWithLayout } from "../../../models/common";



const BlogDetailsPages:NextPageWithLayout =()=>{
    const n:number=0;


    return(
        <React.Fragment>
            <BlogDetail/>
        </React.Fragment>
    )   
};

BlogDetailsPages.Layout=MainLayoutHome
export default BlogDetailsPages;