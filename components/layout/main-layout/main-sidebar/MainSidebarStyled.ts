import styled from 'styled-components';
import {  Layout, Dropdown } from 'antd';
const {  Sider } = Layout;


export const MainSidebarWrapper = styled(Sider)`
    background: ${({ theme }) => theme.sidebarBackground};
    box-shadow: 0px 3px 5px 2px #ccc;
    // box-shadow: 3px 3px 5px 6px #ccc;
    position: fixed;
    // border-right:1px solid #77A0D0; 
    left: 0;
        top: 48px;
        bottom: 0;
        overflow: auto;
        height: 100vh;
    .ant-layout-sider-children {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        background-color:${({ theme }) => theme.colors.backgroundMain};
    }
    margin-top: 50px;
`

export const MainSidebarTop = styled.div`
    padding:0px;

`
export const MainSidebarBottom = styled.div`
    display: flex;
    align-items: center;
    border-top: 1px solid #77A0D0;
    padding: 10px 15px 7px;
    .text_avatar{
        margin-left:20px;
        font-size:18px;
    }
`
export const LogoWrapper = styled.div`
    width:100%;
    margin-bottom: 20px;
`

export const DropdownWrapper = styled(Dropdown)`
    width:100%;
    // border: 1px solid #fff;
`

export const DropdownItem = styled.div`
    display:flex;
    align-items: center;
    
`

export const DropdownIcon = styled.div`
    width: 30px;
`

export const DropdownTextWrapp = styled.div`
    // p {
    //     line-height: 5px;
    // }
    .title {
        color:#000;
        font-weight: 700;
    }
`

export const DropdownViewAction = styled.div`
    display:flex;
    align-items: center;

`

export const IconDownWrapper = styled.div`
    display:flex;
    width:20px;
    margin-left:auto;
`
// export const DashboardItem =styled.div`
//     display:flex;
// `