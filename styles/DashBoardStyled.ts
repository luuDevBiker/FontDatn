import { Breadcrumb } from "antd";
import styled from "styled-components";


export const WrapperHeader=styled.div`
  
`
export const BreadcrumbStyle = styled(Breadcrumb)`
  .breadcrumb-item {
    color: ${({ theme }) => theme.colors.colorTitle};
    font-weight: 500;
  }
`;

export const BoxFirst=styled.div`
  margin-top: 30px;
`
export const WrapperBox=styled.div`
  background: linear-gradient( 45deg , #6a11cb , #2575fc);
  box-shadow: 0px 3px 6px -4px rgba(0, 0, 0, 0.12), 0px 6px 16px rgba(0, 0, 0, 0.08), 0px 9px 28px 8px rgba(0, 0, 0, 0.05);
  border-radius: 15px;
`
export const WrapperBox1=styled.div`
  background: linear-gradient( 45deg , #00b09b, #96c93d);
  box-shadow: 0px 3px 6px -4px rgba(0, 0, 0, 0.12), 0px 6px 16px rgba(0, 0, 0, 0.08), 0px 9px 28px 8px rgba(0, 0, 0, 0.05);
  border-radius: 15px;
`
export const WrapperBox2=styled.div`
  background: linear-gradient( 45deg , #ee0979, #ff6a00)!important;
  box-shadow: 0px 3px 6px -4px rgba(0, 0, 0, 0.12), 0px 6px 16px rgba(0, 0, 0, 0.08), 0px 9px 28px 8px rgba(0, 0, 0, 0.05);
  border-radius: 15px;
`
export const WrapperBox3=styled.div`
  background: linear-gradient(to right, #0f2027, #203a43, #2c5364);
  box-shadow: 0px 3px 6px -4px rgba(0, 0, 0, 0.12), 0px 6px 16px rgba(0, 0, 0, 0.08), 0px 9px 28px 8px rgba(0, 0, 0, 0.05);
  border-radius: 15px;
`
export const BoxHead=styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-family: 'Roboto, sans-serif';
    color: white;
    font-size: 20px;
    padding: 15px;
`
export const BoxBody=styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-family: 'Roboto, sans-serif';
    color: white;
    font-size: 20px;
    padding: 0 15px 15px 15px;
`
export const BoxSecond=styled.div`

`


export const Box=styled.div`
    background: #ffffff;
    box-shadow: 0px 3px 6px -4px rgba(0, 0, 0, 0.12), 0px 6px 16px rgba(0, 0, 0, 0.08), 0px 9px 28px 8px rgba(0, 0, 0, 0.05);
    margin-top: 24px;
    border-radius: 4px;
    
`
export const BoxHeader=styled.div`
    height: 54px;
    box-shadow: inset 0px -1px 0px rgba(93, 95, 239, 0.5);
    display: flex;
    align-items: center;
    padding:0px 24px 0 15px;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 22px;
    color: #5D5FEF;
    display: flex;
    align-items: center;
    justify-content: space-between;
`
export const BoxBodyder=styled.div`
    padding: 15px 14px 10px;
    .text-color{
        color: rgba(0, 0, 0, 0.85);
    }
    .ant-input-prefix {
    margin-right: 0;
    }

    .title-small{
    position: absolute;
    right: 21px;
    color: red;
  }
  .title-great{
    position: absolute;
    right: -8px;
    color: red;
    width: 70%;
    top: -15px;
    z-index: 99;
    }
`
export const ContenRight=styled.div`
    color: #F5222D;
`