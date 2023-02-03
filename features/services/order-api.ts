import { axiosClient } from "./axios-client";

class OrderApi {
  getOrderById(id : any) {
    return axiosClient({
      method: "get",
      url: `/msa-order/odata/Order(${id})`,
    });
  }

  getOrders() {
    return axiosClient({
      method: "get",
      url: `/msa-order/odata/Order`,
    });
  }


}

export default new OrderApi();
