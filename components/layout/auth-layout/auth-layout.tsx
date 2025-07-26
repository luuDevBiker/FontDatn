import { LayoutProps } from '../../../models/common';
import {
  CaretDownOutlined,
  DownCircleOutlined,
  GlobalOutlined,
} from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import {
  LanguageWrapper,
  LayoutAuthCenter,
  LayoutAuthFooter,
  LayoutAuthTop,
  LayoutWrapper,
  LogoAuth,
  LayoutAuthOrganization
} from './AuthLayoutStyled';
import Image from 'next/image';
import { Select } from 'antd';
const { Option } = Select;


const AuthLayout = ({ children }: LayoutProps) => {
  const onChangeInput = (value:string) =>{
  }
  const auth=false
  return (
    <LayoutWrapper>
      <LayoutAuthTop>
        <LanguageWrapper>
          <GlobalOutlined />
          <Select
            bordered={false}
            value={'VN'}
            suffixIcon={<CaretDownOutlined className='colorBlack'/>}
          >
                <Option >US</Option>
                <Option >VN</Option>
          </Select>
        </LanguageWrapper>
        {auth?<LogoAuth>
          <Image  src='' alt=''/>
          <div className='text_logo'>KPI</div>
        </LogoAuth>:null}
        {auth?<LayoutAuthCenter>{children}</LayoutAuthCenter>:<LayoutAuthOrganization>{children}</LayoutAuthOrganization>}
      </LayoutAuthTop>
    </LayoutWrapper>
  );
};

export default AuthLayout;
