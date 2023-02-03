import type { UploadFile } from "antd/es/upload/interface";

export interface IProduct {
  Id: string;
  Name: string;
  Description: string;
  Category: string;
  Brand: string;
  Options: [IOption];
  ProductVariants: [IVariant];
}
export interface IVariant {
  Id: string;
  ProductId: string;
  Price: number;
  ImportPrice: number;
  Images: [IImage];
  OptionValues: [IOptionValue];
}
export interface IOption {
  DisplayOrder: number;
  Name: string;
}
export interface IImage {
  Uid: string;
  Name: string;
  Url: string;
  Status: string;
}
export interface IOptionValue {
  Id: string;
  OptionId: string;
  ProductVariantId: string;
  Name: string;
  Value: string;
  DisplayOrder: number;
  IsDeleted: boolean;
}
export interface ICartItem {
  Id: string;
  Items: [IItemAdd];
}

export interface IItemAdd {
  ProductVariantId: string;
  Quantity: number
}
