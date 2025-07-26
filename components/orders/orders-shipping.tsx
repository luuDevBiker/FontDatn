import { NextPageWithLayout } from "@/models/common";
import {
  HeadingTitle,
  WrapperCMSProduct,
  WrapProduct,
} from "@/styles/CmsProductStylead";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import Table, { ColumnsType } from "antd/lib/table";
import React, { useEffect, useMemo, useState } from "react";
import { Button, Tag, Modal, Row, Col, Input, message } from "antd";
import { useRouter } from "next/router";
import { useAppDispatch } from "@/app/hooks";
import { getOrders, updateStatusOrder } from "@/features/order-slice";

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
export const OrdersShipping: NextPageWithLayout = () => {
  //#region State
  const router = useRouter();

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const [loading, setLoading] = useState(true);
  const [orderId, setOrderId] = useState<any>();
  const [data, setData] = useState<DataType[]>();
  const [recordOrder, setRecordOrder] = useState<any>();
  const [items, setItems] = useState<any>();
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [cantEdit, setCanEdit] = useState<boolean>(false);
  const [indexNoteSelect, setIndexNoteSelect] = useState<number>(-1);
  const [note, setNote] = useState<string>();
  const [noteOrder, setNoteOrder] = useState<string>();

  const { TextArea } = Input;
  const dispatch = useAppDispatch();
  //#endregion

  //#region useEffect: load data
  useEffect(() => {
    if (!loading) {
      return;
    }
    dispatch(getOrders())
      .unwrap()
      .then()
      .then((res: any) => {
        setData(res.Payload);
        setLoading(false);
      });
  }, [loading, dispatch]);
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

  //#region viewDetail: set data and state view order detail and on edit
  const viewDetail = (data: any) => {
    setCanEdit(data.StatusOrder === 2 ? true : false);
    setItems(data.Items);
    setRecordOrder(data?.OrderDetails);
    setOpenEdit(true);
    setOrderId(data.Id);
  };

  const updateNote = (value: any) => {
    setNote(value.target.value);
    if (indexNoteSelect !== -1) {
      let newItemsUpdate = items.map((el: any, index: number) => {
        if (index === indexNoteSelect) {
          el.Note = note;
          return el;
        }
        return el;
      });
      setItems(newItemsUpdate);
    }
  };

  const setItemNoteValueIndex = (index: number) => {
    setIndexNoteSelect(index);
  };

  const updateOrderStatus = () => {
    let payload = {
      Id: orderId,
      Payload: {
        StatusOrder: 3,
      },
    };
    dispatch(updateStatusOrder(payload))
      .unwrap()
      .then()
      .then((res: any) => {
        if (res.StatusCode === 200) {
          message.success({
            content: "Đã nhận giao đơn hàng",
            duration: 3,
            style: {
              marginTop: "3vh",
              float: "right",
            },
          });
        }
        setLoading(true);
      });

    setOpenEdit(false);
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
        title: "Ghi chú",
        dataIndex: "Note",
        key: "Note",
      },
      {
        title: "Trạng thái",
        dataIndex: "StatusOrder",
        key: "StatusOrder",
        render: (_: any, record: any) => {
          if (record.StatusOrder === 0) {
            return (
              <Tag icon={<SyncOutlined spin />} color="processing">
                Chờ xử lý
              </Tag>
            );
          }
          if (record.StatusOrder === 1) {
            return (
              <Tag icon={<ExclamationCircleOutlined />} color="warning">
                Đã hủy
              </Tag>
            );
          }
          if (record.StatusOrder === 2) {
            return (
              <Tag icon={<SyncOutlined spin />} color="magenta">
                Đang xử lý
              </Tag>
            );
          }

          if (record.StatusOrder === 3) {
            return (
              <Tag icon={<SyncOutlined spin />} color="gold">
                Đang giao
              </Tag>
            );
          }
          if (record.StatusOrder === 4) {
            return (
              <Tag icon={<CheckCircleOutlined color="success" />}>
                Hoàn thành
              </Tag>
            );
          }
          return (
            <Tag icon={<CloseCircleOutlined />} color="error">
              Lỗi
            </Tag>
          );
        },
      },
      {
        title: "Xem chi tiết",
        dataIndex: "quantity",
        key: "quantity",
        render: (_: any, record: any) => (
          <div>
            <Button
              className="ms-2"
              onClick={() => {
                viewDetail(record);
              }}
            >
              Xem
            </Button>
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
        visible={openEdit}
        onOk={() => updateOrderStatus()}
        onCancel={() => setOpenEdit(false)}
        width={"70%"}
        okText="Xác nhận đi giao"
        cancelButtonProps={{ style: { display: cantEdit ? "none" : "" } }}
        okButtonProps={{ style: { display: cantEdit ? "" : "none" } }}
      >
        <WrapperCMSProduct>
          {recordOrder?.map((el: any, indexItem: number) => (
            <WrapProduct
              key={el.SkuId || indexItem}
              style={{ width: "90%" }}
              title={el.OptionValues}
            >
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
                  <span style={{ color: "#f71505" }}>
                    {el.Price.toLocaleString("vi")}
                  </span>
                  <i>đ</i>
                </Col>
                <Col span={4}>
                  {"Số lượng: "}
                  <span style={{ color: "#2d41f0" }}>{el.Quantity}</span>{" "}
                </Col>
                <Col span={12}>{el.OptionValues}</Col>
                <Col span={8}>
                  {el.Note ? (
                    <TextArea
                      onClick={() => {
                        setItemNoteValueIndex(indexItem);
                      }}
                      onChange={updateNote}
                      placeholder={`Nhập EMEI và thông tin của sản phẩm ${el.Name}`}
                    />
                  ) : (
                    <TextArea disabled={true} value={el.Note} />
                  )}
                </Col>
              </Row>
              <span style={{ float: "right" }}>
                Thành tiền:{" "}
                <Tag color="red">
                  {(el.Quantity * el.Price).toLocaleString("vi")}
                  <i>đ</i>
                </Tag>
              </span>
            </WrapProduct>
          ))}
        </WrapperCMSProduct>
      </Modal>
    </WrapperCMSProduct>
  );
  //#endregion
};
