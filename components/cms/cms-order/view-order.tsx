import { NextPageWithLayout } from "@/models/common";
import {
  ButtonExport,
  HeadingTitle,
  WrapperCMSProduct,
  WrapProduct,
} from "@/styles/CmsProductStylead";
import Table, { ColumnsType } from "antd/lib/table";
import React, { useEffect, useMemo, useState } from "react";
import { Button, Image, Tag, Modal, Row, Col, Input} from "antd";
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
export const CmsOder: NextPageWithLayout = () => {
  //#region State
  const router = useRouter();

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<DataType[]>();
  const [recordOrder, setRecordOrder] = useState<any>();
  const [openEdit, setOpenEdit] = useState<boolean>(false);

  const { TextArea } = Input;
  const dispatch = useAppDispatch();
  //#endregion

  //#region useEffect: load data
  useEffect(() => {
    dispatch(getOrders())
      .unwrap()
      .then()
      .then((res: any) => {
        setData(res.Payload);
      });
  }, []);
  //#endregion

  //#region  onSelectChange: set data record selected
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  //#endregion

  //#region rowSelection: set data record selected
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  //#endregion

  //#region hasSelected: check state selected
  const hasSelected = selectedRowKeys.length > 0;
  //#endregion

  //#region viewDetail: set data and state view order detail
  const viewDetail = (data: any) => {
    console.log(data);
    setRecordOrder(data);
    setOpenEdit(true);
  };
  //#endregion

  //#region Colums: colums of table

  const columns: ColumnsType<DataType> = useMemo(
    () => [
      {
        title: "Tên khách hàng",
        dataIndex: "ReceiverName",
        key: "ReceiverName",
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
              <Button
                className="ms-2"
                onClick={() => {
                  viewDetail(record);
                }}
              >
                Xem
              </Button>
            )}
          </div>
        ),
      },
    ],
    []
  );

  //#endregion

  //#region Return

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
      <Modal
        title="Xác nhận đơn hàng"
        open={openEdit}
        onOk={() => setOpenEdit(false)}
        onCancel={() => setOpenEdit(false)}
        width={"70%"}
        okText="Xác nhận"
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <WrapperCMSProduct>
          {recordOrder?.OrderDetails?.map((el: any, indexItem: number) => (
            <WrapProduct style={{ width: "90%" }} title={el.OptionValues}>
              <Row gutter={[20, 20]} style={{ margin: "5px 0px" }}>
                <Col span={8}>
                  <div>
                    {"Name: "}
                    <Tag>
                      <b> {el.Name} :</b>{" "}
                      <span style={{ color: "#2d41f0" }}>{el.SkuId}</span>
                    </Tag>
                  </div>
                </Col>
                <Col span={4}>
                  {"Thương hiệu: "}{" "}
                  <span style={{ color: "#2d41f0" }}>{el.Brand}</span>
                </Col>
                <Col span={4}>
                  {"Loại: "}
                  <span style={{ color: "#2d41f0" }}>{el.Caregory}</span>{" "}
                </Col>
                <Col span={4}>
                  {"Giá: "}
                  <span style={{ color: "#f71505" }}>{el.Price.toLocaleString("vi")}</span>
                  <i>đ</i>
                </Col>
                <Col span={4}>
                  {"Số lượng: "}
                <span style={{ color: "#2d41f0" }}>{el.Quantity}</span>{" "}</Col>
                <Col span={12}>{el.OptionValues}</Col>
                <Col span={8}>
                  <TextArea
                    placeholder={`Nhập EMEI và thông tin của sản phẩm ${el.Name}`}
                  />
                </Col>
              </Row>
              <span style={{float:"right"}}>Thành tiền: <Tag color="red">{(el.Quantity*el.Price).toLocaleString("vi")}<i>đ</i></Tag></span>
            </WrapProduct>
          ))}
        </WrapperCMSProduct>
      </Modal>
    </WrapperCMSProduct>
  );
  //#endregion
};
