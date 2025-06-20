import React, { useEffect } from "react";
import { Home } from "../../components/home/home";
import { MainLayoutHome } from "../../components/layout/main-layout/main-layout";
import { NextPageWithLayout } from "../../models/common";
import jwt_decode from "jwt-decode";
import { useRouter } from "next/router";
import { selectUser } from "@/features/user-slice";
import { useAppSelector } from "@/app/hooks";

const HomePages: NextPageWithLayout = () => {
  const router = useRouter();
  const { loginInfo } = useAppSelector(selectUser);
  useEffect(() => {
    if (loginInfo?.accessToken) {
      let tokeDecode: any = jwt_decode(loginInfo.accessToken);
      let role =
        tokeDecode[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ];
      if (role === "Users") {
        router.push("/");
      } else {
        router.push("/cms/cms-dashboard");
      }
    } else {
      router.push("/");
    }
  }, []);
  return (
    <React.Fragment>
      <Home />
    </React.Fragment>
  );
};

HomePages.Layout = MainLayoutHome;
export default HomePages;
