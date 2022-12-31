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
import { ExpandOutlined, HeartFilled } from "@ant-design/icons";
import Carosel from "../../assets/layout/adorable-white-dog-isolated-blue.jpg";
import { QuickShow } from "./popup-show";
import { product } from "@/utils/data";
import { Confirm } from "../popup-confirm/confirm";
import { SP } from "next/dist/shared/lib/utils";
import { useAppDispatch } from "@/app/hooks";
import { getListProduct } from "@/features/product-slice";
import { Footer } from "../footer/footer";
import { ProductCategory } from "../product/product";

export const Home: NextPageWithLayout = (prop) => {
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
      <ProductCategory />
      <Confirm
        buttonLeft={""}
        buttonRight={""}
        changeActive={(e: any) => setIsConfirm(e)}
        content={""}
        handleAction={() => {}}
        title={""}
        stateButton={false}
        wrapper={
          <>
            <WrapperPopupHeader>
              <Row>
                <Col span={11}>
                  <div className="image">
                    <Image
                      preview={false}
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsyz5moQV9LR5P7gEmg51wUe2iq35A0GcbCw&usqp=CAU"
                      alt=""
                      width={"100%"}
                      height={"100%"}
                    />
                  </div>
                </Col>
                <Col span={13}>
                  <div className="price">
                    <Space direction="vertical">
                      <span>đ250.000</span>
                      <div>Kho: 904</div>
                    </Space>
                  </div>
                </Col>
              </Row>
              <hr style={{ opacity: 0.3 }} />
            </WrapperPopupHeader>
            <WrapperPopupBody>
              <div className="title">Màu sắc:</div>
              <Row gutter={[10, 10]}>
                <Col span={4}>
                  <div className="coloring">
                    <div className="flexColoring">
                      <div style={{ width: "50%", padding: "8px" }}>
                        <img
                          src="https://media.gucci.com/style/Transparent_Center_0_0_250x170/1665396005/715773_FAARB_1041_001_100_0000_Light.png"
                          width={"50px"}
                          height={"100%"}
                        />
                      </div>
                      <div className="text">Đỏ</div>
                    </div>
                  </div>
                </Col>
                <Col span={4}>
                  <div className="coloring">
                    <div className="flexColoring">
                      <div style={{ width: "50%", padding: "8px" }}>
                        <img
                          src="https://media.gucci.com/style/Transparent_Center_0_0_250x170/1665396005/715773_FAARB_1041_001_100_0000_Light.png"
                          width={"50px"}
                          height={"100%"}
                        />
                      </div>
                      <div className="text">Đỏ</div>
                    </div>
                  </div>
                </Col>
                <Col span={4}>
                  <div className="coloring">
                    <div className="flexColoring">
                      <div style={{ width: "50%", padding: "8px" }}>
                        <img
                          src="https://media.gucci.com/style/Transparent_Center_0_0_250x170/1665396005/715773_FAARB_1041_001_100_0000_Light.png"
                          width={"50px"}
                          height={"100%"}
                        />
                      </div>
                      <div className="text">Đỏ</div>
                    </div>
                  </div>
                </Col>
                <Col span={4}>
                  <div className="coloring">
                    <div className="flexColoring">
                      <div style={{ width: "50%", padding: "8px" }}>
                        <img
                          src="https://media.gucci.com/style/Transparent_Center_0_0_250x170/1665396005/715773_FAARB_1041_001_100_0000_Light.png"
                          width={"50px"}
                          height={"100%"}
                        />
                      </div>
                      <div className="text">Đỏ</div>
                    </div>
                  </div>
                </Col>
              </Row>
            </WrapperPopupBody>
            <WrapperPopupBody>
              <div className="title">Size:</div>
              <div className="border">
                <div className="size">L</div>
                <div className="size">S</div>
                <div className="size">XXl</div>
              </div>
              <div className="quantitys">
                <div>Số lượng</div>
                <div>
                  <Space>
                    <Button>+</Button>
                    <Input type="number" />
                    <Button>-</Button>
                  </Space>
                </div>
              </div>
              <div className="center">
                <ButtonAddtoCart2>Thêm vào giỏ hàng</ButtonAddtoCart2>
              </div>
            </WrapperPopupBody>
          </>
        }
        width={"640px"}
        openModalConfirm={isConfirm}
      />
    </div>
  );
};
