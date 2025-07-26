import { Badge, Dropdown, Input, Menu, Image } from "antd";
import React from "react";
import type { MenuProps } from "antd";
import { useRouter } from "next/router";
import { Select } from "antd";
import {
  HeaderWrapper,
  HeaderTitle,
  LogoWrapper,
  NotificationMenu,
  MenuAvatarWrapper,
  UserMenu,
  HeaderTop,
  HeaderItem,
  HeaderBottom,
  MenuItemTop,
  StyleSearch,
  ButtonSearch,
} from "../../../styles/HeaderStyled";
import {
  UserOutlined,
  BellOutlined,
  GlobalOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  PhoneOutlined,
  GiftOutlined,
  AliwangwangOutlined,
  ContainerOutlined,
} from "@ant-design/icons";
import Logo_Computer from "../../../assets/images/F-Computer.png";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { logout, selectUser } from "@/features/user-slice";

type MenuItem = Required<MenuProps>["items"][number];

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

const MainHeader: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loginInfo }: any = useAppSelector(selectUser);
  const count = localStorage.getItem("countItemInCart");
  const storage =
    typeof window !== "undefined" ? localStorage.getItem("u") : undefined;

  const handleAuth = () => {
    router.push("/auth");
  };

  const onHandleLoguot = () => {
    dispatch(logout())
      .unwrap()
      .then((res: any) => {
        router.push("/");
      });
  };

  //#region Custom Component
  const menu = (
    <Menu style={{ width: 200 }}>
      <Menu.Item
        style={{
          backgroundColor: "#fdd835",
          textAlign: "center",
          fontWeight: 600,
          margin: "5px 20px 10px",
        }}
        onClick={handleAuth}
      >
        Đăng nhập - Đăng ký
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
        onClick={() =>
          router.push({
            pathname: "/orders",
          })
        }
      >
        Đơn hàng của tôi
      </Menu.Item>
    </Menu>
  );
  //#endregion

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
              <Image  preview={false} src={Logo_Computer.src} alt="logo" width={150} />
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
                <Badge
                  count={count === "undefined" ? 0 : count}
                  size="small"
                  showZero
                >
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
    </React.Fragment>
  );
};

export default MainHeader;
