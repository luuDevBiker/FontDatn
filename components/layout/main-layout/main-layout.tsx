// import { useAppSelector } from '@/app/hooks';
import MainHeader from '../../common/header/header';

import { LayoutProps } from '../../../models/common';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import MainSidebar from './main-sidebar/main-sidebar';
import { MainLayOut, MainLayOutFooter, MainWrapper } from './MainLayoutStyled';
import { Footer } from '@/components/footer/footer';

export interface IMainLayout {}



export function MainLayoutHome({ children }: LayoutProps) {
  const router = useRouter();
//   const {isAuthentication,loginInfo} = useAppSelector(selectUser) 
//   useEffect(() => {
//     if(!isAuthentication) router.push('/landingpages')
//     },[router, isAuthentication,loginInfo])
  return (
    <React.StrictMode>
      <MainWrapper style={{ minHeight: '100vh' }}>
      <MainHeader />
      {/* <MainSidebar /> */}
      <MainWrapper className='site-layout' style={{ marginLeft:0   }}>
        <MainLayOut
        >
          {children}
        </MainLayOut>
        {/* <MainLayOutFooter>2021 All rights reserved by DpoTech</MainLayOutFooter> */}
        <Footer/>
      </MainWrapper>
    </MainWrapper>
    </React.StrictMode>
  );
}
