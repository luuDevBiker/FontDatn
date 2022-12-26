import React from "react";
import { Col, Rate, Row } from "antd";
import { NextPageWithLayout } from "../../models/common";
import { AddtoCart, BoxDecription, WrapperProduct, WrapperProductLeft, WrapperProductRight, WrapperSlider } from "../../styles/HomeStyled";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

const colStyles = {
    flexBasis: "20%",
    width: "20%"
  };

export const ProductDetail:NextPageWithLayout=(prop)=>{

    return(
        <React.Fragment>
            <WrapperProduct>
                <Row >
                    <Col xs={24} sm={24} md={24} xxl={11} xl={11}>
                        <WrapperProductLeft data-wow-delay="0.7s">
                            <Carousel autoPlay >
                                        <div>
                                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsyz5moQV9LR5P7gEmg51wUe2iq35A0GcbCw&usqp=CAU"></img>
                                        </div>
                                        <div>
                                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9G cRsyz5moQV9LR5P7gEmg51wUe2iq35A0GcbCw&usqp=CAU"></img>
                                        </div>
                                        <div>
                                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsyz5moQV9LR5P7gEmg51wUe2iq35A0GcbCw&usqp=CAU"></img>
                                        </div>
                                        <div>
                                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsyz5moQV9LR5P7gEmg51wUe2iq35A0GcbCw&usqp=CAU"></img>
                                        </div>
                                        <div>
                                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsyz5moQV9LR5P7gEmg51wUe2iq35A0GcbCw&usqp=CAU"></img>
                                        </div>
                                    </Carousel>
                        </WrapperProductLeft>
                    </Col>
                    <Col xs={24} sm={24} md={24} xxl={13} xl={13}>
                        <WrapperProductRight>
                            <div className="nameProduct">Chopped Gound Dinner</div>
                            <div>
                                <Rate allowHalf defaultValue={4} />
                            </div>
                            <div className="priceProduct">
                                400.000đ <span className="pricemin"><del>300.000đ</del></span>
                            </div>
                            
                            <div className="decription">Sản phẩm được làm từ hạt nguyên cám  Sản phẩm được làm từ hạt nguyên cám nguyên chất Sản phẩm được làm từ hạt nguyên cám nguyên chất Sản phẩm được làm từ hạt nguyên cám nguyên chất Sản phẩm được lnguyên chất</div>
                            <div className="decription">
                                Trạng thái: <span>Còn hàng</span>
                            </div >
                            <div className="decription">
                                Số lương : <span>6</span>
                            </div>
                            <AddtoCart>
                                Thêm vào giỏ hàng
                            </AddtoCart>
                        </WrapperProductRight>
                    </Col>
                </Row>
                
            </WrapperProduct>
        </React.Fragment>
    )
}

