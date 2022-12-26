import styled from 'styled-components';

export const MenuGroupWrapper = styled.div`
  // margin-top: 25px;
  font-family: 'Open Sans', sans-serif;
  .ant-menu-vertical {
    border-right: 0px;
  }
  .ant-menu {
    font-size: 14px;
    color: red;
    background-color: ${({ theme }) => theme.colors.backgroundMain};
    border: none;
    svg {
      font-size: 14px;
      /* color: ${({ theme }) => theme.colors.text}; */
    }
    .ant-menu-item {
      padding: 0;
      border-radius: 4px;
      width:80%;
      margin-left:20.5px !important;
      img{
        position: relative;
      }
      span{
        position: relative;
        left: -15px;
      }
    }
    .ant-menu-title-content{
      flex: none !important;
    }
  }
  .ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected {
    background-color: #5d5fef;
    color: white; 
  }
  .ant-menu-inline .ant-menu-selected::after,
  .ant-menu-inline .ant-menu-item-selected::after {
    display: none;
  }
  .ant-menu-submenu-arrow {
    color: red;
  }
  .ant-menu-submenu-title {
    color: red;
  }
  li.ant-menu-item{
    margin-left: 0 !important;
  }
  li.ant-menu-submenu.ant-menu-submenu-inline{
    max-width: 176px;
    margin-left: 20px;
    div{
      padding-left: 10px !important;
    }
    ant-menu .ant-menu-sub .ant-menu-inline{
      padding-left: 0 !important;
    }
  }
`;

export const MenuItemWrapper = styled.div`
  display: flex;
  align-items: center;
`;
export const MenuIcon = styled.div`
  margin-right: 5px;
  svg {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.text};
  }
`;
export const MenuName = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
`;
