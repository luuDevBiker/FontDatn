import { Button } from "antd";
import styled from "styled-components";


export const WrapperCMSProduct=styled.div`
    margin-top: 50px;
    width: 100%;
    height: auto;
    margin-left: 115px;
    margin-bottom: 100px;
`   


export const HeadingTitle=styled.div`
    margin-top: 15px;
    margin-bottom: 25px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    div{
        justify-content: center;
        align-items: center;
        display: flex;
    }
    h5 {
        font-size: 20px;
        color: ${({ theme }) => theme.colors.colorTitle};
    }
`
export const ButtonExport=styled(Button)`
    width: 104px;
    height: 40px;
    background: crimson;
    display: flex;
    align-items: center;
    float: right;
    color: #FFFFFF;
    img{
        padding-left: 4px;
        margin-right: 5px;

    }
`

export const WrapProduct=styled.div`
    background: #ffffff;
    box-shadow: 0px 3px 6px -4px rgba(0, 0, 0, 0.12), 0px 6px 16px rgba(0, 0, 0, 0.08), 0px 9px 28px 8px rgba(0, 0, 0, 0.05);
    margin-top: 24px;
    border-radius: 10px;
    width: 100%;
    padding: 22px;
    .title{
        margin-bottom: 5px;
        font-size: 19px;
        font-weight: 600;
    }
    .addnew{
        font-size: 15px;
        font-weight: 600;
        color: blue;
        cursor: pointer;
    }
    .generateCode{
        font-weight: 600;
        font-size: 17px;
        margin-top: 20px;
    }
    .type{
        /* padding-left: px; */
    }
`

export const BoxMedia=styled.div`

`
export const WrapperOptions=styled.div`
    padding: 15px;
    
`
export const OptionWrapp=styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    input{
        width: 100% !important;
    }
    .border{
        width: 95%;
    }
    svg{
        width: 15px;
        height: 15px;
    }
    .box{

    }
`