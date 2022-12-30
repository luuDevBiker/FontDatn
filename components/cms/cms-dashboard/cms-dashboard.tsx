import { NextPageWithLayout } from "@/models/common";
import { WrapperCMSProduct, HeadingTitle } from "@/styles/CmsProductStylead";
import {
  Box,
  BoxBody,
  BoxBodyder,
  BoxFirst,
  BoxHead,
  BoxHeader,
  BoxSecond,
  BreadcrumbStyle,
  ContenRight,
  WrapperBox,
  WrapperBox1,
  WrapperBox2,
  WrapperBox3,
  WrapperHeader,
} from "@/styles/DashBoardStyled";
import { ShoppingOutlined } from "@ant-design/icons";
import { Breadcrumb, Col, Row } from "antd";
import Link from "next/link";
import React from "react";
import { BestSeller } from "./best-seller";
import { DashboardSales } from "./dashboard-sales";
import { useRouter } from "next/router";
import { Button } from "antd";

export const CmsDashBoard: NextPageWithLayout = () => {
  const router = useRouter();

  return (
    <WrapperCMSProduct>
      <HeadingTitle>
        <div style={{ listStyle: "none" }}>
            <b>Manager :</b>{""}
          <Button
            type="ghost"
            size="small"
            onClick={() => router.push("/cms/cms-products")}
          >
            Sản Phẩm
          </Button>
          <Button
            type="ghost"
            size="small"
            onClick={() => router.push("/cms/cms-order")}
          >
            Đơn Hàng
          </Button>
          <Button
            type="ghost"
            size="small"
            onClick={() => router.push("/cms/cms-warehouse")}
          >
            Kho
          </Button>
          <Button
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
        <BreadcrumbStyle>
          <Breadcrumb.Item>
            <span className={"breadcrumb-item"}>Home</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <span className={"breadcrumb-item"}>Dashboard</span>
          </Breadcrumb.Item>
        </BreadcrumbStyle>
      </WrapperHeader>
      <BoxFirst>
        <Row gutter={[30, 30]}>
          <Col xs={24} sm={12} md={12} xxl={6} xl={6}>
            <WrapperBox>
              <BoxHead>
                <div>1000</div>
                <ShoppingOutlined />
              </BoxHead>
              <BoxBody>
                <div>Số sản phẩm bán</div>
                <div>23%</div>
              </BoxBody>
            </WrapperBox>
          </Col>
          <Col xs={24} sm={12} md={12} xxl={6} xl={6}>
            <WrapperBox1>
              <BoxHead>
                <div>1000 USD</div>
                <ShoppingOutlined />
              </BoxHead>
              <BoxBody>
                <div>Doanh thu</div>
                <div>23%</div>
              </BoxBody>
            </WrapperBox1>
          </Col>
          <Col xs={24} sm={12} md={12} xxl={6} xl={6}>
            <WrapperBox2>
              <BoxHead>
                <div>1000</div>
                <ShoppingOutlined />
              </BoxHead>
              <BoxBody>
                <div>Doanh thu</div>
                <div>23%</div>
              </BoxBody>
            </WrapperBox2>
          </Col>
          <Col xs={24} sm={12} md={12} xxl={6} xl={6}>
            <WrapperBox3>
              <BoxHead>
                <div>1000</div>
                <ShoppingOutlined />
              </BoxHead>
              <BoxBody>
                <div>Doanh thu</div>
                <div>23%</div>
              </BoxBody>
            </WrapperBox3>
          </Col>
        </Row>
      </BoxFirst>
      <BoxSecond>
        <Row gutter={[20, 20]}>
          <Col span={12}>
            <Box>
              <BoxHeader>
                <div>Doanh thu các tháng trong năm</div>
                <ContenRight>Sales</ContenRight>
              </BoxHeader>
              <BoxBodyder>
                <DashboardSales />
              </BoxBodyder>
            </Box>
          </Col>
          <Col span={12}>
            <Box>
              <BoxHeader>
                <div>Doanh thu các tháng trong năm</div>
                <ContenRight>Sales</ContenRight>
              </BoxHeader>
              <BoxBodyder>
                <DashboardSales />
              </BoxBodyder>
            </Box>
          </Col>
        </Row>
      </BoxSecond>
      <BoxSecond>
        <Row gutter={[20, 20]}>
          <Col span={24}>
            <Box>
              <BoxHeader>
                <div>Doanh thu các tháng trong năm</div>
                <ContenRight>Sales</ContenRight>
              </BoxHeader>
              <BoxBodyder>
                <BestSeller />
              </BoxBodyder>
            </Box>
          </Col>
        </Row>
      </BoxSecond>
    </WrapperCMSProduct>
  );
};
