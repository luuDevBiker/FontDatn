import React, { useState } from 'react';
import type { MenuProps } from 'antd';
import { MainSidebarTop, MainSidebarWrapper } from './MainSidebarStyled';
import MenuGroup from './custum-menu/menu-group';
import {
  menuPersonal,
  menuBusinessManagement,
  menuWareHouse
} from '../../../../utils/menujson';
import { useRouter } from 'next/router';

type MenuItem = Required<MenuProps>['items'][number];

interface IMainSidebarProps {}

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const MainSidebar = (props: IMainSidebarProps) => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const router = useRouter();
  
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

  const renderMenuBussiness = (item: any) => {
    return (
      item &&
      item.map((item: any) => {
        if (item.childrens && item.childrens.length > 0) {
          return getItem(item.label, item.path+`?id=${router.query.id}`, <item.icon />, [
            ...renderMenu(item.childrens),
          ]);
        } else {
          if (item.icon) {
            return getItem(item.label, item.path+`?id=${router.query.id}`, <item.icon />);
          } else {
            return getItem(item.label, item.path+`?id=${router.query.id}`, null);
          }
        }
      })
    );
  };

  return (
    <MainSidebarWrapper
      width={238}
      // collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <MainSidebarTop>
        <MenuGroup items={renderMenu(menuWareHouse)} />
      </MainSidebarTop>
    </MainSidebarWrapper>
  );


};
export default MainSidebar;

