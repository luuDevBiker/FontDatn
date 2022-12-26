import styled, { keyframes } from "styled-components";
import { Button, Layout, Menu } from "antd";
const { Header } = Layout;
import {
  UserOutlined,
  BellOutlined,
  GlobalOutlined,
  GroupOutlined,
  SettingFilled,
  ReloadOutlined,
} from "@ant-design/icons";

const Gradient = keyframes`
   0%{background-position:0 0}
  100%{background-position:-200% 0}
`;
export const HeaderWrapper = styled(Header)`
  position: fixed;
  top: 0;
  right: 0;
  height: 120px;
  width: 100%;
  box-shadow: 0px 4px 25px rgba(61, 17, 189, 0.08);
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  padding: 0px 5px 0 0;
  z-index: 10;
  background-color: white;
  padding: 0px 20px !important;
`;

export const ButtonLogin = styled(Button)`
  width: 128px;
  height: 43px;
  background: #d87035;
  border-radius: 10px;
  font-family: "Jost";
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 29px;
  text-align: center;
  color: #ffffff;
  border: none;
`;
export const LogoWrapper = styled.div``;
export const HeaderTitle = styled.div`
  cursor: pointer;
  color: #000000;
`;

export const NotificationMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const MenuAvatarWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  .cssSVG {
    svg {
      width: 22px;
      height: 22px;
    }
  }
`;
export const MenuAvatarText = styled.div`
  padding: 0px;
  color: #000000;
  padding-right: 7px;
`;
export const BoxUserMenu = styled.div`
  width: 380px;
  height: auto;
  position: fixed;
  background: #ffffff;
  box-shadow: 0px 3px 6px -4px rgba(0, 0, 0, 0.12),
    0px 6px 16px rgba(0, 0, 0, 0.08), 0px 9px 28px 8px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  top: 58px;
  right: 12%;
  z-index: 100;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  color: #000000;
  font-size: 14px;
  .name {
    text-align: center;
    margin: 12px 0 12px 0;
  }
`;
export const MenuCustom = styled(Menu)`
  display: flex;
  flex-direction: inherit;
  align-items: center;
  width: auto;
  li {
    margin: 35px;
    color: #000000;
    font-family: "Jost";
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 29px;
    cursor: pointer;
    &:hover {
      color: blue;
    }
  }
`;

export const MenuHeader = styled(Menu)`
  width: 50%;
  li {
    margin: auto;
    color: #000000;
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 29px;
    color: #000000;
  }
`;

export const BoxUserMenuBussiness = styled.div`
  position: fixed;
  width: 380px;
  height: 300px;
  background: #ffffff;
  box-shadow: 0px 3px 6px -4px rgba(0, 0, 0, 0.12),
    0px 6px 16px rgba(0, 0, 0, 0.08), 0px 9px 28px 8px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  top: 58px;
  right: 12%;
  z-index: 100;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  color: #14142b;
  font-size: 14px;
  .name {
    text-align: center;
    margin: 12px 0 12px 0;
  }
`;
export const WrappBoxAvatar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 24px;
`;
export const ButtonInfomation = styled(Button)`
  width: 52.8%;
  height: 32px;
  background: #1890ff;
  border: 1px solid #1890ff;
  border-radius: 4px;
  color: #000000;
`;
export const ButtonLogOut = styled(Button)`
  width: 27.4%;
  height: 32px;
  background: #1890ff;
  border: 1px solid #1890ff;
  border-radius: 4px;
  color: #ffffff;
`;
export const BoxFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  div {
    padding: 24px;
  }
`;
export const WrappContentCompany = styled.div`
  width: 75%;
  height: 42px;
  display: flex;
  align-items: center;
  div {
    cursor: pointer;
    &:hover {
      color: #1890ff;
    }
  }
`;
export const WrapperCompany = styled.div`
  height: 42px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const BoxAvatar = styled.div`
  width: 100px;
  height: 100px;
  background-color: rebeccapurple;
  border-radius: 50%;
  overflow: hidden;
`;
export const GroupOutlinedCustom = styled(GroupOutlined)`
  width: 16px;
  height: 16px;
  margin-right: 10px;
`;
export const ReloadOutlinedCustom = styled(ReloadOutlined)`
  width: 16px;
  height: 16px;
  margin-right: 10px;
`;
export const IconSettingCustom = styled(SettingFilled)`
  color: #000000;
`;
export const UserMenu = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;
  cursor: pointer;
  color: ${(props) => props.theme.solidColor} !important;
  p {
    margin-bottom: 0;
    margin-right: 8px;
    color: ${(props) => props.theme.solidColor} !important;
  }
  .svg {
    color: ${(props) => props.theme.solidColor} !important;
  }
`;
export const AvatarWrapper = styled.div`
  width: 40px;
  height: 40px;
  overflow: hidden;
  border-radius: 50%;
  margin-right: 8px;
`;

export const MenuStyled = styled(Menu)`
  li.ant-dropdown-menu-item.ant-dropdown-menu-item-active.ant-dropdown-menu-item-only-child,
  .ant-dropdown-menu-item-selected,
  .ant-dropdown-menu-submenu-title-selected {
    background-color: ${({ theme }) => theme.colors.backgroundActive};
    color: ${({ theme }) => theme.colors.colorText};
  }
`;
export const HeaderTop = styled.div`
  display: flex;
  align-content: center;
  justify-content: space-between;
  width: 100%;
  border-bottom: 1px solid #ccc;
  height: 50px;
  padding: 0 180px 0;
  line-height: 50px;
`;
export const HeaderItem = styled.div`
  display: flex;
  align-content: center;
  gap: 20px;
  position: relative;
  // justify-content: space-between;
`;

export const MenuItemTop = styled.div`
  cursor: pointer;
`
export const MenuItemAnimate= styled.span`
    cursor: pointer;
    background: repeating-linear-gradient(to right,red 0,#00f 50%,red 100%);
    color: #fff;
    width: 100%;
    background-size: 200% auto;
    background-position: 0 100%;
    animation: 2s linear infinite forwards ${Gradient};
    padding: 5px 10px;
    border-radius: 9999px;
`
export const HeaderBottom = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 180px 0;
`;
export const StyleSearch = styled.div`
    display: flex;
    align-items: center;
    border: 1px solid #ed1b24;
    border-radius: 30px;
    min-width: 300px;
    width: 100%;
    max-width: 500px;
`
export  const ButtonSearch =  styled(Button)`
    background: #ed1b24;
    padding: 0 20px;
    font-size: 22px;
    cursor: pointer;
    border-radius: 0 99px 99px 0;
    border: none;
`