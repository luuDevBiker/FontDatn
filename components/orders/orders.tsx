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
  PlusCircleOutlined,
  DeleteColumnOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import {
  Box,
  BoxBody,
  BoxHeader,
  ContenRight,
} from "@/styles/CmsDiscountStyled";
import {
  CartItem,
  CheckOut,
  Wrapper,
  WrapperDiscount,
  WrapperDiscountLeft,
  WrapperDiscountRigth,
  WrapperVoucher,
} from "@/styles/ShoppingCartStyled";
import Table, { ColumnsType } from "antd/lib/table";
import React, { useEffect, useMemo, useState } from "react";
import {
  Button,
  Image,
  Tag,
  Modal,
  Row,
  Col,
  Input,
  message,
  Space,
  Checkbox,
} from "antd";
import ExportIcon from "@/assets/icon/ExportIcon.svg";
import { useRouter } from "next/router";
import { useAppDispatch } from "@/app/hooks";
import {
  confirmOrder,
  getOrdersProfileById,
  updateStatusOrder,
  updateOrder,
  deleteItemOrder,
} from "@/features/order-slice";
import { getCart } from "@/features/shopping-slice";

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
  const [profileId, setProfileId] = useState<any>();
  const [statusOrder, setStatusOrder] = useState<number>(-1);
  const [index, setIndex] = useState<number>(-1);
  const [order, setOrder] = useState<any>();
  const [item, setItem] = useState<any>();
  const [isAddItem, setIsAddItem] = useState<boolean>(true);
  const { TextArea } = Input;
  const dispatch = useAppDispatch();

  const storage = localStorage.getItem("u");

  //#endregion

  //#region useEffect: load data
  useEffect(() => {
    let user = storage ? JSON.parse(storage) : null;
    if (user === null) {
      setProfileId(user?.Profile?.Id);
    }
    setProfileId(user?.Profile?.Id);
    if (storage && loading) {
      let id = JSON.parse(storage)?.Profile?.Id;
      dispatch(getOrdersProfileById(id))
        .unwrap()
        .then()
        .then((res: any) => {
          if (res.StatusCode === 200) {
            setData(res.Payload);
          }
        })
        .catch((res: any) => {});

      let idCart = JSON.parse(storage)?.CartId;
      dispatch(getCart(idCart))
        .unwrap()
        .then()
        .then((res: any) => {
          let cart = res.Payload;
          setItem(cart);
        })
        .catch((res: any) => {});
    }

    setLoading(false);
  }, [loading, order]);
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
    setOrder(data);
    let status = data.StatusOrder;
    setCanEdit(status === 1 ? true : false);
    setItems(data.Items);
    setRecordOrder(data?.OrderDetails);
    setOpenEdit(true);
    setOrderId(data.Id);
    setStatusOrder(status);

    console.log(data?.OrderDetails);
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

  const updateInforOrder = (event: any) => {
    let value = event.target.value;
    if (index === 99) {
      order.ReceiverName = value;
    }
    if (index === 100) {
      order.Phone = value;
    }
    if (index === 101) {
      order.Description = value;
    }
    if (index === 102) {
      order.Note = value;
    }
  };

  const userUpdateOrder = (status: number, id: any) => {
    let payloadUpdateStatus = { ...order };
    payloadUpdateStatus.StatusOrder = status;
    console.log(payloadUpdateStatus);

    let payload = {
      Id: id,
      Payload: {
        StatusOrder: status,
      },
    };
    dispatch(
      status !== 0
        ? updateStatusOrder(payload)
        : updateOrder(payloadUpdateStatus)
    )
      .unwrap()
      .then()
      .then((res: any) => {
        if (res.StatusCode === 200) {
          message.success({
            content: "Cập nhật đơn hàng thành công",
            duration: 1,
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

  const onCancelModal = () => {
    setIsAddItem(true);
    setOpenEdit(false);
  };

  //#endregion

  //#region update quantity item edit detail order
  const updateQuantity = (event: any) => {
    let value = parseInt(event.target.value) as number;
    let max = parseInt(event.target.max) as number;

    value = isNaN(value) ? 1 : value;

    if (max < value || value < 0) {
      message.error({
        content: "Kiểm tra số lượng",
        duration: 1,
        style: {
          marginTop: "3vh",
          float: "right",
        },
      });
      value = max;
    }

    if (index !== -1) {
      let newItemsUpdate = items.map((el: any, indexItem: number) => {
        if (index === indexItem) {
          el.Quantity = value;
          return el;
        }
        return el;
      });
      let newRecordsUpdate = recordOrder.map((el: any, indexItem: number) => {
        if (index === indexItem) {
          el.Quantity = value;
          return el;
        }
        return el;
      });
      setItems(newItemsUpdate);
      setRecordOrder(newRecordsUpdate);
    }
    setLoading(true);
  };
  //#endregion

  //#region get items incart to add order
  const updateQuantityItemCart = (event: any) => {
    let value = event.target.value;
    console.log(item);

    if (index !== -1) {
      let newItemsUpdate = { ...item };
      newItemsUpdate.ItemDetails = item?.ItemDetails.map(
        (el: any, indexItem: number) => {
          if (indexItem === index) {
            el.Quantity = value;
            return el;
          }
          return el;
        }
      );
      setItem(newItemsUpdate);
    }
  };

  const isAddItemToOrder = (indexItemInCart: number) => {
    let newOrder = { ...order };
    let itemInCart = { ...item };
    var newItem = item.ItemDetails.find(
      (el: any, indexItem: number) => indexItem === indexItemInCart
    );

    var newCart = item.ItemDetails.filter((el: any, indexItem: number) => {
      if (indexItem !== indexItemInCart) return el;
    });
    itemInCart.ItemDetails = newCart;
    setItem(itemInCart);

    var ietmExist = order.OrderDetails.find(
      (el: any, indexItem: number) =>
        el.ProductVariantId === newItem.ProductVariantId
    );

    if (ietmExist) {
      return;
    }

    newOrder.OrderDetails.push(newItem);
    newOrder.Items.push({
      ProductVariantId: newItem.ProductVariantId,
      Quantity: newItem.Quantity,
      UnitPrice: newItem.Price,
    });

    setOrder(newOrder);
  };

  //#endregion

  //#region delete item in order

  const deleteItemOrder = (index: number) => {
    let newOrder = { ...order };

    var newRecordsOrder = recordOrder.filter((el: any, indexItem: number) => {
      if (indexItem !== index) return el;
    });
    var newItems = order.Items.filter((el: any, indexItem: number) => {
      if (indexItem !== index) return el;
    });

    var newItemsDetails = order.OrderDetails.filter(
      (el: any, indexItem: number) => {
        if (indexItem !== index) return el;
      }
    );

    newOrder.OrderDetails = newItemsDetails;
    newOrder.Items = newItems;

    if (newRecordsOrder.length === 0) {
      message.warning({
        content: "Đơn hàng cần ít nhất một sản phẩm",
        duration: 1,
        style: {
          marginTop: "3vh",
          float: "right",
        },
      });
      return;
    }
    setRecordOrder(newRecordsOrder);
    setOrder(newOrder);
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
        render: (_, record) => (
          <div>
            {record.orderStatus === 1 ? (
              <Button className="ms-2" onClick={() => viewDetail(record)}>
                Sửa đơn hàng
              </Button>
            ) : (
              <Button className="ms-2" onClick={() => viewDetail(record)}>
                Xem
              </Button>
            )}
            {record.orderStatus === 1 ? (
              <Button className="ms-2" onClick={() => viewDetail(record)}>
                Đặt lại
              </Button>
            ) : (
              <Button
                className="ms-2"
                onClick={() => userUpdateOrder(1, record.Id)}
                disabled={record.StatusOrder !== 0}
              >
                Hủy
              </Button>
            )}
            <Button
              className="ms-2"
              onClick={() => userUpdateOrder(4, record.Id)}
              disabled={record.StatusOrder !== 3}
            >
              Đã nhận hàng
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
        <h5>Hóa đơn của bạn</h5>
        <Button
          onClick={() => {
            router.push({
              pathname: "/",
            });
          }}
        >
          <HomeOutlined /> Tiếp tục mua hàng
        </Button>
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

      {
        //#region Modal
        <Modal
          title="Chi tiết đơn hàng"
          open={openEdit}
          onOk={() => userUpdateOrder(0, orderId)}
          onCancel={() => onCancelModal()}
          width={"70%"}
          okText="Lưu thay đổi"
          cancelButtonProps={{ style: { display: cantEdit ? "none" : "" } }}
          okButtonProps={{ style: { display: cantEdit ? "" : "none" } }}
          destroyOnClose
        >
          {
            //#region show orders
            <WrapperCMSProduct>
              <WrapProduct style={{ width: "90%" }}>
                <Row gutter={[20, 20]} style={{ margin: "5px 0px" }}>
                  <Col span={5}>
                    <label>Người nhận</label>{" "}
                    <Input
                      onChange={updateInforOrder}
                      onClick={() => setIndex(99)}
                      title="Tên người nhận"
                      placeholder={
                        order ? order.ReceiverName : "Tên người nhận"
                      }
                    />
                  </Col>
                  <Col span={5}>
                    <label>Số điện thoại</label>{" "}
                    <Input
                      onChange={updateInforOrder}
                      onClick={() => setIndex(100)}
                      title="Số điện thoại"
                      placeholder={order ? order.Phone : "Số điện thoại"}
                    />
                  </Col>
                  <Col span={5}>
                    <label>Địa chỉ</label>{" "}
                    <Input
                      onChange={updateInforOrder}
                      onClick={() => setIndex(101)}
                      title="Địa chỉ"
                      placeholder={order ? order.Description : "Địa chỉ"}
                    />
                  </Col>
                  <Col span={9}>
                    <label>Ghi chú</label>{" "}
                    <Input
                      onChange={updateInforOrder}
                      onClick={() => setIndex(102)}
                      title="Ghi chú"
                      placeholder={order ? order.Note : "Ghi chú"}
                    />
                  </Col>
                </Row>
              </WrapProduct>
              {recordOrder?.map((el: any, indexItem: number) => (
                <WrapProduct style={{ width: "90%" }} title={el.OptionValues}>
                  {}
                  <MinusCircleOutlined
                    hidden={order.StatusOrder === 1 ? false : true}
                    style={{
                      float: "right",
                      margin: "-25px",
                      borderRadius: "50%",
                    }}
                    onClick={() => deleteItemOrder(indexItem)}
                  />

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
                      <span style={{ color: "#2d41f0" }}>
                        {el.Caregory}
                      </span>{" "}
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
                      <span style={{ color: "#2d41f0" }}>
                        {el.Quantity}
                        {"/"}
                        {el.CurrentQuantity}
                      </span>{" "}
                      {statusOrder === 0 || statusOrder === 1 ? (
                        <Input
                          type="number"
                          min={1}
                          max={el.CurrentQuantity}
                          onClick={() => setIndex(indexItem)}
                          onChange={updateQuantity}
                          placeholder={"nhập số lượng mới"}
                        />
                      ) : (
                        <></>
                      )}
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
            //#endregion
          }

          {
            //#region add item cart to order

            <WrapperCMSProduct hidden={order?.StatusOrder === 1 ? false : true}>
              <span>Thêm sản phẩm từ giỏ hàng</span>
              <Button onClick={() => setIsAddItem(false)}>Thêm sản phẩm</Button>

              <Wrapper hidden={isAddItem}>
                <Row gutter={[20, 20]}>
                  <Col span={18}>
                    <Box>
                      <BoxBody>
                        <HeadingTitle>
                          {item?.ItemDetails?.lenth === 0 ? (
                            <Tag>Bạn không có sản phẩm nào trong giỏ hàng</Tag>
                          ) : (
                            <>
                              {" "}
                              <Tag>Sản phẩm trong giỏ hàng của bạn</Tag>
                              <Button
                                onClick={() =>
                                  router.push({
                                    pathname: "/",
                                  })
                                }
                              >
                                Tới mua hàng
                              </Button>
                            </>
                          )}
                        </HeadingTitle>
                        {item?.ItemDetails?.map((el: any, index: number) => {
                          return (
                            <CartItem
                              onClick={() => setIndex(index)}
                              style={{ boxShadow: "2px 1px lightblue" }}
                              className="mt-4"
                            >
                              <Row gutter={[10, 10]}>
                                <Col span={5}>
                                  <Image
                                    preview={false}
                                    src={el.Url}
                                    alt=""
                                    height={"70%"}
                                  />
                                </Col>
                                <Col span={9}>
                                  <Space direction="vertical">
                                    <div>
                                      <b>{el.Name}</b> :{" "}
                                      <span
                                        style={{
                                          color: "red",
                                          fontSize: "15px",
                                        }}
                                      >
                                        {el.SkuId}
                                      </span>
                                    </div>
                                    <div>
                                      <b>
                                        {el.OptionValues.substring(0, 100)} ...
                                      </b>
                                    </div>
                                    <div>
                                      {el.Price.toLocaleString("vi")} <u>đ</u>
                                    </div>
                                  </Space>
                                </Col>
                                <Col span={2}>
                                  <Input
                                    onChange={updateQuantityItemCart}
                                    type="number"
                                    placeholder={el.Quantity}
                                  />
                                </Col>
                                <Col span={5}>
                                  <div
                                    style={{ color: "red", fontSize: "18px" }}
                                  >
                                    Thành tiền :{" "}
                                    <i>
                                      {(el.Quantity * el.Price).toLocaleString(
                                        "vi"
                                      )}{" "}
                                      <u>đ</u>
                                    </i>
                                  </div>
                                </Col>
                                <Col span={1}>
                                  <PlusCircleOutlined
                                    onClick={() => isAddItemToOrder(index)}
                                  />
                                </Col>
                              </Row>
                            </CartItem>
                          );
                        })}
                      </BoxBody>
                    </Box>
                  </Col>
                </Row>
              </Wrapper>
            </WrapperCMSProduct>
            //#endregion
          }
        </Modal>

        //#endregion
      }
    </WrapperCMSProduct>
  );
  //#endregion
};
