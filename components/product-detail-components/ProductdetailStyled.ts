import styled from "styled-components";
import { Typography, List, Rate, Card, Button } from "antd";
const { Title } = Typography;
const { Item } = List;


export const ProductDetailWrapper = styled.div``;

export const ProductDetailContent = styled.div`
  border-radius: 3px;
  background-color: #fff;
  box-shadow: 0 0 4px 0 rgb(152 165 185 / 20%);
  padding: 10px;
  margin-top: 10px;
`;

export const TitleProduct = styled(Title)`
  border-bottom: 1px solid #e8e8e8;
  padding-bottom: 10px;
`;

export const ListCartImage = styled(List)`
  margin-top: 50px;
`;
export const ListItemImage = styled(Item)`
  justify-content: space-between;
  .ant-card-body {
    padding: 5px;
  }
`;

export const RateProduct = styled(Rate)`
  font-size: 14px;
  margin: 0 !important;
  li.ant-rate-star.ant-rate-star-full {
    margin: 0;
  }
  .ant-rate-star {
    margin: 0;
  }
`;

export const StyledUl = styled.ul`
  padding-left: 17px;
  margin: 10px 0 !important;

  li {
    line-height: 1.75;
    list-style: circle;
    float: left;
    width: 100%;
  }
`;

export const WrapperContentProduct = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
export const StylePrice = styled.div`
  padding: 5px 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  position: relative;
  border: 1px dashed #ddd;
  width: 100%;
`;
export const StylePriceItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-direction: row;
  gap: 10px;
  .price {
    color: #bf081f;
    font-size: 27px;
    font-weight: 700;
  }
  .del {
    color: #333e48;
    font-size: 16px;
    font-weight: 400;
    text-decoration: line-through;
  }
  .save_money {
    color: #bf081f;
    font-size: 14px;
    font-weight: 500;
    margin-left: 5px;
  }
  .desc {
    background: #f5f5f5;
    font-size: 12px;
    font-weight: 500;
    padding: 3px 5px;
    border-radius: 3px;
    margin-right: 10px;
  }
`;

export const CardGift = styled(Card)`
  padding: 0;
  margin-top: 20px;
  border-radius: 5px;
  position: relative;
  border: 1px solid #ddd;
  width: 100%;
  .titleCart {
    color: red;
  }
  .ant-card-head {
    padding: 0 10px;

    background: #f1f1f1;
  }
  .ant-card-body {
    padding: 10px;
    color: black;
  }
  .titleGifts {
    color: red;
    font-weight: bold;
    text-transform: uppercase;
  }
  .color-red {
    color: red;
    font-weight: bold;
  }
`;
export const StyleQuantity = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: flex-start;
  gap: 20px;
  .text-bold {
    font-weight: bold;
  }
`;

export const ButtonWrapper = styled.div`
  width: 100%;
  margin-top: 20px;
`;
export const BtnOrderNow = styled(Button)`
  width: 100%;
  height: 70px;
  border-radius: 5px;
  margin-bottom: 20px;
`;
export const WrapperRight = styled.div``