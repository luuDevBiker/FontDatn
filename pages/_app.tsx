import "../styles/globals.css";
import { Provider } from "react-redux";
import { store } from "../app/store";
import { AppPropsWithLayout } from "../models/common";
import { ThemeProvider } from "styled-components";
import "antd/dist/antd.css";
import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const StyledThemeProvider = (props: any) => {
    const resolvedTheme = {
      colors: "red",
      sidebarBackground: "#fff",
    };
    return <ThemeProvider theme={resolvedTheme} {...props} />;
  };
  const [showChild, setShowChild] = useState(false);
  const router = useRouter();

  const storage =
    typeof window !== "undefined" ? localStorage.getItem("u") : undefined;
  useEffect(() => {
    setShowChild(true);
    if (storage) {
      let user = JSON.parse(storage);
      let tokeDecode: any = jwt_decode(user.AccessToken);
      let role =
        tokeDecode[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ];
      if (role === "Users") {
        router.push("/");
      } else {
        router.push("/cms/cms-dashboard");
      }
    }
  }, []);

  if (!showChild) {
    return null;
  }
  const Layout = Component.Layout ?? Component;
  if (typeof window === "undefined") {
    return <></>;
  } else {
    return (
      <Provider store={store}>
        <StyledThemeProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </StyledThemeProvider>
      </Provider>
    );
  }
};

export default MyApp;
