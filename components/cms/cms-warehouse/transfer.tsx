import { NextPageWithLayout } from "@/models/common";
import {
  ButtonExport,
  HeadingTitle,
  WrapperCMSProduct,
  WrapProduct,
} from "@/styles/CmsProductStylead";
import Table, { ColumnsType } from "antd/lib/table";
import React, { useEffect, useMemo, useState } from "react";
import { Button, Form } from "antd";
import ExportIcon from "@/assets/icon/ExportIcon.svg";
import { useRouter } from "next/router";
import { useAppDispatch } from "@/app/hooks";
import { getAllTransfer } from "@/features/warehouse-slice";

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
export const CmsWareHouse: NextPageWithLayout = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);
  const { setFieldsValue } = form;
  const [data, setData] = useState<any>();
  useEffect(() => {
    dispatch(getAllTransfer())
      .unwrap()
      .then()
      .then((res: any) => {
        setData(res);
      });
  }, []);
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
        title: "Nhập kho",
        dataIndex: "name",
        render: (text: string, record: any) => (
          <a
            onClick={() =>
              router.push(
                `/cms/cms-warehouse/verify-transfer/${record.recivedBillId}/`
              )
            }
          >
            {text}
          </a>
        ),
      },
      {
        title: "Có thể bán",
        dataIndex: "sales",
      },
      {
        title: "Trạng thái",
        dataIndex: "status",
      },
      {
        dataIndex: "action",
        width: 200,
        title: "Hành động",
        render: function renderColumn(text: string, record: any) {
          return <div>Nhận hàng</div>;
        },
      },
    ],
    []
  );

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
            onClick={() => router.push("/cms/cms-warehouse/create-tranfers")}
          >
            +&nbsp;&nbsp;Tạo phiếu xuất kho
          </Button>
        </div>
      </HeadingTitle>
      <WrapProduct>
        <div>Tất cả sản phẩm</div>
        <div>
          <Table
            bordered
            rowSelection={rowSelection}
            columns={columns}
            dataSource={data}
          />
        </div>
      </WrapProduct>
    </WrapperCMSProduct>
  );
};
