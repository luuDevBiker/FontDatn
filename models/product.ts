export interface IAddProduct{
    productId:string,
    productName:string,
    decription:string,
    categoryId:string,
    // creatAt:string,
    // modifiedAt:string,
    varian:[IVariant],
}
export interface IVariant{
    productVariantId:string,
    productId:string,
    productVariantName:string,
    barCode:string,
    quantity:string,
    sku:string,
    price:string,
    importPrice:string,
    createAt:string,
    modifiedAt:string,
    option:[IOption],

}
export interface IOption{
    optionsName:string,
    optionValue:string
}