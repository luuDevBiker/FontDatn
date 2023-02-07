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

  getOrderByProfileId(id : any) {
    return axiosClient({
      method: "get",
      url: `/msa-order/odata/Order(${id})/GetOrderByUser()`,
    });
  }

  confirmOrder(id:any,payload:any){
    return axiosClient({
      method: "post",
      url: `/msa-order/odata/Order(${id})/Confirm`,
      data: payload
    })
  }

  updateStatusOrder(id:any,payload:any){
    return axiosClient({
      method: "post",
      url: `/msa-order/odata/Order(${id})/UpdateStatus`,
      data: payload
    })
  }
  
  updateOrder(id:any,payload:any){
    return axiosClient({
      method: "put",
      url: `/msa-order/odata/Order(${id})`,
      data: payload
    })
  }
  
  deleteItemInOrder(key:any,id:any){
    return axiosClient({
      method: "post",
      url: `/msa-order/api/Order/${key}/DeleteItem/${id}`
    })
  }

}

export default new OrderApi();
