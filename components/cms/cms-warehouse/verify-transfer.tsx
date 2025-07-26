import { NextPageWithLayout } from "@/models/common";
import { WrapperCMSProduct, WrapProduct } from "@/styles/CmsProductStylead";
import Search from "antd/lib/input/Search";
import { useEffect, useMemo, useState } from "react";

import Table, { ColumnsType } from "antd/lib/table";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { getDeliveryById } from "@/features/warehouse-slice";
import { IGetDeliveryByID, IResponseRecivedBill } from "@/models/warehouse";
import { useAppDispatch } from "@/app/hooks";
import Input from "antd/lib/input/Input";
import { Button, Space } from "antd";
import { Progress } from "@ant-design/plots";
import { InputNumber } from "antd";

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

export const VerifyTransfer: NextPageWithLayout = () => {
  const router = useRouter();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const dispatch = useAppDispatch();
  const [data, setData] = useState<any>();
  const [percent, setPercent] = useState<number>(0);
  const [numImport, setNumImport] = useState<number>(0);
  useEffect(() => {
    const payload: IGetDeliveryByID = {
      RecivedBillId: String(router.query.id),
    };
    dispatch(getDeliveryById(payload))
      .unwrap()
      .then()
      .then((res: any) => {
        setData(res);
      });
  }, [router.query.id, dispatch]);

  let sumOfProduct = 0;
  if (data) {
    sumOfProduct = data?.reduce((prev: number, data: IResponseRecivedBill) => {
      return prev + data.numberofRequest;
    }, 0);
  }

  const onChangeImport = (value: any) => {
    setNumImport(value);
    let cacucue = value / sumOfProduct;
    setPercent(cacucue);
  };
  const onChangeReject = (value: any) => {
    let cacucue = value / sumOfProduct;
    setPercent(cacucue);
  };

  const config = {
    height: 20,
    width: 700,
    autoFit: false,
    percent: percent,
    color: ["#c5413a", "#457bcd"],
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {},
    getCheckboxProps: (record: any) => ({
      disabled: record.productVariantIname === "Disabled User", // Column configuration not to be checked
      name: record.productVariantIname,
    }),
  };
  const hasSelected = selectedRowKeys.length > 0;

  const columns: ColumnsType<DataType> = useMemo(
    () => [
      {
        title: "Nhập kho",
        dataIndex: "productVariantIname",
        render: (text: string, record: any) => (
          <a
            onClick={() =>
              router.push(
                `/cms/cms-warehouse/create-tranfers/${record.recivedBillId}/`
              )
            }
          >
            {text}
          </a>
        ),
      },
      {
        title: "SKU",
        dataIndex: "sales",
      },
      {
        title: "Nhận vào",
        dataIndex: "status",
        width: "200px",
        render: (record: IResponseRecivedBill) => (
          <Space>
            <InputNumber
              max={sumOfProduct}
              min={0}
              type="number"
              onChange={onChangeImport}
            />
            <Button>All</Button>
          </Space>
        ),
      },
      {
        title: "Từ chối",
        dataIndex: "status",
        width: "200px",
        render: (record: IResponseRecivedBill) => (
          <Space>
            <InputNumber
              max={sumOfProduct}
              min={0}
              type="number"
              onChange={onChangeReject}
            />
            <Button>All</Button>
          </Space>
        ),
      },
      {
        dataIndex: "action",
        width: 200,
        title: "Tổng cộng",
      },
    ],
    [onChangeImport, onChangeReject, router, sumOfProduct]
  );

  return (
    <WrapperCMSProduct>
      <WrapProduct>
        <div className="title">Danh sách sản phẩm</div>
        <div></div>
        <div>
          <Progress {...config} />
          <div>
            Tổng số nhận được: {numImport}/{sumOfProduct}
          </div>
          <br />
        </div>
        <div>
          <Table
            bordered
            rowSelection={{
              type: "checkbox",
              ...rowSelection,
            }}
            columns={columns}
            dataSource={data}
            rowKey={(record: any) => record.productVariantId}
          />
        </div>
      </WrapProduct>
      y \m SÁxvhj8m=
    </WrapperCMSProduct>
  );
};
