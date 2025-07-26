import { NextPageWithLayout } from "@/models/common";
import {
  ButtonExport,
  HeadingTitle,
  WrapperCMSProduct,
} from "@/styles/CmsProductStylead";
import Table, { ColumnsType } from "antd/lib/table";
import React, { useMemo, useState } from "react";
import { Button, Image } from "antd";
import ExportIcon from "@/assets/icon/ExportIcon.svg";

interface DataType {
  key: React.Key;
  image: string;
  product: string;
  countSale: Number;
  sumImPrice: Number;
  sumSalePrice: Number;
  profit: Number;
}
export const BestSeller: NextPageWithLayout = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);

  const start = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  const columns: ColumnsType<DataType> = useMemo(
    () => [
      {
        title: "Ảnh",
        dataIndex: "image",
        render: () => (
          <React.Fragment>
            <Image
              preview={false}
              src="https://thumbsnap.com/i/TMfukg2s.jpg"
              alt=""
              width={"35px"}
              height={"100%"}
            />
          </React.Fragment>
        ),
      },
      {
        title: "Sản phẩm",
        dataIndex: "product",
      },
      {
        title: "Số lượng đã bán",
        dataIndex: "countSale",
      },
      {
        title: "Tổng tiền nhập",
        dataIndex: "sumImPrice",
      },
      {
        title: "Doanh thu",
        dataIndex: "sumSalePrice",
      },
      {
        title: "Lợi nhuận",
        dataIndex: "profit",
      },
    ],
    []
  );

  const data: DataType[] = [];
  for (let i = 0; i < 46; i++) {
    data.push({
      key: i,
      image: `London, Park Lane no. ${i}`,
      product: `Máy tính bảng`,
      countSale: 100 + i * 12,
      sumImPrice: 100,
      sumSalePrice: 100,
      profit: 100,
    });
  }

  return (
    <div>
      <div>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
        />
      </div>
    </div>
  );
};
