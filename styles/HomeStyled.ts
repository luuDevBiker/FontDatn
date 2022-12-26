import styled from "styled-components";
import { Button, Modal } from "antd";
import { Footer } from "antd/lib/layout/layout";

export const BoxProduct = styled.div`
  width: 100%;
  height: 410px;
  background-color: #ffffff;
  border-radius: 10px;
  position: relative;
  /* border: 1px solid #B7A7A7; */
  transition: 0.5s all ease-in-out;
  &:hover {
    transform: scale(1.08);
    border: 1px solid black;
  }
  img {
    border-radius: 10px 10px 0 0px;
    padding: 10px;
    z-index: 10;
  }
`;
export const BoxProductHeader = styled.div`
  height: 60%;
  width: 100%;
  border: 1px dashed #b7a7a7;
`;
export const BoxProductBody = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: auto;
  margin-top: 15px;
`;

export const Box = styled.div`
  width: 25%;
`;
export const BoxDecription = styled.div`
  margin-top: 30px;
`;

export const BoxNameProduct = styled.div`
  a {
    font-family: Montserrat, sans-serif;
    font-weight: 500;
    color: #f9575c;
    transition: all 0.3s ease-in-out 0s;
    font-size: 20px;
  }
  width: 80%;
  align-items: center;
  text-align: center;
  height: auto;
`;
export const BoxPrice = styled.div`
  span {
    color: red;
    font-size: 16px;
  }
`;

export const ButtonAddtoCart = styled.div`
  width: 100%;
  background-color: #d87035;
  height: 50px;
  display: flex;
  color: #ffffff;
  align-items: center;
  justify-content: center;
  position: relative;
  font-style: normal;
  font-weight: 500;
  top: -15px;
  cursor: pointer;
  transition-property: all;
  transition-duration: 2s;
  -o-transition-timing-function: ease-in-out;
  &:hover {
    background-color: beige;
    color: black;
  }
`;
export const BoxViewer = styled.div`
  z-index: 11;
  height: 100px;
  display: flex;
  flex-direction: column;
  text-align: center;
  position: absolute;
  right: 0;
  margin-right: 20px;
  margin-top: 10px;
`;
export const Boxheart = styled.div`
  background-color: antiquewhite;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: red;
`;
export const BoxView = styled.div`
  margin-top: 6px;
  background-color: antiquewhite;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: blue;
`;

export const BoxSlider = styled.div``;
export const WrapperImage = styled.div`
  position: relative;
`;
export const BoxContent = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
`;

export const ModalCutom = styled(Modal)``;
export const Wrapper = styled.div``;

export const WrapperProduct = styled.div`
  font-family: "Roboto", sans-serif;
  background-color: #fff;
  margin-top: 60px;
  height: auto;
  min-height: 500px;
  /* font-family: 'Raleway,sans-serif'; */
`;
export const WrapperProductLeft = styled.div`
  .imageProduct {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: center;
    img {
      width: 80%;
      height: 350px;
      margin: 15px;
    }
  }
  .lstProduct {
    margin: 10px;
  }
`;
export const WrapperProductRight = styled.div`
  margin: 10px 10px 0 30px;
  .nameProduct {
    /* font-size: 30px; */
    font-weight: 600;
    color: #1a2225;
    font-size: 28px;
    text-transform: capitalize;
  }
  .priceProduct {
    span {
      font-size: 20px;
      color: black;
    }
    /* font-size: 25px; */
    /* font-weight: 800; */
    /* font-family: 'Raleway,sans-serif';    */
    color: #45ab49;
    font-size: 28px;
    font-weight: 700;
    line-height: 1.0714;
    margin-top: 5px;
    .pricemin {
      font-weight: 400;
      line-height: 20px;
      color: #9b9b9b;
      font-size: 22px;
      text-decoration: line-through;
    }
  }
  .decription {
    font-size: 16px;
    margin-right: 20px;
    margin-top: 10px;
    color: black;
    span {
      color: red;
    }
  }
  .status {
    font-size: 16px;
  }
`;
export const WrapperSlider = styled.div`
  width: 100%;
  height: 50px;
  img {
    width: 100%;
    height: 70px;
  }
`;

export const AddtoCart = styled(Button)`
  height: 46px;
  width: 160px;
  font-size: 14px;
  font-weight: 600;
  background-color: #1890ff;
  color: white;
  border-radius: 4px;
  margin-top: 10px;
`;

export const WrapperPopupHeader = styled.div`
  .image {
    height: "50px";
  }
  .price {
    position: absolute;
    left: 0;
    bottom: 0;
    margin-left: 20px;
  }
`;

export const WrapperPopupBody = styled.div`
  .coloring {
    width: 100%;
    height: 40px;
    background-color: #f7f7f7;
    border-radius: 5px;
    .flexColoring {
      display: flex;
      align-items: center;
      /* justify-content: space-between; */
      img {
        width: 100%;
      }
    }
    .text {
      margin-left: 10px;
      font-weight: 500;
      font-size: 16px;
    }
  }
  .size {
    width: 45px;
    height: 45px;
    background-color: #f7f7f7;
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
    font-size: 16px;
    margin-right: 20px;
    cursor: pointer;
  }
  .border {
    display: flex;
    align-items: center;
  }
  .quantitys {
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    input {
      width: 80px;
    }
  }
  .center {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .title {
    margin: 5px;
    font-size: 17px;
  }
`;

export const ButtonAddtoCart2 = styled(Button)`
  width: 50%;
  background-color: #d87035;
  height: 50px;
  color: #ffffff;
  font-weight: 700;
  font-size: 17px;
  font-style: normal;
  font-weight: 500;
  border-radius: 8px;
  top: -15px;
  margin-top: 30px;
  cursor: pointer;
  transition-property: all;
  /* transition-duration: 2s; */
  -o-transition-timing-function: ease-in-out;
  &:hover {
    background-color: beige;
    color: black;
  }
`;

export const FooterCustom = styled(Footer)`
  color: white;
  margin-top: 50px;
  padding: 0;
  width: 100%;
   background-color: #202c43;
  .footer {
    color: white;
    font-size: 16px;
    margin-top: 40px;
   
    padding: 10px 200px;
  }

  .footer .btn.btn-link {
    display: block;
    margin-bottom: 5px;
    padding: 0;
    text-align: left;
    color: #b0b9ae;
    font-weight: normal;
    text-transform: capitalize;
    transition: 0.3s;
  }

  .footer .btn.btn-link::before {
    position: relative;
    content: "\f105";
    font-family: "Font Awesome 5 Free";
    font-weight: 900;
    margin-right: 10px;
  }

  .footer .btn.btn-link:hover {
    color: #f7f7f7;
    letter-spacing: 1px;
    box-shadow: none;
  }
`;

export const FooterItem = styled.div`
display: flex;
`;

