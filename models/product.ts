import type { UploadFile } from "antd/es/upload/interface";

export interface IProduct {
  Id: String;
  Name: String;
  Description: String;
  Category: String;
  Brand: String;
  Options: [IOption];
  ProductVariants: [IVariant];
}
export interface IVariant {
  Id: String;
  ProductId: String;
  Price: Number;
  ImportPrice: Number;
  Images: [IImage];
  OptionValues:[IOptionValue]
}
export interface IOption {
  DisplayOrder: Number;
  Name: String;
}
export interface IImage {
  Uid:String;
  Name:String;
  Url: String;
  Status:String;
}
export interface IOptionValue {
    Id: String;
    OptionId: String;
    ProductVariantId: String;
    Name: String;
    Value: String;
    DisplayOrder: Number;
    IsDeleted: Boolean;
}