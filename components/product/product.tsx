import { Col, Rate, Row, Carousel, Space, Button, message, Image } from "antd";
import { useEffect } from "react";
import { NextPageWithLayout } from "../../models/common";
import "antd/dist/antd.css";
import {
  CheckOutlined,
  LaptopOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { ListCarousel } from "@/utils/data";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
  getListProduct,
  getCategories,
  selectProduct,
} from "@/features/product-slice";
import { ICategory } from "@/models/product";
import { addTocart } from "@/features/shopping-slice";
import {
  ButtonAddtoCartCustom,
  LeftMenu,
  WraperProduct,
  WraperProductContainer,
  WrapperProductMain,
} from "@/styles/ProductWrapperStyled";
import { useRouter } from "next/router";
import { selectUser } from "@/features/user-slice";

export const ProductCategory: NextPageWithLayout = (prop) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loginInfo }: any = useAppSelector(selectUser);
  const { categories, products }: any = useAppSelector(selectProduct);
  useEffect(() => {
    if (products.length === 0) {
      dispatch(getListProduct());
    }
    if (categories.length === 0) {
      dispatch(getCategories());
    }
  }, [dispatch, products, categories]);

  const addCartItem = (id: any) => {
    let dataAdd: any = {
      Id: loginInfo.CartId,
      Items: {
        ProductVariantId: id,
        Quantity: 1,
      },
    };

    if (!loginInfo) {
      message.warning({
        content: "Bạn chưa đăng nhập",
        duration: 3,
        style: {
          marginTop: "3vh",
          float: "right",
        },
      });
      return;
    }

    dispatch(addTocart(dataAdd))
      .unwrap()
      .then()
      .then((res: any) => {
        if (res?.status === 200) {
          message.success({
            content: "Thêm sản phẩm thành công vào giỏ hàng!",
            duration: 3,
            style: {
              marginTop: "6vh",
              float: "right",
            },
          });
        }
      })
      .catch((err: any) => {
        message.error({
          content: "Xảy ra lỗi khi thêm sản phẩm! " + err.message,
          duration: 3,
          style: {
            marginTop: "6vh",
            float: "right",
          },
        });
      });
  };

  if (products.length === 0 || categories.length === 0) {
    return <></>;
  }

  return (
    <WraperProductContainer>
      <Row gutter={10}>
        {/* left menu */}
        <Col span={4}>
          <LeftMenu>
            {categories.map((item: ICategory, index: number) =>
              item.Type === 1 ? (
                <div className="wrapper" key={index}>
                  <Space>
                    <LaptopOutlined />
                    <div>{item.Name}</div>
                  </Space>
                </div>
              ) : (
                <></>
              )
            )}
          </LeftMenu>
        </Col>
        {/* Slide show */}
        <Col span={14}>
          <Carousel effect="fade" autoplay>
            {ListCarousel.map((item, index) => (
              <div key={index}>
                <Image alt="" preview={false} src={item.image} />
              </div>
            ))}
          </Carousel>
          <Row gutter={10}>
            <Col span={12}>
              <Image
                alt=""
                preview={false}
                src="https://hanoicomputercdn.com/media/banner/16_Mayfb5c81ed3a220004b71069645f112867.png"
              ></Image>
            </Col>
            <Col span={12}>
              <Image
                alt=""
                preview={false}
                src="https://hanoicomputercdn.com/media/banner/16_May10fb15c77258a991b0028080a64fb42d.png"
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
                  alt=""
                  preview={false}
                  src="https://hanoicomputercdn.com/media/banner/16_May98f8b00aeace4ca57d90782bb4226f86.png"
                  height={"200px"}
                ></Image>
              </div>
            </Col>
            <Col span={24}>
              <div>
                <Image
                  alt=""
                  preview={false}
                  src="https://hanoicomputercdn.com/media/banner/16_May09dd8c2662b96ce14928333f055c5580.png"
                  height={"200px"}
                ></Image>
              </div>
            </Col>
            <Col span={24}>
              <div>
                <Image
                  alt=""
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
          {products &&
            products.map((item: any, index: number) => {
              return item.ProductVariants.map((variant: any, index: number) => (
                <Col span={6} key={item.SkuId || index}>
                  <WraperProduct>
                    <div className="image">
                      <Image
                        alt=""
                        preview={false}
                        className="img"
                        src={variant.Images[0]?.Url}
                        width={270}
                        height={320}
                      ></Image>
                    </div>
                    <div className="rate">
                      <Rate allowHalf disabled value={variant.Rate} />
                      <div>{variant.SkuId}</div>
                    </div>
                    <div className="name">
                      {item.Name.slice(0, 121).toUpperCase()}
                    </div>
                    <del className="del">
                      {variant.Price.toLocaleString("vi")}
                      <sup>đ</sup>
                    </del>
                    {variant.Sale > 0 ? (
                      <span className="sale">
                        &#10088;Tiết kiệm: {variant.Sale ? variant.Sale : 5}
                        %&#10089;
                      </span>
                    ) : (
                      <></>
                    )}
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
                      <Button
                        disabled={variant.Quantity <= 0}
                        onClick={() => addCartItem(variant.Id)}
                      >
                        <ShoppingCartOutlined
                          className="svg"
                          style={{ fontSize: "16px" }}
                        />
                      </Button>
                    </div>
                    <ButtonAddtoCartCustom
                      onClick={() => {
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
    </WraperProductContainer>
  );
};
