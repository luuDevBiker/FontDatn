import {
  Avatar,
  Badge,
  Button,
  Dropdown,
  Form,
  Input,
  Menu,
  PageHeader,
  Switch,
} from "antd";
import React, { useEffect, useRef, useState } from "react";
import type { MenuProps } from "antd";
import { Router, useRouter } from "next/router";
import { Select } from "antd";
const { Option } = Select;
import {
  HeaderWrapper,
  HeaderTitle,
  LogoWrapper,
  NotificationMenu,
  MenuAvatarWrapper,
  UserMenu,
  MenuCustom,
  ButtonLogin,
  MenuHeader,
  HeaderTop,
  HeaderItem,
  HeaderBottom,
  MenuItemTop,
  StyleSearch,
  ButtonSearch,
  MenuItemAnimate,
} from "./HeaderStyled";
import {
  UserOutlined,
  BellOutlined,
  GlobalOutlined,
  CaretDownOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  PhoneOutlined,
  GiftOutlined,
  AliwangwangOutlined,
  ContainerOutlined,
  KeyOutlined,
} from "@ant-design/icons";
import { menuPersonal, menuWareHouse } from "../../../utils/menujson";
import { round } from "lodash";
interface IMainHeaderProps {}
type MenuItem = Required<MenuProps>["items"][number];
import Logo_Computer from "../../../assets/images/F-Computer.png";
import { Confirm } from "@/components/popup-confirm/confirm";
import { WrapperSigin } from "@/styles/AuthStyled";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { userSignIn, logout } from "@/features/user-slice";
import { selectUser } from "@/features/user-slice";
import jwt_decode from "jwt-decode";

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}
const renderMenu = (item: any) => {
  return (
    item &&
    item.map((item: any) => {
      if (item.childrens && item.childrens.length > 0) {
        return getItem(item.label, item.path, <item.icon />, [
          ...renderMenu(item.childrens),
        ]);
      } else {
        if (item.icon) {
          return getItem(item.label, item.path, <item.icon />);
        } else {
          return getItem(item.label, item.path, null);
        }
      }
    })
  );
};

const MainHeader: React.FC<IMainHeaderProps> = (props: IMainHeaderProps) => {
  const router = useRouter();
  const [isConfirm, setIsConfirm] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { loginInfo }: any = useAppSelector(selectUser);
  const handlerLogin = (Value: any) => {
    dispatch(userSignIn(Value))
      .unwrap()
      .then((res: any) => {
        var tokeDecode: any = jwt_decode(res.AccessToken);
        let role =
          tokeDecode[
            "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
          ];
        if (role === "Users") {
          router.push("/");
        } else {
          router.push("/cms/cms-dashboard");
        }
      });
  };

  const count = localStorage.getItem("countItemInCart");

  const handleOpenPopup = () => {
    setIsConfirm(true);
  };
  const onHandleLoguot = () => {
    dispatch(logout())
      .unwrap()
      .then((res: any) => {
        router.push("/");
      });
  };

  const storage =
    typeof window !== "undefined" ? localStorage.getItem("u") : undefined;
  const menu = (
    <Menu style={{ width: 200 }}>
      <Menu.Item
        style={{
          backgroundColor: "#fdd835",
          textAlign: "center",
          fontWeight: 600,
          margin: "5px 20px 10px",
        }}
        onClick={() => router.push("/auth/sign-up")}
      >
        Đăng ký
      </Menu.Item>
      <Menu.Item
        style={{
          backgroundColor: "#fdd835",
          textAlign: "center",
          fontWeight: 600,
          margin: "0px 20px 10px",
        }}
        onClick={handleOpenPopup}
      >
        Đăng nhập
      </Menu.Item>
    </Menu>
  );
  const userLogined = (
    <Menu style={{ width: 200 }}>
      <Menu.Item
        style={{
          backgroundColor: "#fdd835",
          textAlign: "center",
          fontWeight: 600,
          margin: "5px 20px 10px",
        }}
        onClick={onHandleLoguot}
      >
        Đăng xuất
      </Menu.Item>
      <Menu.Item
        style={{
          backgroundColor: "#fdd835",
          textAlign: "center",
          fontWeight: 600,
          margin: "5px 20px 10px",
        }}
        onClick={()=> router.push({
          pathname:"/orders"
        })}
      >
        Đơn hàng của tôi
      </Menu.Item>
    </Menu>
  );
  useEffect(() => {
    // if (storage) {
    //   let user = JSON.parse(storage);
    //   let tokeDecode: any = jwt_decode(user.AccessToken);
    //   let role =
    //     tokeDecode[
    //       "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
    //     ];
    //   if (role === "Users") {
    //     router.push("/");
    //   } else {
    //     router.push("/cms/cms-dashboard");
    //   }
    // }
  },[]);
  return (
    <React.Fragment>
      <HeaderWrapper className="site-layout-background" style={{ padding: 0 }}>
        <HeaderTop>
          <HeaderItem>
            <MenuItemTop>
              <PhoneOutlined /> +84 344 029 828
            </MenuItemTop>
          </HeaderItem>
          <HeaderItem>
            <MenuItemTop>
              <AliwangwangOutlined />
              Hỗ trợ
            </MenuItemTop>
            <MenuItemTop>
              <ContainerOutlined />
              Trung tâm dịch vụ
            </MenuItemTop>
            <MenuItemTop>
              <GiftOutlined />
              Khuyễn mại
            </MenuItemTop>
            {Object.keys(loginInfo).length > 0 ? (
              <Dropdown overlay={userLogined}>
                <div>
                  {" "}
                  <UserOutlined />
                  {`Xin chào: ${loginInfo.Profile?.DisplayName}`}
                </div>
              </Dropdown>
            ) : (
              <Dropdown overlay={menu}>
                <div>
                  {" "}
                  <UserOutlined />
                  Tài khoản
                </div>
              </Dropdown>
            )}
          </HeaderItem>
        </HeaderTop>
        <HeaderBottom>
          <LogoWrapper>
            <HeaderTitle onClick={() => router.push(`/`)}>
              <img src={Logo_Computer.src} alt="logo" width={150} />
            </HeaderTitle>
          </LogoWrapper>
          {/* start search */}
          <StyleSearch>
            <Input
              style={{
                border: "1px none none",
                borderRadius: "30px 0px 0px 30px",
              }}
              bordered={false}
              placeholder={"Nhập tên sản phẩm, từ khóa cần tìm kiếm"}
            />
            <ButtonSearch type="primary" danger>
              <SearchOutlined />
            </ButtonSearch>
          </StyleSearch>
          {/* end search */}
          <NotificationMenu>
            <BellOutlined
              style={{ color: "#fff", height: "15.71px", width: "12px" }}
            />
            <MenuAvatarWrapper>
              <UserMenu>
                <Badge count={count === "undefined"?0:count} size="small" showZero>
                  <ShoppingCartOutlined
                    onClick={() => router.push("/shopping-cart")}
                    className="cssSVG"
                    style={{ marginLeft: "10px" }}
                    width="10px"
                  />
                </Badge>
              </UserMenu>
            </MenuAvatarWrapper>

            <GlobalOutlined style={{ color: "#FFFFFF", marginRight: "-8px" }} />

            {/* <ButtonLogin style={{marginLeft:'15px'}}>Đăng ký</ButtonLogin> */}
          </NotificationMenu>
        </HeaderBottom>
      </HeaderWrapper>
      <Confirm
        buttonLeft={""}
        buttonRight={""}
        changeActive={(e: any) => setIsConfirm(e)}
        content={""}
        handleAction={() => {}}
        title={""}
        stateButton={false}
        wrapper={
          <WrapperSigin>
            <div className="limiter">
              <div className="container-login100">
                <div className="wrap-login100">
                  <div className="login100-pic js-tilt" data-tilt>
                    <img
                      src="https://colorlib.com/etc/lf/Login_v1/images/img-01.png"
                      alt="IMG"
                    />
                  </div>

                  <div className="login100-form validate-form">
                    <span className="login100-form-title">Đăng nhập</span>
                    <Form onFinish={handlerLogin}>
                      <Form.Item name={"userName"}>
                        <Input
                          prefix={<UserOutlined />}
                          className="inputAuth"
                          placeholder="Tên tài khoản"
                        />
                      </Form.Item>
                      <Form.Item name={"password"}>
                        <Input
                          prefix={<KeyOutlined color="red" />}
                          className="inputAuth"
                          placeholder="Mật khẩu"
                        />
                      </Form.Item>
                      <div className="container-login100-form-btn">
                        <button className="login100-form-btn" type="submit">
                          Login
                        </button>
                      </div>
                    </Form>

                    <div className="textForgot">
                      <span className="txt1">Forgot Username</span>
                      <a className="txt2" href="#">
                        / Password?
                      </a>
                    </div>

                    <div className="createacc">
                      <a className="txt2" href="#">
                        Create your Account
                        <i
                          className="fa fa-long-arrow-right m-l-5"
                          aria-hidden="true"
                        ></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </WrapperSigin>
        }
        width={"1000px"}
        openModalConfirm={isConfirm}
      />
    </React.Fragment>
  );
};

export default MainHeader;
