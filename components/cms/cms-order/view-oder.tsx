import { NextPageWithLayout } from "@/models/common";
import {
  ButtonExport,
  HeadingTitle,
  WrapperCMSProduct,
  WrapProduct,
} from "@/styles/CmsProductStylead";
import Table, { ColumnsType } from "antd/lib/table";
import React, { useMemo, useState } from "react";
import { Button, Image } from "antd";
import ExportIcon from "@/assets/icon/ExportIcon.svg";
import { useRouter } from "next/router";

interface DataType {
  key: React.Key;
  image: string;
  product: string;
  type: string;
  brand: string;
  sales: string;
  status: string;
  import: string;
}
export const CmsOder: NextPageWithLayout = () => {
  const router = useRouter();

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
        title: "Đơn hàng",
        dataIndex: "product",
      },
      {
        title: "Ngày ",
        dataIndex: "type",
      },
      {
        title: "Khách hàng",
        dataIndex: "brand",
      },
      {
        title: "Trạng thái",
        dataIndex: "sales",
      },
      {
        title: "Thành tiền",
        dataIndex: "status",
      },
    ],
    []
  );

  const data: DataType[] = [];
  for (let i = 0; i < 46; i++) {
    data.push({
      key: i,
      image: `London, Park Lane no. ${i}`,
      product: `Đơn hàng` + i,
      type: `20/01/2002`,
      brand: `Mr. Quang`,
      sales: `Chờ xác nhận`,
      status: `15.000.000đ`,
      import: `20/01/2002`,
    });
  }

  return (
    <WrapperCMSProduct>
      <HeadingTitle>
        <h5>Sản phẩm</h5>

        <div>
          <ButtonExport type="default">
            <img src={ExportIcon.src} alt="" />
            <div>Export</div>
          </ButtonExport>
          <Button
            type="primary"
            size="large"
            onClick={() => router.push("/cms/cms-oder/oder-details")}
          >
            +&nbsp;&nbsp;Tạo đơn hàng
          </Button>
        </div>
      </HeadingTitle>
      <WrapProduct>
        <div>Tất cả sản phẩm</div>
        <div>
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={data}
          />
        </div>
      </WrapProduct>
    </WrapperCMSProduct>
  );
};
