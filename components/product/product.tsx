import {
  Col,
  Layout,
  Rate,
  Row,
  Image,
  Tooltip,
  Carousel,
  Space,
  Input,
  Button,
  Radio,
} from "antd";
import React, { useEffect, useState } from "react";
import { NextPageWithLayout } from "../../models/common";
import {
  BoxContent,
  BoxDecription,
  Boxheart,
  BoxNameProduct,
  BoxPrice,
  BoxProduct,
  BoxProductBody,
  BoxProductHeader,
  BoxSlider,
  BoxView,
  BoxViewer,
  ButtonAddtoCart,
  ButtonAddtoCart2,
  WrapperImage,
  WrapperPopupBody,
  WrapperPopupHeader,
} from "../../styles/HomeStyled";
import "antd/dist/antd.css";
import Link from "next/link";
import {
  CheckOutlined,
  ExpandOutlined,
  HeartFilled,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Carosel from "../../assets/layout/adorable-white-dog-isolated-blue.jpg";
import { ListCarousel, listMenu, product, productList } from "@/utils/data";
import { Confirm } from "../popup-confirm/confirm";
import { SP } from "next/dist/shared/lib/utils";
import { useAppDispatch } from "@/app/hooks";
import { getListProduct } from "@/features/product-slice";
import { Footer } from "../footer/footer";
import {
  ButtonAddtoCartCustom,
  LeftMenu,
  WraperProduct,
  WrapperProductMain,
} from "@/styles/ProductWrapperStyled";
import { useRouter } from "next/router";

export const ProductCategory: NextPageWithLayout = (prop) => {
  const router = useRouter();
  const [hover, setHover] = useState<boolean>(false);
  const [openPopub, setOpenPopup] = useState<boolean>(false);
  const [isConfirm, setIsConfirm] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [initId, setInitId] = useState<string>("");
  const [data, setData] = useState<any>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getListProduct())
      .unwrap()
      .then()
      .then((res) => {
        setData(res);
      });
  }, []);
  const handleHover = (value: any) => {
    setInitId(value.productId);
    setHover(false);
  };

  const handleOpenPopup = () => {
    setIsConfirm(true);
  };

  const handleMouseOut = () => {
    setHover(true);
  };
  return (
    <div>
      <Row gutter={10}>
        {/* left menu */}
        <Col span={4}>
          <LeftMenu>
            {listMenu.map((item, index) => (
              <div className="wrapper" key={index}>
                <Space>
                  <item.icon />
                  <div>{item.name}</div>
                </Space>
              </div>
            ))}
          </LeftMenu>
        </Col>
        {/* Slide show */}
        <Col span={14}>
          <Carousel effect="fade" autoplay>
            {ListCarousel.map((item, index) => (
              <div key={index}>
                <Image preview={false} src={item.image} />
              </div>
            ))}
          </Carousel>
          <Row gutter={10}>
            <Col span={12}>
              <Image
                preview={false}
                src="https://hanoicomputercdn.com/media/banner/26_Nov608efd41d1ba4dff0db8d91f71879889.jpg"
              ></Image>
            </Col>
            <Col span={12}>
              <Image
                preview={false}
                src="https://hanoicomputercdn.com/media/banner/26_Novc6fa2f69cd122b688c5b21549796af3d.jpg"
              ></Image>
            </Col>
          </Row>
        </Col>

        {/* Right */}
        <Col span={6}>
          <Row gutter={[15, 15]}>
            <Col span={24}>
              <div>
                <Image
                  preview={false}
                  src="https://hanoicomputercdn.com/media/banner/26_Novc905ee98c1286b503be72f84ba93b446.jpg"
                  height={"200px"}
                ></Image>
              </div>
            </Col>
            <Col span={24}>
              <div>
                <Image
                  preview={false}
                  src="https://hanoicomputercdn.com/media/banner/26_Novc905ee98c1286b503be72f84ba93b446.jpg"
                  height={"200px"}
                ></Image>
              </div>
            </Col>
            <Col span={24}>
              <div>
                <Image
                  preview={false}
                  src="https://hanoicomputercdn.com/media/banner/26_Novc905ee98c1286b503be72f84ba93b446.jpg"
                  height={"200px"}
                ></Image>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>

      <WrapperProductMain>
        <Row gutter={[20, 20]}>
          {data &&
            data.Payload.map((item: any, index: number) => {
              return item.ProductVariants.map((variant: any, index: number) => (
                <Col span={6}>
                  <WraperProduct>
                    <div className="image">
                      <Image
                        preview={false}
                        className="img"
                        src={variant.Images[0].Url}
                        width={270}
                        height={320}
                      ></Image>
                    </div>
                    <div className="rate">
                      <Rate allowHalf value={5.0} />
                      <div>{variant.SkuId}</div>
                    </div>
                    <div className="name">
                      {item.Name.slice(0, 121).toUpperCase()}
                    </div>
                    <del className="del">
                      {variant.Price.toLocaleString("vi")}
                      <sup>đ</sup>
                    </del>
                    <span className="sale">
                      &#10088;Tiết kiệm: {variant.Sale ? variant.Sale : 5}
                      %&#10089;
                    </span>
                    <div className="price">
                      {((variant.Price / 100) * 95).toLocaleString("price")}
                      <sup>đ</sup>
                    </div>
                    <div className="rate">
                      <div
                        style={{
                          color: variant.Quantity == 0 ? "#d40d0d" : "#2cc067",
                          fontSize: "13px",
                        }}
                      >
                        <CheckOutlined style={{ marginRight: "5px" }} />
                        {variant.Quantity == 0 ? "Hết hàng" : "Còn hàng"}
                      </div>
                      {/* button add to card */}
                      <ShoppingCartOutlined
                        onClick={() => {
                          alert("Mua hang");
                        }}
                        className="svg"
                        style={{ fontSize: "16px" }}
                      />
                    </div>
                    <ButtonAddtoCartCustom
                      onClick={() => {
                        if (typeof window !== "undefined") {
                          localStorage.setItem("product", JSON.stringify(item));
                        }
                        router.push({
                          pathname: `/product-details/${item.Id}`,
                          query: { id: item.Id, key: variant.Id },
                        });
                      }}
                    >
                      Xem chi tiết sản phẩm
                    </ButtonAddtoCartCustom>
                  </WraperProduct>
                </Col>
              ));
            })}
        </Row>
      </WrapperProductMain>
    </div>
  );
};
