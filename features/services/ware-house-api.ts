import { IGetDeliveryByID } from "@/models/warehouse";
import {axiosClient} from "./axios-client";

class WareHouseApi {
    ///SignIn
    getListProduct() {
        return axiosClient({
            method: 'get',
            url:'/api/RecivedBillAPI/get-all-RecivedBill',
        })
    }  
    getListDeliveryDetailById(payload:IGetDeliveryByID) {
        return axiosClient({
            method: 'get',
            url:`api/RecivedBillAPI/get-RecivedBillDetail/${payload.RecivedBillId}`,
            data: payload,
        })
    }  
}

export default new WareHouseApi();