import {
  Box,
  BoxBody,
  BoxHeader,
  ContenRight,
} from "@/styles/CmsDiscountStyled";
import { WrapProduct } from "@/styles/CmsProductStylead";
import {
  CartItem,
  CheckOut,
  Wrapper,
  WrapperDiscount,
  WrapperDiscountLeft,
  WrapperDiscountRigth,
  WrapperVoucher,
} from "@/styles/ShoppingCartStyled";
import { DeleteOutlined } from "@ant-design/icons";
import { Col, Row, Image, Space, Input, Button } from "antd";
import IconVoucher from "@/assets/icon/teenyicons_discount-outline.svg";
import { Confirm } from "../popup-confirm/confirm";
import { useState } from "react";
import { useRouter } from "next/router";
export const ShoppingCart = () => {
  const router = useRouter();
  const [isConfirm, setIsConfirm] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  return (
    <Wrapper>
      <Row gutter={[20, 20]}>
        <Col span={16}>
          <Box>
            <BoxHeader>
              <div>Giỏ hàng</div>
              {/* <ContenRight>Giảm giá</ContenRight> */}
            </BoxHeader>
            <BoxBody>
              <CartItem>
                <Row gutter={[10, 10]}>
                  <Col span={6}>
                    <Image
                      preview={false}
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsyz5moQV9LR5P7gEmg51wUe2iq35A0GcbCw&usqp=CAU"
                      alt=""
                      width={"100%"}
                      height={"83%"}
                    />
                  </Col>
                  <Col span={8}>
                    <Space direction="vertical">
                      <div>Food for Dog for Dog for Dog for Dog</div>
                      <div>300.000dd</div>
                    </Space>
                  </Col>
                  <Col span={3}>
                    <Input type="number" value={6} />
                  </Col>
                  <Col span={5}>
                    <div>2.400.000</div>
                  </Col>
                  <Col span={2}>
                    <DeleteOutlined />
                  </Col>
                </Row>
              </CartItem>
              <CartItem>
                <Row gutter={[10, 10]}>
                  <Col span={6}>
                    <Image
                      preview={false}
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsyz5moQV9LR5P7gEmg51wUe2iq35A0GcbCw&usqp=CAU"
                      alt=""
                      width={"100%"}
                      height={"83%"}
                    />
                  </Col>
                  <Col span={8}>
                    <Space direction="vertical">
                      <div>Food for Dog for Dog for Dog for Dog</div>
                      <div>300.000dd</div>
                    </Space>
                  </Col>
                  <Col span={3}>
                    <Input type="number" value={6} />
                  </Col>
                  <Col span={5}>
                    <div>2.400.000</div>
                  </Col>
                  <Col span={2}>
                    <DeleteOutlined />
                  </Col>
                </Row>
              </CartItem>
              <CartItem>
                <Row gutter={[10, 10]}>
                  <Col span={6}>
                    <Image
                      preview={false}
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsyz5moQV9LR5P7gEmg51wUe2iq35A0GcbCw&usqp=CAU"
                      alt=""
                      width={"100%"}
                      height={"83%"}
                    />
                  </Col>
                  <Col span={8}>
                    <Space direction="vertical">
                      <div>Food for Dog for Dog for Dog for Dog</div>
                      <div>300.000dd</div>
                    </Space>
                  </Col>
                  <Col span={3}>
                    <Input type="number" value={6} />
                  </Col>
                  <Col span={5}>
                    <div>2.400.000</div>
                  </Col>
                  <Col span={2}>
                    <DeleteOutlined />
                  </Col>
                </Row>
              </CartItem>
            </BoxBody>
          </Box>
          <Button onClick={()=> router.push("/")} type="primary">{`< Quay lại mua hàng`}</Button>
        </Col>
        <Col span={8}>
          <WrapProduct>
            <div className="title">Chi tiết thanh toán</div>
            <CheckOut>
              <div>Tổng tiền</div>
              <div>400.000đ</div>
            </CheckOut>
            <CheckOut>
              <div>Phí ship</div>
              <div>20.000đ</div>
            </CheckOut>
            <CheckOut>
              <div>
                <img src={IconVoucher.src}></img>
                {``}
                <b>{` PetWorld Voucher`}</b>
              </div>
              <b
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setIsConfirm(true);
                }}
              >
                Chọn Hoặc Nhập Mã
              </b>
            </CheckOut>
            <br />
            <br />
            <br />
            <CheckOut>
              <div className="title">Tổng thanh toán</div>
              <div style={{ color: "red", fontSize: "18px" }}>420.0000.000</div>
            </CheckOut>
          </WrapProduct>
        </Col>
      </Row>

      <Confirm
        buttonLeft=""
        buttonRight=""
        changeActive={(e: any) => setIsConfirm(e)}
        content=""
        handleAction={() => {}}
        openModalConfirm={isConfirm}
        stateButton
        title="Mã giảm giá"
        wrapper={
          <WrapperVoucher>
            <Space>
              <div>Mã giảm giá</div>
              <div>
                <Input />
              </div>
              <Button>Áp dụng</Button>
            </Space>
            <div>Giảm giá</div>
            <WrapperDiscount>
              <WrapperDiscountLeft>s</WrapperDiscountLeft>
              <WrapperDiscountRigth>d</WrapperDiscountRigth>
            </WrapperDiscount>
            <WrapperDiscount>
              <WrapperDiscountLeft>s</WrapperDiscountLeft>
              <WrapperDiscountRigth>d</WrapperDiscountRigth>
            </WrapperDiscount>
            <WrapperDiscount>
              <WrapperDiscountLeft>s</WrapperDiscountLeft>
              <WrapperDiscountRigth>d</WrapperDiscountRigth>
            </WrapperDiscount>
          </WrapperVoucher>
        }
        width="600px"
      />
    </Wrapper>
  );
};

const product = [
  {
    Productname: "Thức ăn cho chó",
    Decription: "Thức ăn dành cho chó",
    Media: [
      {
        id: 1,
        absolutePath: "sdsd.jpg",
      },
      {
        id: 2,
        absolutePath: "sdsd.jpg",
      },
    ],
    Sku: "PW-THU02112001",
    ProductVariant: [
      {
        Name: "Thức ăn cho chó",
        option: [
          {
            optionName: "Color",
            optionValue: "Black",
          },
          {
            optionName: "Size",
            optionValue: "S",
          },
        ],
        importPrice: 30000,
        exportPrice: 43000,
        sku: "PW-BLACK-S-021122",
      },
      {
        Name: "Thức ăn cho chó",
        option: [
          {
            optionName: "Color",
            optionValue: "Black",
          },
          {
            optionName: "Size",
            optionValue: "XL",
          },
        ],
        importPrice: 30000,
        exportPrice: 43000,
        sku: "PW-BLACK-XL-021122",
      },
      {
        Name: "Thức ăn cho chó",
        option: [
          {
            optionName: "Color",
            optionValue: "Black",
          },
          {
            optionName: "Size",
            optionValue: "S",
          },
        ],
        importPrice: 30000,
        exportPrice: 43000,
        sku: "PW-BLACK-S-021122",
      },
      {
        Name: "Thức ăn cho chó",
        option: [
          {
            optionName: "Color",
            optionValue: "Black",
          },
          {
            optionName: "Size",
            optionValue: "XXL",
          },
        ],
        importPrice: 30000,
        exportPrice: 43000,
        sku: "PW-BLACK-XXL-021122",
      },
      {
        Name: "Thức ăn cho chó",
        option: [
          {
            optionName: "Color",
            optionValue: "Red ",
          },
          {
            optionName: "Size",
            optionValue: "S",
          },
        ],
        importPrice: 30000,
        exportPrice: 43000,
        sku: "PW-BLACK-S-021122",
      },
      {
        Name: "Thức ăn cho chó",
        option: [
          {
            optionName: "Color",
            optionValue: "Red ",
          },
          {
            optionName: "Size",
            optionValue: "XL",
          },
        ],
        importPrice: 30000,
        exportPrice: 43000,
        sku: "PW-BLACK-S-021122",
      },
    ],
  },
];
