import MainHeader from "@/components/common/header/header";
import { ButtonLogin } from "@/styles/HeaderStyled";
import { Footer } from "@/components/footer/footer";
import CountDownTimer from "@/components/landingpages/CountDownTimer";
import AuthLayout from "@/components/layout/auth-layout/auth-layout";
import { Confirm } from "@/components/popup-confirm/confirm";
import {
  BackgroundCarousel,
  BackgroundCarousel2,
  BoxLandingPage,
  SliderLandingPage,
  WrapperBox,
  WrapperDeal,
  WrapperNewProduct,
} from "@/styles/LandingPageStyled";
import { Carousel, Col, Layout, Rate, Row } from "antd";
import Image from "next/image";
import { useState } from "react";

export const LandingPage = () => {
  const [isConfirm, setIsConfirm] = useState<boolean>(true);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  return (
    <Layout>
      <MainHeader />
      <SliderLandingPage>
        <Carousel autoplay>
          <BackgroundCarousel></BackgroundCarousel>

          <BackgroundCarousel2></BackgroundCarousel2>
        </Carousel>
      </SliderLandingPage>
      <WrapperBox>
        <BoxLandingPage>
          <Row gutter={[20, 20]}>
            <Col span={8}>
              <div className="image_bg">
                <Image
                  src="https://cdn.shopify.com/s/files/1/1215/2782/files/leo_ziggypet_banner1-h1.png"
                  alt=""
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
            </Col>
            <Col span={8}>
              <Image
                src="https://cdn.shopify.com/s/files/1/1215/2782/files/leo_ziggypet_banner1-h1.png"
                alt=""
                style={{ width: "100%", height: "auto" }}
              />
            </Col>
            <Col span={8}>
              <Image
                src="https://cdn.shopify.com/s/files/1/1215/2782/files/leo_ziggypet_banner1-h1.png"
                alt=""
                style={{ width: "100%", height: "auto" }}
              />
            </Col>
            <Col span={12}>
              <Image
                src="https://cdn.shopify.com/s/files/1/1215/2782/files/leo_ziggypet_banner4-h1.png"
                alt=""
                loading="lazy"
                style={{ width: "100%", height: "auto" }}
              />
            </Col>
            <Col span={12}>
              <Image
                src="https://cdn.shopify.com/s/files/1/1215/2782/files/leo_ziggypet_banner4-h1.png"
                alt=""
                loading="lazy"
                style={{ width: "100%", height: "auto" }}
              />
            </Col>
          </Row>
        </BoxLandingPage>
        <div
          style={{
            fontWeight: "700",
            marginBottom: 0,
            textTransform: "capitalize",
            fontSize: "22px",
            color: "#1a2225",
          }}
        >
          <h2>Sản phẩm mới</h2>
        </div>
        <Row gutter={[20, 20]}>
          <Col span={12}>
            <WrapperNewProduct>
              <div className="left-product">
                <Image
                  src="	https://htmldemo.net/grano/grano/assets/images/deal/1.jpg"
                  alt=""
                />
              </div>
              <div className="right-product">
                <div className="reviews">
                  <Rate allowHalf defaultValue={4} />
                </div>
              </div>
            </WrapperNewProduct>
          </Col>
          <Col span={12}>
            <WrapperNewProduct>
              <div className="left-product">
                <Image
                  src="	https://htmldemo.net/grano/grano/assets/images/deal/1.jpg"
                  alt=""
                />
              </div>
              <div className="right-product">
                <div className="reviews">
                  <Rate allowHalf defaultValue={4} />
                </div>
              </div>
            </WrapperNewProduct>
          </Col>
        </Row>
        <Footer />
      </WrapperBox>

      <Confirm
        buttonRight={""}
        changeActive={(e: any) => setIsConfirm(e)}
        content={""}
        handleAction={() => {}}
        title={""}
        stateButton={false}
        wrapper={
          <WrapperDeal>
            <div className="deal">NGÀY HỘI GIẢM GIÁ</div>
            <div className="title">GIẢM GIÁ 15-30%</div>
            <div className="all">TẤT CẢ SẢN PHẨM</div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "30px",
              }}
            >
              <div style={{ width: "490px" }}>
                <CountDownTimer />
              </div>
            </div>
            <div>
              <ButtonLogin
                style={{
                  width: "200px",
                  fontFamily: "Quicksand, sans-serif",
                  fontSize: "16px",
                }}
                type="primary"
              >
                Nhắc tôi
              </ButtonLogin>
            </div>
          </WrapperDeal>
        }
        width={"700px"}
        openModalConfirm={isConfirm}
        buttonLeft=""
      />
    </Layout>
  );
};

LandingPage.Layout = AuthLayout;
export default LandingPage;
