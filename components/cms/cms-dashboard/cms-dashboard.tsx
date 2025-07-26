import { NextPageWithLayout } from "@/models/common";
import { WrapperCMSProduct, HeadingTitle } from "@/styles/CmsProductStylead";
import { BreadcrumbStyle, WrapperHeader } from "@/styles/DashBoardStyled";
import { Breadcrumb } from "antd";
import { useRouter } from "next/router";
import { Button } from "antd";

export const CmsDashBoard: NextPageWithLayout = () => {
  const router = useRouter();
  return (
    <WrapperCMSProduct>
      <HeadingTitle>
        <div style={{ listStyle: "none" }}>
          <h5 className="mx-2 title-element-1 title-element-3">Quản Lý </h5>
          {""}
          <Button
            className="title-element-2 title-element-1"
            type="ghost"
            size="small"
            onClick={() => router.push("/cms/cms-products")}
          >
            Sản Phẩm
          </Button>
          <Button
            className="title-element-2 title-element-1"
            type="ghost"
            size="small"
            onClick={() => router.push("/cms/cms-order")}
          >
            Đơn Hàng
          </Button>
          <Button
            className="title-element-2 title-element-1"
            type="ghost"
            size="small"
            onClick={() => router.push("/cms/cms-categories")}
          >
            Danh Mục
          </Button>
          <Button
            className="title-element-2 title-element-1"
            type="ghost"
            size="small"
            onClick={() => router.push("/cms/cms-warehouse")}
          >
            Kho
          </Button>
          <Button
            className="title-element-2 title-element-1"
            type="ghost"
            size="small"
            onClick={() => router.push("/cms/cms-employees")}
          >
            Nhân Viên
          </Button>
        </div>
      </HeadingTitle>
      <WrapperHeader>
        {" "}
        <BreadcrumbStyle className="title-element-1 title-element-2 title-element-1">
          <Breadcrumb.Item>
            <span className={"breadcrumb-item"}>Trang Chính</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <span className={"breadcrumb-item"}>Quản Lý</span>
          </Breadcrumb.Item>
        </BreadcrumbStyle>
      </WrapperHeader>
    </WrapperCMSProduct>
  );
};
