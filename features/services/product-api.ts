import { IProduct } from "@/models/product";
import { axiosClient } from "./axios-client";

class ProductApi {
  ///SignIn
  getListProduct() {
    return axiosClient({
      method: "get",
      url: "msa-product/odata/Products",
    });
  }
  addProduct(payload: IProduct) {
    return axiosClient({
      method: "post",
      url: "msa-product/odata/Products",
      data: payload,
    });
  }
  updateProduct(id:any,payload: IProduct) {
    return axiosClient({
      method: "put",
      url: `/msa-product/odata/Products(${id})`,
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
