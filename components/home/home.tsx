import {
  Col, Row,
  Image, Space,
  Input,
  Button
} from "antd";
import { useEffect, useState } from "react";
import { NextPageWithLayout } from "../../models/common";
import {
  ButtonAddtoCart2, WrapperPopupBody,
  WrapperPopupHeader
} from "../../styles/HomeStyled";
import "antd/dist/antd.css";
import { Confirm } from "../popup-confirm/confirm";
import { useAppDispatch } from "@/app/hooks";
import { getListProduct } from "@/features/product-slice";
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
        handleAction={() => { }}
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
                        <Image
                          alt=""
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
                        <Image
                          alt=""
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
                        <Image
                          alt=""
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
                        <Image
                          alt=""
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
