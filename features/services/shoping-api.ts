import { axiosClient } from "./axios-client";

class ShoppingApi {
  getListProduct(id : any) {
    return axiosClient({
      method: "get",
      url: `/msa-cart/odata/Cart(${id})`,
    });
  }
  addItemToCard(key:any,payload:any){
    return axiosClient({
      method: "post",
      url: `/msa-cart/odata/Cart(${key})/AddItem`,
      data: payload
    })
  }

  deleteItemInCard(key:any,id:any){
    return axiosClient({
      method: "delete",
      url: `/msa-cart/api/Cart/${key}/RemoveItem/${id}`
    })
  }

  payment(key:any,paload:any){
    return axiosClient({
      method:"post",
      url:`/msa-cart/odata/Cart(${key})/Payment`,
      data: paload
    })
  }
}

export default new ShoppingApi();
