import { NextPageWithLayout } from "../../models/common";
import "antd/dist/antd.css";
import { ProductCategory } from "../product/product";

export const Home: NextPageWithLayout = (prop) => {
  return (
    <div>
      <ProductCategory />
    </div>
  );
};
