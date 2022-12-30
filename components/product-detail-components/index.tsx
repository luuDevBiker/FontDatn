import React, { useEffect, useState } from "react";
import {
  Col,
  Rate,
  Row,
  Image,
  Breadcrumb,
  Card,
  List,
  Divider,
  Space,
  InputNumber,
  Typography,
  Button,
} from "antd";
import { NextPageWithLayout } from "../../models/common";
import "antd/dist/antd.css";
import Link from "next/link";
import {
  CheckOutlined,
  ExpandOutlined,
  HeartFilled,
  ShoppingCartOutlined,
  UserOutlined,
  GiftOutlined,
} from "@ant-design/icons";
import { ListImageDetail, product } from "@/utils/data";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
  getListProduct,
  getProductDetails,
  selectProduct,
} from "@/features/product-slice";
import {
  ButtonAddtoCartCustom,
  WraperProduct,
  WrapperProductMain,
} from "@/styles/ProductWrapperStyled";
import {
  ListCartImage,
  ListItemImage,
  ProductDetailContent,
  ProductDetailWrapper,
  RateProduct,
  StyledUl,
  CardGift,
  StylePrice,
  StylePriceItem,
  TitleProduct,
  WrapperContentProduct,
  StyleQuantity,
  ButtonWrapper,
  BtnOrderNow,
  WrapperRight,
} from "./ProductdetailStyled";
import { BreadcrumbStyle } from "@/styles/DashBoardStyled";
import { useRouter } from "next/router";
import { stringify } from "querystring";

export const ProductDetailComponents: NextPageWithLayout = (prop) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { productDetails } = useAppSelector(selectProduct);

  const { key,id } = router.query;
  const [data, setData] = useState<any>();
  useEffect(() => {
    dispatch(getProductDetails({id,key}))
      .unwrap()
      .then()
      .then((res) => {
        setData(res);
      });
  }, []);

  return data != undefined && data ? (
    <ProductDetailWrapper>
      <BreadcrumbStyle>
        <Breadcrumb.Item>{data.Payload.Brand}</Breadcrumb.Item>
        <Breadcrumb.Item>{data.Payload.Categoty}</Breadcrumb.Item>
        <Breadcrumb.Item>{data.Payload.Name}</Breadcrumb.Item>
      </BreadcrumbStyle>
      <ProductDetailContent>
        <TitleProduct level={4}>{data.Payload.Name}</TitleProduct>
        <Row gutter={[16, 16]}>
          <Col span={18}>
            <Row gutter={[16, 16]}>
              <Col span={10}>
                <Image
                  src={data.Payload.ProductVariants[0].Images[0].Url}
                  height={300}
                  width={"100%"}
                />
                <ListCartImage
                  grid={{
                    gutter: 10,
                  }}
                  dataSource={data.Payload.ProductVariants[0].Images}
                  renderItem={(item: any, index) => (
                    <ListItemImage key={index}>
                      <Card>
                        <Image
                          src={item.Thumbnail}
                          height={90}
                          width={90}
                        />
                      </Card>
                    </ListItemImage>
                  )}
                />
              </Col>
              <Col span={14}>
                <WrapperContentProduct>
                  <Space split={<Divider type="vertical" />}>
                    <Typography.Text>
                      Mã:{data.Payload.ProductVariants[0].SkuId}
                    </Typography.Text>
                    <Typography.Text>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        Đánh giá:
                        <RateProduct disabled defaultValue={2.5} />
                      </div>
                    </Typography.Text>
                    <Typography.Text>Bình luận: 5</Typography.Text>
                    <Typography.Text>Lượt xem: 1733</Typography.Text>
                  </Space>
                  <Typography.Text>Thông số sản phẩm</Typography.Text>
                  <StyledUl>
                    <Row>
                      <Col span={12}>
                        {data.Payload.ProductVariants[0].OptionValues.map(
                          (val: any, i: number) => {
                            if (i < 8) {
                              return (
                                <li>
                                  <b>{val.Name}:</b> {val.Value}
                                </li>
                              );
                            }
                          }
                        )}
                      </Col>
                      <Col span={12}>
                        {data.Payload.ProductVariants[0].OptionValues.map(
                          (val: any, i: number) => {
                            if (i > 8) {
                              return (
                                <li>
                                  <b>{val.Name}:</b> {val.Value}
                                </li>
                              );
                            }
                          }
                        )}
                      </Col>
                    </Row>
                  </StyledUl>
                  <StylePrice>
                    <StylePriceItem>
                      <Typography.Text className="price">
                        {data.Payload.ProductVariants[0].Price.toLocaleString(
                          "vi"
                        )}
                      </Typography.Text>
                      <Typography.Text className="del">
                        <del className="del">
                          {Number(21699000).toLocaleString("vi")}
                          <sup>đ</sup>
                        </del>
                      </Typography.Text>
                      <Typography.Text className="save_money">
                        Tiết kiệm 2.600.000₫
                      </Typography.Text>
                    </StylePriceItem>
                    <StylePriceItem>
                      <Typography.Text className="desc">
                        Giá đã có VAT
                      </Typography.Text>
                      <Typography.Text className="desc">
                        Bảo hành theo linh kiện
                      </Typography.Text>
                    </StylePriceItem>
                  </StylePrice>
                  <Typography.Text style={{ color: "red" }}>
                    Tặng thẻ Viettel 50.000đ tại FComputer Phố Trịnh Văn Bô
                    (THEK439) từ nay đến khi hết quà tặng
                  </Typography.Text>
                  <CardGift
                    title={
                      <div className="titleCart">
                        <GiftOutlined />
                        Quà tặng và ưu đãi kèm theo
                      </div>
                    }
                    bordered={true}
                  >
                    <span className="titleGifts">
                      ƯU ĐÃI KHI MUA KÈM PC GAMING TẠI HACOM
                    </span>
                    <StyledUl>
                      <li>
                        Giảm ngay <span className="color-red">100.000đ</span>{" "}
                        khi mua thêm Màn hình
                      </li>
                      <li>
                        Giảm ngay <span className="color-red">100.000đ</span>{" "}
                        khi mua thêm Màn hình
                      </li>
                      <li>
                        Giảm ngay <span className="color-red">100.000đ</span>{" "}
                        khi mua thêm Màn hình
                      </li>
                      <li>
                        Giảm ngay <span className="color-red">100.000đ</span>{" "}
                        khi mua thêm Màn hình
                      </li>
                      <li>
                        <span className="color-red">
                          GIAO HÀNG 2H – FComputer
                        </span>{" "}
                        (trừ ghế, bàn, màn chiếu). Chi tiết xem tại đây.
                      </li>
                      <li>
                        <span className="color-red">
                          HỌC SINH - SINH VIÊN GIẢM THÊM ĐẾN 200K{" "}
                        </span>{" "}
                      </li>
                    </StyledUl>
                  </CardGift>
                  <StyleQuantity>
                    <div>
                      <span className="text-bold">Số lượng:</span>
                      &nbsp;&nbsp;&nbsp;
                      <InputNumber
                        size="small"
                        min={1}
                        max={100000}
                        defaultValue={3}
                      />
                    </div>
                    <Button
                      className="text-bold"
                      size="small"
                      icon={<ShoppingCartOutlined className="text-bold" />}
                      style={{ width: 200 }}
                    >
                      Thêm vào giỏ hàng
                    </Button>
                  </StyleQuantity>

                  <ButtonWrapper>
                    <BtnOrderNow size="large" type="primary" danger>
                      ĐĂT MUA NGAY <br />
                      Giao hàng tận nơi nhanh chóng
                    </BtnOrderNow>
                    <Row gutter={[16, 16]}>
                      <Col span={12}>
                        <BtnOrderNow size="large" type="primary">
                          TRẢ GÓP QUA THẺ VISA, MASTER,... <br />
                          Chỉ từ 2.808.250₫/ tháng (12 tháng)
                        </BtnOrderNow>
                      </Col>
                      <Col span={12}>
                        <BtnOrderNow size="large" type="primary">
                          TRẢ GÓP QUA THẺ VISA, MASTER,... <br />
                          Chỉ từ 2.808.250₫/ tháng (12 tháng)
                        </BtnOrderNow>
                      </Col>
                    </Row>
                  </ButtonWrapper>
                </WrapperContentProduct>
              </Col>
            </Row>
          </Col>
          <Col span={6}>
            <WrapperRight>
              <CardGift title={"YÊN TÂM MUA HÀNG"} bordered={true}>
                <StyledUl>
                  <li>Uy tín 20 năm xây dựng và phát triển</li>
                  <li>Sản phẩm chính hãng 100%</li>
                  <li>Bảo hành tận nơi cho doanh nghiệp</li>
                  <li>GiảLaptop</li>
                  <li>Miễn phí quẹt thẻ</li>
                  <li>Vệ sinh miễn phí trọn đời PC,</li>
                </StyledUl>
              </CardGift>
              <CardGift title={"MIỄN PHÍ GIAO HÀNG"} bordered={true}>
                <StyledUl>
                  <li>Giao hàng 2h – HACOM Faster</li>
                  <li>Giao hàng miễn phí toàn quốc</li>
                  <li>Nhận hàng và thanh toán tại nhà (ship COD)</li>
                </StyledUl>
              </CardGift>
            </WrapperRight>
          </Col>
        </Row>
      </ProductDetailContent>

      {/* start new product */}
      <WrapperProductMain>
        <Row gutter={[20, 20]}>
          <Col span={6}>
            <WraperProduct>
              <div className="image">
                <Image
                  preview={false}
                  className="img"
                  src="https://hanoicomputercdn.com/media/product/250_67192_demo_pcgm523_v4.jpg"
                ></Image>
              </div>
              <div className="rate">
                <Rate allowHalf defaultValue={2.5} />
                <div>Mã: LTAC791</div>
              </div>
              <div className="name">
                {"Laptop Acer Gaming Nitro 5 Tiger AN515-58-52SP (NH.QFHSV.001) (i5 12500H/8GB Ram/512GB SSD/RTX3050 4G/15.6 inch FHD 144Hz/Win 11/Đen) (2022)"
                  .slice(0, 121)
                  .toUpperCase()}
              </div>
              <del className="del">82.000.000</del>
              <span className="sale">(Tiết kiệm: 12%)</span>
              <div className="price">23.199.000</div>
              <div className="rate">
                <div style={{ color: "#2cc067", fontSize: "13px" }}>
                  <CheckOutlined style={{ marginRight: "5px" }} />
                  Còn hàng
                </div>
                <ShoppingCartOutlined
                  className="svg"
                  style={{ fontSize: "16px" }}
                />
              </div>
              <div>
                <ButtonAddtoCartCustom>
                  Xem tất cả sản phẩm
                </ButtonAddtoCartCustom>
              </div>
            </WraperProduct>
          </Col>
          <Col span={6}>
            <WraperProduct>
              <div className="image">
                <Image
                  preview={false}
                  className="img"
                  src="https://hanoicomputercdn.com/media/product/250_67192_demo_pcgm523_v4.jpg"
                ></Image>
              </div>
              <div className="rate">
                <Rate allowHalf defaultValue={2.5} />
                <div>Mã: LTAC791</div>
              </div>
              <div className="name">
                {"Laptop Acer Gaming Nitro 5 Tiger AN515-58-52SP (NH.QFHSV.001) (i5 12500H/8GB Ram/512GB SSD/RTX3050 4G/15.6 inch FHD 144Hz/Win 11/Đen) (2022)"
                  .slice(0, 121)
                  .toUpperCase()}
              </div>
              <del className="del">82.000.000</del>
              <span className="sale">(Tiết kiệm: 12%)</span>
              <div className="price">23.199.000</div>
              <div className="rate">
                <div style={{ color: "#2cc067", fontSize: "13px" }}>
                  <CheckOutlined style={{ marginRight: "5px" }} />
                  Còn hàng
                </div>
                <ShoppingCartOutlined
                  className="svg"
                  style={{ fontSize: "16px" }}
                />
              </div>
              <div>
                <ButtonAddtoCartCustom>
                  Xem tất cả sản phẩm
                </ButtonAddtoCartCustom>
              </div>
            </WraperProduct>
          </Col>
          <Col span={6}>
            <WraperProduct>
              <div className="image">
                <Image
                  preview={false}
                  className="img"
                  src="https://hanoicomputercdn.com/media/product/250_67192_demo_pcgm523_v4.jpg"
                ></Image>
              </div>
              <div className="rate">
                <Rate allowHalf defaultValue={2.5} />
                <div>Mã: LTAC791</div>
              </div>
              <div className="name">
                {"Laptop Acer Gaming Nitro 5 Tiger AN515-58-52SP (NH.QFHSV.001) (i5 12500H/8GB Ram/512GB SSD/RTX3050 4G/15.6 inch FHD 144Hz/Win 11/Đen) (2022)"
                  .slice(0, 121)
                  .toUpperCase()}
              </div>
              <del className="del">82.000.000</del>
              <span className="sale">(Tiết kiệm: 12%)</span>
              <div className="price">23.199.000</div>
              <div className="rate">
                <div style={{ color: "#2cc067", fontSize: "13px" }}>
                  <CheckOutlined style={{ marginRight: "5px" }} />
                  Còn hàng
                </div>
                <ShoppingCartOutlined
                  className="svg"
                  style={{ fontSize: "16px" }}
                />
              </div>
              <div>
                <ButtonAddtoCartCustom>
                  Xem tất cả sản phẩm
                </ButtonAddtoCartCustom>
              </div>
            </WraperProduct>
          </Col>
          <Col span={6}>
            <WraperProduct>
              <div className="image">
                <Image
                  preview={false}
                  className="img"
                  src="https://hanoicomputercdn.com/media/product/250_67192_demo_pcgm523_v4.jpg"
                ></Image>
              </div>
              <div className="rate">
                <Rate allowHalf defaultValue={2.5} />
                <div>Mã: LTAC791</div>
              </div>
              <div className="name">
                {"Laptop Acer Gaming Nitro 5 Tiger AN515-58-52SP (NH.QFHSV.001) (i5 12500H/8GB Ram/512GB SSD/RTX3050 4G/15.6 inch FHD 144Hz/Win 11/Đen) (2022)"
                  .slice(0, 121)
                  .toUpperCase()}
              </div>
              <del className="del">82.000.000</del>
              <span className="sale">(Tiết kiệm: 12%)</span>
              <div className="price">23.199.000</div>
              <div className="rate">
                <div style={{ color: "#2cc067", fontSize: "13px" }}>
                  <CheckOutlined style={{ marginRight: "5px" }} />
                  Còn hàng
                </div>
                <ShoppingCartOutlined
                  className="svg"
                  style={{ fontSize: "16px" }}
                />
              </div>
              <div>
                <ButtonAddtoCartCustom>
                  Xem tất cả sản phẩm
                </ButtonAddtoCartCustom>
              </div>
            </WraperProduct>
          </Col>
        </Row>
      </WrapperProductMain>
    </ProductDetailWrapper>
  ) : (
    <></>
  );
};
