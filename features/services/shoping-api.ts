import { axiosClient } from "./axios-client";

class ShoppingApi {
  ///SignIn
  getListProduct() {
    return axiosClient({
      method: "get",
      url: "/api/Products",
    });
  }
}

export default new ShoppingApi();
