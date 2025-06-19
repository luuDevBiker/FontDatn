import { Home } from "../components/home/home";
import { MainLayoutHome } from "../components/layout/main-layout/main-layout";
import { NextPageWithLayout } from "../models/common";

const HomePages: NextPageWithLayout = () => {
  return (
    <div>
      <Home />
    </div>
  );
};
HomePages.Layout = MainLayoutHome;
export default HomePages;
