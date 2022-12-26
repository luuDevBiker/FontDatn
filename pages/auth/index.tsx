import AuthLayout from "../../components/layout/auth-layout/auth-layout";
import { Tabs } from 'antd';
import React from 'react';
import { useRouter } from 'next/router';

import Image from 'next/image';
import { Sign } from "crypto";
import { SignIn } from "./sign-in/sign-in";
const { TabPane } = Tabs;


const onChange = (key: string) => {

};
type Props = {};
const Auth = (props: Props) => {
  const router = useRouter();
  return (
    <SignIn/>
  );
};
Auth.Layout = AuthLayout;
export default Auth;
