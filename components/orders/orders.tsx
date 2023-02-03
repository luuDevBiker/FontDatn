import { NextPageWithLayout } from "@/models/common";
import {
  ButtonExport,
  HeadingTitle,
  WrapperCMSProduct,
  WrapProduct,
} from "@/styles/CmsProductStylead";
import Table, { ColumnsType } from "antd/lib/table";
import React, { useEffect, useMemo, useState } from "react";
import { Button, Image, Tag } from "antd";
import ExportIcon from "@/assets/icon/ExportIcon.svg";
import { useRouter } from "next/router";
import { useAppDispatch } from "@/app/hooks";
import { getOrders } from "@/features/order-slice";

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
export const Orders: NextPageWithLayout = () => {
  const router = useRouter();

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<DataType[]>();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getOrders())
      .unwrap()
      .then()
      .then((res: any) => {
        console.log(res.Payload);
        setData(res.Payload);
      });
  },[]);

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
        title: "Tên khách hàng",
        dataIndex: "ProfileName",
        key: "ProfileName",
        render: (text: any) => <b>{text}</b>,
      },
      {
        title: "Số điện thoại",
        dataIndex: "Phone",
        key: "Phone",
      },
      {
        title: "Địa chỉ",
        dataIndex: "Description",
        key: "Description",
      },
      {
        title: "Tổng tiền",
        dataIndex: "AmountPay",
        key: "AmountPay",
        render: (text: any) => (
          <span className="text-warning">{text?.toLocaleString("vi")}</span>
        ),
      },
      {
        title: "Ngày đặt",
        dataIndex: "CreatedTime",
        key: "CreatedTime",
      },
      {
        title: "Trạng thái",
        dataIndex: "StatusOrder",
        key: "StatusOrder",
        render: (_: any, record: any) => {
          console.log(record);
          
          if (record.StatusOrder === 0) {
            return <Tag color="processing">Chờ xử lý</Tag>;
          }
          if (record.StatusOrder === 1) {
            return (
              <span>
                <Tag color="processing">Đang xử lý</Tag>
                <Tag color="processing">Giao hàng</Tag>
              </span>
            );
          }
          if (record.StatusOrder === 2) {
            return <Tag color="error">Đã hủy</Tag>;
          }
          if (record.StatusOrder === 3) {
            return <Tag color="processing">Hoàn thành</Tag>;
          }
          return <Tag color="default">Đang giao</Tag>;
        },
      },
      {
        title: "Xem chi tiết",
        dataIndex: "quantity",
        key: "quantity",
        render: (_: any, record: any) => (
          <div>
            {record.StatusOrder === 1 ? (
              <Button className="ms-2" onClick={() => {}}>
                Sửa đơn hàng
              </Button>
            ) : (
              <Button className="ms-2" onClick={() => {}}>
                Xem
              </Button>
            )}
          </div>
        ),
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
            onClick={() => router.push("/cms/cms-order/order-details")}
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
