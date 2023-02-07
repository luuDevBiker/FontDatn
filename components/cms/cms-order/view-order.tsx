import { NextPageWithLayout } from "@/models/common";
import {
  ButtonExport,
  HeadingTitle,
  WrapperCMSProduct,
  WrapProduct,
} from "@/styles/CmsProductStylead";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  MinusCircleOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import Table, { ColumnsType } from "antd/lib/table";
import React, { useEffect, useMemo, useState } from "react";
import { Button, Image, Tag, Modal, Row, Col, Input, message } from "antd";
import ExportIcon from "@/assets/icon/ExportIcon.svg";
import { useRouter } from "next/router";
import { useAppDispatch } from "@/app/hooks";
import {
  getOrders,
  confirmOrder,
  updateStatusOrder,
} from "@/features/order-slice";

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
  const [currStatus, setCurrStatus] = useState<string>("");
  const { TextArea } = Input;
  const dispatch = useAppDispatch();
  //#endregion

  //#region useEffect: load data
  useEffect(() => {
    if (loading) {
      dispatch(getOrders())
        .unwrap()
        .then()
        .then((res: any) => {
          console.log(res);

          setData(res.Payload);
          setLoading(false);
        });
    }
  }, [loading, items]);
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
    let status = data.StatusOrder;
    setCanEdit(status === 0 ? true : status === 2 ? true : false);
    let textModalOk =
      status === 0 ? "Xác nhận" : status === 2 ? "Giao hàng" : "";
    setCurrStatus(textModalOk);
    setItems(data.Items);
    setRecordOrder(data?.OrderDetails);
    setOpenEdit(true);
    setOrderId(data.Id);
  };

  const updateNote = (value: any) => {
    let note = value.target.value;

    if (indexNoteSelect !== -1) {
      let newItemsUpdate = items.map((el: any, index: number) => {
        if (index === indexNoteSelect) {
          el.Note = note;
          return el;
        }
        return el;
      });
      let newRecordsOrder = recordOrder.map((el: any, index: number) => {
        if (index === indexNoteSelect) {
          el.Note = note;
          return el;
        }
        return el;
      });

      setItems(newItemsUpdate);
      setRecordOrder(newRecordsOrder);
    }
  };

  const setItemNoteValueIndex = (index: number) => {
    setIndexNoteSelect(index);
  };

  const updateOrder = (status: number, id: any) => {
    for (let index = 0; index < items.length; index++) {
      const element = items[index];
      let elementCheck = recordOrder.find(
        (el: any, indexItem: number) => index === indexItem
      );
      console.log(elementCheck);

      //#region emei empty
      if (element.Note === null || element.Note === "") {
        message.error({
          content: `${elementCheck.Name} chưa nhập emeis`,
          duration: 1,
          style: {
            marginTop: "3vh",
            float: "right",
          },
        });
        return;
      }
      //#endregion

      let emeis = element.Note.split("\n");
      let checkEmeis = emeis.filter((el:any)=> el === "")

      //#region emei not validate
      if (checkEmeis.length > 0) {
        message.error({
          content:  `${elementCheck.Name} có emeis sai định dạng`,
          duration: 1,
          style: {
            marginTop: "3vh",
            float: "right",
          },
        });
        return;
      }
      //#endregion

      //#region missing emei
      if (emeis.length < element.Quantity) {
        message.error({
          content:  `${elementCheck.Name} nhập thiếu emeis`,
          duration: 1,
          style: {
            marginTop: "3vh",
            float: "right",
          },
        });
        return;
      }
      //#endregion

      //#region superfluous emei
      if (emeis.length > element.Quantity) {
        message.error({
          content: `${elementCheck.Name} nhập thừa emeis`,
          duration: 1,
          style: {
            marginTop: "3vh",
            float: "right",
          },
        });
        return;
      }
      //#endregion
    }
    let payload =
      status === 2
        ? {
            Id: orderId,
            Payload: {
              StatusOrder: status,
              Items: items,
              Note: note,
            },
          }
        : {
            Id: id,
            Payload: {
              StatusOrder: status,
            },
          };
    console.log(payload);

    dispatch(status === 2 ? confirmOrder(payload) : updateStatusOrder(payload))
      .unwrap()
      .then()
      .then((res: any) => {
        if (res.StatusCode === 200) {
          message.success({
            content: "Đã xác nhận đơn hàng",
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
              <Tag icon={<SyncOutlined spin />} color="processing">
                Đang xử lý
              </Tag>
            );
          }

          if (record.StatusOrder === 3) {
            return (
              <Tag icon={<SyncOutlined spin />} color="processing">
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
        <h5>Quản lý hóa đơn</h5>
      </HeadingTitle>

      <WrapProduct>
        <div>Tất cả hóa đơn</div>
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
        onOk={() => {
          currStatus === "Xác nhận"
            ? updateOrder(2, orderId)
            : currStatus === "Giao hàng"
            ? updateOrder(3, orderId)
            : console.log("update status order");
        }}
        onCancel={() => setOpenEdit(false)}
        width={"70%"}
        okText={currStatus}
        cancelButtonProps={{ style: { display: cantEdit ? "none" : "" } }}
        okButtonProps={{ style: { display: cantEdit ? "" : "none" } }}
        destroyOnClose
      >
        <WrapperCMSProduct>
          {recordOrder?.map((el: any, indexItem: number) => (
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
                  <>
                    <span
                      style={{
                        color:
                          el?.Note?.split("\n").length > el.Quantity
                            ? "red"
                            : "",
                      }}
                    >
                      {el?.Note?.split("\n").length === undefined?0:el?.Note?.split("\n").length}/{el.Quantity} EMEIS
                    </span>
                    <TextArea
                      onClick={() => {
                        setItemNoteValueIndex(indexItem);
                      }}
                      onChange={updateNote}
                      placeholder={
                        el.Note === null
                          ? `Nhập EMEI và thông tin của sản phẩm ${el.Name}`
                          : `${el.Note}`
                      }
                    />
                  </>
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
