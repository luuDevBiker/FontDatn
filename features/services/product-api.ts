import { IAddProduct } from "@/models/product";
import { axiosClient } from "./axios-client";

class ProductApi {
  ///SignIn
  getListProduct() {
    return axiosClient({
      method: "get",
      url: "msa-product/api/Products",
    });
  }
  addProduct(payload: IAddProduct) {
    return axiosClient({
      method: "post",
      url: "/api/ProductDetails/Buss/pro",
      data: payload,
    });
  }

  getProductDetails(id: string) {
    return axiosClient({
      method: "get",
      url: `msa-product/odata/Products(${id})`,
    });
  }
}

export default new ProductApi();
