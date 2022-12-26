import React from 'react';
import { MenuGroupWrapper } from './MenuStyled';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
type MenuItem = Required<MenuProps>['items'][number];
import { useRouter } from 'next/router'

interface MenuGroupProps {
  items: MenuItem[];
}



const MenuGroup: React.FC<MenuGroupProps> = ({ items }: MenuGroupProps) => {
  const router = useRouter()
  const onClick: MenuProps['onClick'] = e => {
    router.push(e.key)
  };
  return (
    <MenuGroupWrapper>
        <Menu items={items} onClick={onClick} mode='inline' selectedKeys={[router.pathname]} />
    </MenuGroupWrapper>
  );
};

export default MenuGroup;
