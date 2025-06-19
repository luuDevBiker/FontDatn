import { Select } from "antd";
import React from "react";

const BrandCategories = () => {
  const { Option } = Select;
  return (
    <Select>
      <Option value={0}>Loại Sản Phẩm</Option>
      <Option value={1}>Danh Mục</Option>
      <Option value={2}>Thương Hiệu</Option>
    </Select>
  );
};
export default BrandCategories;