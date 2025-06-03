import {
  Box,
  BoxBody,
  BoxHeader
} from "@/styles/CmsDiscountStyled";
import { WrapProduct } from "@/styles/CmsProductStylead";
import {
  CartItem,
  CheckOut,
  Wrapper
} from "@/styles/ShoppingCartStyled";
import { DeleteOutlined } from "@ant-design/icons";
import {
  Col,
  Row,
  Image,
  Space,
  Input,
  Button,
  Tag,
  Checkbox,
  message,
} from "antd";
import IconVoucher from "@/assets/icon/teenyicons_discount-outline.svg";
import { useRouter } from "next/router";
import { useAppDispatch } from "@/app/hooks";
import { useEffect, useState } from "react";
import { getCart, deleteItemInCart, payment } from "@/features/shopping-slice";

export const ShoppingCart = () => {
  const router = useRouter();
  const [isConfirm, setIsConfirm] = useState<boolean>(false);
  const [item, setItem] = useState<any>("");
  const [idCart, setIdCart] = useState<any>();
  const [selectIndex, setSelectIndex] = useState<number>(-1);
  const [reload, setReload] = useState<boolean>(true);
  const [itemsOrder, setItemsOrder] = useState<any>([]);
  const [totalOrder, setTotalOrder] = useState<number>(0);
  const [profileId, setProfileId] = useState<any>();
  const [phone, setPhone] = useState<any>();
  const [address, setAddress] = useState<any>();
  const [receiverName, setReceiverName] = useState<any>();
  const [noteOrder, setNoteOrder] = useState<any>();

  const dispatch = useAppDispatch();

  const storage = localStorage.getItem("u");

  useEffect(() => {
    let user = storage ? JSON.parse(storage)?.Profile?.Id : null;
    setProfileId(user);

    if (storage && reload) {
      let id = JSON.parse(storage)?.CartId;
      dispatch(getCart(id))
        .unwrap()
        .then()
        .then((res: any) => {
          if (res.StatusCode !== 200) {
            return;
          }
          let cart = res.Payload;
          setItem(cart);
          setIdCart(cart.Id);
          localStorage.setItem("idCart", cart.Id);
          localStorage.setItem("countItemInCart", cart?.ItemDetails.length);
          setReload(false);
        });
    }
    if (!storage) {
      message.warning({
        content: "Bạn chưa đăng nhập",
        duration: 3,
        style: {
          marginTop: "3vh",
          float: "right",
        },
      });
      return;
    }
  }, [item,itemsOrder]);

  const delItemInCart = (key: any, id: any) => {
    var payload = { key: key, id: id };
    dispatch(deleteItemInCart(payload))
      .unwrap()
      .then()
      .then((res: any) => {
        console.log(res);
        if (res?.StatusCode === 200) {
          message.success({
            content: "Đã xóa sản phẩm khỏi giỏ hàng!",
            duration: 3,
            style: {
              marginTop: "3vh",
              float: "right",
            },
          });

          setItem(res.Payload);
          setReload(true);
        }
      })
      .catch((err) => console.log("err", err));
  };

  const paymentCart = () => {
    if (itemsOrder.length === 0) {
      message.warning({
        content: "Đơn hành không có sản phẩm !",
        duration: 3,
        style: {
          marginTop: "3vh",
          float: "right",
        },
      });
      return;
    }

    if (receiverName === undefined || receiverName === "") {
      message.warning({
        content: "Nhập tên người nhận !",
        duration: 3,
        style: {
          marginTop: "3vh",
          float: "right",
        },
      });
      return;
    }

    if (address === undefined || address === "") {
      message.warning({
        content: "Nhập địa chỉ giao hàng !",
        duration: 3,
        style: {
          marginTop: "3vh",
          float: "right",
        },
      });
      return;
    }

    if (phone === undefined || phone === "") {
      message.warning({
        content: "Nhập số điện thoại người nhận !",
        duration: 3,
        style: {
          marginTop: "3vh",
          float: "right",
        },
      });
      return;
    }

    var payload = {
      cartId: idCart,
      payload: {
        ProfileId: profileId,
        ReceiverName: receiverName,
        AmountPay: totalOrder + totalOrder * 0.1,
        PayingCustomer: 0,
        Description: address,
        Phone: phone,
        Payments: totalOrder,
        Items: itemsOrder,
        Note: noteOrder,
      },
    };
    dispatch(payment(payload))
      .unwrap()
      .then()
      .then((res: any) => {
        if (res?.status === 200) {
          message.success({
            content: "Đặt hàng thành công!",
            duration: 3,
            style: {
              marginTop: "3vh",
              float: "right",
            },
          });
        }
        setItem(res.Payload);
        setReload(true);
        setItemsOrder([]);
      });
  };

  const changeQuantity = (event: any) => {
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

    if (selectIndex !== -1) {
      let newItemsUpdate = { ...item };
      let productVariantId = "";
      newItemsUpdate.ItemDetails = item?.ItemDetails.map(
        (el: any, indexItem: number) => {
          if (indexItem === selectIndex) {
            el.Quantity = value;
            productVariantId = el.ProductVariantId;
            return el;
          }
          return el;
        }
      );
      console.log(productVariantId);

      setItem(newItemsUpdate);
      let newOrderItems = itemsOrder ;
      console.log(newOrderItems);
      
      newOrderItems = newOrderItems?.map((el: any, indexItem: number) => {
        if (el.ProductVariantId === productVariantId) {
          el.Quantity = value;
          return el;
        }
        return el;
      });
      console.log(newOrderItems);
      
      setItemsOrder(newOrderItems);
    }
  };

  const checkboxChange = (e: any) => {
    let value = e.target.value;
    console.log(value);

    if (e.target.checked === true) {
      setItemsOrder([
        ...itemsOrder,
        {
          ProductVariantId: value.ProductVariantId,
          Quantity: value.Quantity,
          UnitPrice: value.Price,
        },
      ]);
      setTotalOrder(totalOrder + value.Quantity * value.Price);
    } else {
      setItemsOrder(
        itemsOrder.map(
          (el: any) => el.ProductVariantId !== value.ProductVariantId
        )
      );
      setTotalOrder(totalOrder - value.Quantity * value.Price);
    }
  };

  const infoChange = (e: any) => {
    if (selectIndex === -2) {
      setAddress(e.target.value);
    }
    if (selectIndex === -3) {
      setPhone(e.target.value);
    }
    if (selectIndex === -4) {
      setReceiverName(e.target.value);
    }
    if (selectIndex === -5) {
      setNoteOrder(e.target.value);
    }
  };

  return (
    <Wrapper style={{width:"95%"}}>
      <Button
        onClick={() => router.push("/")}
        type="primary"
      >{`< Quay lại mua hàng`}</Button>
      <Row gutter={[5, 20]}>
        <Col span={18}>
          <Box>
            <BoxHeader>
              <div>Giỏ hàng</div>
              {item === "" ? (
                <Tag className="d-flex justify-content-center">
                  Không có sản phẩm nào
                </Tag>
              ) : (
                <></>
              )}
              {/* <ContenRight>Giảm giá</ContenRight> */}
            </BoxHeader>
            <BoxBody>
              {}
              {item?.ItemDetails?.map((el: any, index: number) => {
                return (
                  <CartItem
                  key={el.Name || index}
                    style={{ boxShadow: "2px 1px lightblue" }}
                    className="mt-4"
                    onClick={() => setSelectIndex(index)}
                  >
                    <Row gutter={[10, 10]}>
                      <Col span={1}>
                        <Checkbox value={el} onChange={checkboxChange} />
                      </Col>
                      <Col span={3}>
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
                            <span style={{ color: "red", fontSize: "15px" }}>
                              {el.SkuId}
                            </span>
                          </div>
                          <div>
                            <b>{el.OptionValues.substring(0, 100)} ...</b>
                          </div>
                          <div>
                            {el.Price.toLocaleString("vi")} <u>đ</u>
                          </div>
                        </Space>
                      </Col>
                      <Col span={4}>
                        {"số lượng: "}{el.Quantity}
                        <Input
                          min={1}
                          max={el.CurrentQuantity}
                          onChange={changeQuantity}
                          type="number"
                          placeholder={el.Quantity}
                        />
                      </Col>
                      <Col span={5}>
                        <div style={{ color: "red", fontSize: "18px" }}>
                          Thành tiền :{" "}
                          <i>
                            {(el.Quantity * el.Price).toLocaleString("vi")}{" "}
                            <u>đ</u>
                          </i>
                        </div>
                      </Col>
                      <Col span={2}>
                        <Button
                          onClick={() =>
                            delItemInCart(idCart, el.ProductVariantId)
                          }
                        >
                          <DeleteOutlined />
                        </Button>
                      </Col>
                    </Row>
                  </CartItem>
                );
              })}
            </BoxBody>
          </Box>
        </Col>
        <Col span={6}>
          <WrapProduct>
            <div className="title">Chi tiết thanh toán</div>
            <CheckOut>
              <div>Tổng tiền: </div>
              <div>
                {totalOrder.toLocaleString("vi")}
                <i>đ</i>
              </div>
            </CheckOut>
            <CheckOut>
              <div>VAT: </div>
              <div>
                {(totalOrder * 0.1).toLocaleString("vi")}
                <i>đ</i>
              </div>
            </CheckOut>
            <CheckOut>
              <div>
                <Image alt="" src={IconVoucher.src}></Image>
                <b>{` F-Computor Shop`}</b>
              </div>
            </CheckOut>
            <br />
            <Input
              onClick={() => {
                setSelectIndex(-2);
              }}
              onChange={infoChange}
              placeholder="nhập địa chỉ"
            />
            <Input
              onClick={() => {
                setSelectIndex(-3);
              }}
              onChange={infoChange}
              placeholder="nhập số điện thoại"
              style={{ marginTop: "2px" }}
            />
            <Input
              onClick={() => {
                setSelectIndex(-4);
              }}
              onChange={infoChange}
              placeholder="Tên người nhận"
              style={{ marginTop: "2px" }}
            />
            <Input
              onClick={() => {
                setSelectIndex(-5);
              }}
              onChange={infoChange}
              placeholder="Ghi chú đơn hàng"
              style={{ marginTop: "2px" }}
            />
            <br />
            <br />
            <CheckOut>
              <div className="title">Tổng thanh toán</div>
              <div style={{ color: "red", fontSize: "18px" }}>
                <u>
                  {item === ""
                    ? 0
                    : (totalOrder * 0.1 + totalOrder).toLocaleString("vi")}{" "}
                  <i>đ</i>
                </u>
              </div>
            </CheckOut>
            <Button
              onClick={() => paymentCart()}
              type="primary"
            >{`Thanh toán ngay`}</Button>
          </WrapProduct>
        </Col>
      </Row>
    </Wrapper>
  );
};
