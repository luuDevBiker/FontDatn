import styled from 'styled-components';
import { Button, Input,Modal } from 'antd';


export const ModelWrapper=styled(Modal)`
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    width: 380px;
    border-radius: 10px;
    svg{
        color: #1890FF;
    }
    height: 202px;
    .ant-modal-title{
        color: #5D5FEF;
        
    }   
    .ant-modal-header{
        box-shadow: inset 0px -1px 0px rgba(93, 95, 239, 0.5);
    }
    .cssDatepicker{
        width: 100%;
    }
    .ant-modal-footer{
        align-items: center;
    }
    .ant-modal-footer{
        border-top: none;
    }
    .ant-modal-body{
        padding-bottom: 10px;
    }
    p{
        color: #FF4D4F;
        text-align: center;
        font-size: 18px;
        line-height: 22px;
        
    }
    .ant-modal-content{
        border-radius: 20px;
    }
    .wrappcontent{
        text-align: center;
        font-size: 18px;
        line-height: 22px;
        color: #14142B;
    }
`;

export const WrapperFooter=styled.div`
    align-items: center;
    text-align: center;
    /* padding-bottom: 15px; */
    
`
export const ButtonOk=styled(Button)`
    width: 104px;
    height: 32px;
    background: #1890FF;
    border: 1px solid #5D5FEF;
    border-radius: 4px;
    color: #FFFFFF;
    font-size: 14px;
    line-height: 22px;
`
export const BtnVetify=styled(Button)`
    width: 100%;
    background: #1890FF;
    border: 1px solid #5D5FEF;
    color: #FFFFFF;
    font-size: 14px;
    border-radius: 4px;
`
export const ButtonCancle=styled(Button)`
    width: 104px;
    height: 32px;
    background: #D9D9D9;
    border: 1px solid #D9D9D9;
    border-radius: 4px;
    color: #002766;
    font-size: 14px;
    line-height: 22px
`
