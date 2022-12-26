import '../styles/globals.css';
import { Provider } from 'react-redux';
import { store } from '../app/store'; 
import { AppPropsWithLayout } from '../models/common';
import { ThemeProvider } from 'styled-components';
import "antd/dist/antd.css";

// import { light } from '@/components/theme';
import { useEffect, useState } from 'react';

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const StyledThemeProvider = (props: any) => {
    const resolvedTheme = {
      colors: 'red',
    sidebarBackground: "#fff",
    };
    return <ThemeProvider theme={resolvedTheme} {...props} />;
  };
  const [showChild, setShowChild] = useState(false);
  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    return null;
  }
  const Layout = Component.Layout ?? Component;
  if (typeof window === 'undefined') {
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

// export default appWithTranslation(MyApp);
export default MyApp;