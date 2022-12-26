export interface IGetDeliveryByID{
    RecivedBillId:string
}

export interface IResponseRecivedBill{
    recivedBillDetailId:string,
    recivedBillId:string,
    productVariantId:string,
    productVariantIname:string,
    quantity:string,
    numberofRequest:string,
    exportQuantity:string,
    status:any,
    productVariant:string,
    recivedBill:string
}