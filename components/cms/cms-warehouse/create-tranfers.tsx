import { NextPageWithLayout } from "@/models/common"
import { WrapperCMSProduct, WrapProduct } from "@/styles/CmsProductStylead"
import Search from "antd/lib/input/Search"

export const CreateTransfer:NextPageWithLayout=()=>{
    return (
        <WrapperCMSProduct>
            <WrapProduct>
                <div className="title">Thêm sản phẩm</div>
                <Search/>   
            </WrapProduct>
        </WrapperCMSProduct>
    )
}