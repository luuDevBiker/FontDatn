import { Button } from "antd";
import styled from "styled-components";

export const LeftMenu=styled.div`
    border-radius: 5px;
    background: #fff;
    top: 43px;
    z-index: 99;
    border: 1px solid #e1e1e1;
    width: 100%;
    .wrapper{
        border-top: 1px solid #f2f2f2;
        padding: 5px;
    }
`

export const WrapperProductMain=styled.div`
    background-color: #fff;
    margin-top: 20px;
    padding: 20px 15px 0;
    margin-bottom: 10px;
`
export const WraperProduct=styled.div`
    padding: 10px 20px 30px 20px;
    .image{
        width: 100%;
        img{
            width: 100%;
        }
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .del{
        color: #666;
    font-size: 15px;
    text-decoration: line-through;
    overflow: hidden;
    }
    .sale{
        color: #d82a29;
        margin-left: 10px;
    }
    .name{
        font-weight: 600;
    }
    .price{
        font-size: 22px;
        font-weight: 700;
        color: #000;
        display: block;
    }
    .rate{
        display: flex;
        align-items: center;
        justify-content: space-between;
        .svg{
            svg{
                width: 28px;
                height: 28px;
            }
        }
    }

`

export const ButtonAddtoCartCustom=styled(Button)`
    text-align: center;
    margin-top: 10px;
    background: #243a76;
    border-radius: 8px;
    padding: 10px;
    width: 100%;
    color: white;
    height: 44px;
`


