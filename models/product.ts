import type { UploadFile } from "antd/es/upload/interface";

export interface IProduct {
  Id: string;
  Name: string;
  Description: string;
  Category: string;
  Brand: string;
  Options: [IOption];
  ProductVariants: IVariant[];
}

export interface IOptionState{
  options: IOption[],
  error: boolean,
  loadding: boolean
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

export interface ICategory{
  Name: string;
  Description: string | null;
  Type: number;
  Id: string;
  ConcurrencyTimestamp: string,
  CreatedTime: string,
  CreatedBy: string,
  ModifiedTime: string,
  ModifiedBy: string,
  IsDeleted: boolean,
  DeletedBy: string,
  DeletedTime: string,
}

export const CategoryTypeLabels: Record<number, string> = {
  0: "Loại Sản Phẩm",
  1: "Danh Mục",
  2: "Thương Hiệu",
};