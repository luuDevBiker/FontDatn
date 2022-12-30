import { IAddProduct } from "@/models/product";
import { axiosClient } from "./axios-client";

class ProductApi {
  ///SignIn
  getListProduct() {
    return axiosClient({
      method: "get",
      url: "msa-product/odata/Products",
    });
  }
  addProduct(payload: IAddProduct) {
    return axiosClient({
      method: "post",
      url: "msa-product/odata/Products",
      data: payload,
    });
  }

  getProductDetails(key: string, id: string) {
    return axiosClient({
      method: "get",
      url: `msa-product/odata/Products(${key})/GetVariant(id=${id})`,
    });
  }
}

export default new ProductApi();
