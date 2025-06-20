import { WrapperCMSProduct, WrapProduct } from "@/styles/CmsProductStylead";
import {
  BoxMedia,
  OptionWrapp,
  WrapperOptions,
} from "@/styles/CmsProductStylead";
import {
  Button,
  Checkbox,
  Form,
  Input,
  message,
  Row,
  Col,
  Select,
  Table,
  Space,
  Tag,
  Radio,
  RadioChangeEvent,
  DatePicker,
} from "antd";
import React, { useState } from "react";
import {
  Box,
  BoxBody,
  BoxHeader,
  ContenRight,
} from "@/styles/CmsDiscountStyled";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
const { TextArea } = Input;
const { Option } = Select;
import _ from "lodash";
import { CheckboxValueType } from "antd/lib/checkbox/Group";
import { current } from "@reduxjs/toolkit";
import moment from "moment";

interface IAllValues {
  Email: string | undefined;
  DisplayName: string | undefined;
  codeValue: string | undefined;
  PhoneNumber: string | undefined;
}

export const Discount = () => {
  const [value, setValue] = useState(1);
  const [note, setNote] = useState<string>(
    "Khách hàng phải nhập mã thanh toán này khi thanh toán"
  );
  const [title, setTitle] = useState<string>("Mã giảm giá");
  const [form] = Form.useForm();
  const { getFieldValue, setFieldsValue } = form;
  const [unit, setUnit] = useState<string>("%");
  const [require, setRequire] = useState<string>("");
  const [checkedEndate, setCheckedEndate] = useState<boolean>(false);
  const [generateCode, setGenerateCode] = useState<string>("");
  const [codeValue, setCodeValue] = useState<string>("");
  const [discount, setDiscount] = useState<string>("");
  const [requiedValue, setRequireValue] = useState<string>(
    "Không yêu cầu giá trị tối thiểu"
  );
  const [hide, setHide] = useState<boolean>(false);
  const [numberUse, setNumberUse] = useState<string>(
    "Không giới hạn số lần sử dụng"
  );
  const [times, setTimes] = useState<number>(0);
  const [startDate, setStartDate] = useState<string>("");
  const [minimumMoney, setMinimumMoney] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
    if (e.target.value === 1) {
      setNote("Khách hàng phải nhập mã thanh toán này khi thanh toán");
      setTitle("Mã giảm giá");
      setCodeValue("");
      setFieldsValue({ "codeValue": "" });
    } else {
      setNote("Mã giảm giá sẽ được hiển thị tự động khi khách hàng thanh toán");
      setTitle("Tên mã giảm giá");
      setGenerateCode("");
    }
  };
  const onChangeUnit = (e: RadioChangeEvent) => {
    if (e.target.value === "a") {
      setUnit("%");
    } else {
      setUnit("đ");
    }
  };
  const onchangeRequire = (e: RadioChangeEvent) => {
    if (e.target.value === "Quantity") {
      setRequire("Quantity");
      setRequireValue("Không yêu cầu giá trị tối thiểu");
    } else if (e.target.value === "Amount") {
      setRequire("Amount");
      setRequireValue("Không yêu cầu giá trị tối thiểu");
    } else {
      setRequire("None");
      setMinimumMoney("");
      setRequireValue("Không yêu cầu giá trị tối thiểu");
    }
  };

  const onFieldsChange = (changedFields: any) => { };
  const onChangeEndDate = (e: CheckboxChangeEvent) => {
    setCheckedEndate(e.target.checked);
  };

  const onChangeLimit = (checkedValues: CheckboxValueType[]) => {
    if (
      checkedValues[0] === "LimitsTime" ||
      checkedValues[1] === "LimitsTime"
    ) {
      setHide(true);
    } else {
      setHide(false);
    }
    if (
      checkedValues[0] === "Limit1person" ||
      checkedValues[1] === "Limit1person"
    ) {
      setNumberUse("Mỗi người chỉ được sử dụng mã giảm giá này 1 lần");
    } else {
      setNumberUse("Không giới hạn số lần sử dụng");
    }
  };

  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  function generateString(length: number) {
    let result = " ";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    setGenerateCode(result.toUpperCase());
  }

  return (
    <WrapperCMSProduct>
      <Form
        name="basic"
        layout="vertical"
        form={form}
        onFieldsChange={onFieldsChange}
      >
        <Row gutter={[15, 15]}>
          <Col span={17}>
            <Box>
              <BoxHeader>
                <div>Số tiền đặt hàng</div>
                <ContenRight>Giảm giá</ContenRight>
              </BoxHeader>
              <BoxBody>
                <div className="option">Tùy chọn:</div>
                <Radio.Group
                  onChange={onChange}
                  value={value}
                  style={{ width: "100%", marginBottom: "15px" }}
                >
                  <Space direction="vertical">
                    <Radio value={1}>Giảm giá bằng Code</Radio>
                    <Radio value={2}>Giảm giá tự động</Radio>
                  </Space>
                </Radio.Group>
                <div style={{ marginBottom: "5px !important" }}>
                  <span>{title}</span>
                </div>
                <div>
                  {title === "Mã giảm giá" ? (
                    <Space
                      direction="horizontal"
                      style={{ width: "100%", marginBottom: "8px" }}
                    >
                      <Input
                        value={generateCode}
                        style={{ width: "100%" }}
                      ></Input>
                      <Button onClick={() => generateString(12)}>Tạo</Button>
                    </Space>
                  ) : (
                    <Form.Item name={"codeValue"}>
                      <Input
                        onChange={(value: any) => {
                          setCodeValue(value.target.value.toUpperCase());
                        }}
                        value={codeValue}
                        max={1}
                        placeholder="Tên mã giảm giá"
                        style={{ width: "50%", marginBottom: "8px" }}
                      ></Input>
                    </Form.Item>
                  )}
                </div>
                <div>
                  <p>{note}</p>
                </div>
              </BoxBody>
            </Box>
            <WrapProduct>
              <div className="title">Đơn vị</div>
              <Row gutter={[0, 0]}>
                <Col span={9}>
                  <Radio.Group
                    defaultValue="a"
                    onChange={onChangeUnit}
                    buttonStyle="solid"
                  >
                    <Radio.Button value="a">Theo phần trăm</Radio.Button>
                    <Radio.Button value="b">Theo số tiền</Radio.Button>
                  </Radio.Group>
                  <div></div>
                </Col>
                <Col span={15}>
                  <Input
                    suffix={unit}
                    onChange={(value: any) => {
                      setDiscount(value.target.value);
                    }}
                    type="number"
                  ></Input>
                </Col>
              </Row>
            </WrapProduct>

            <WrapProduct>
              <div className="title">Giá trị đơn hàng tối thiểu</div>
              <Radio.Group onChange={onchangeRequire}>
                <Space direction="vertical">
                  <Radio value={"None"}>Không yêu cầu</Radio>
                  <Radio value={"Amount"}>Số tiền mua tối thiểu</Radio>
                  {require === "Amount" ? (
                    <Input
                      onChange={(value: any) => {
                        setMinimumMoney(value.target.value);
                        if (value.target.value) {
                          setRequireValue(
                            "Yêu cầu số tiền tối thiểu là : " +
                            value.target.value +
                            "đ"
                          );
                        } else {
                          setRequireValue("Không yêu cầu giá trị tối thiểu");
                        }
                      }}
                      suffix={"đ"}
                    ></Input>
                  ) : null}
                  <Radio value={"Quantity"}>Số mặt hàng tối thiểu</Radio>
                  {require === "Quantity" ? (
                    <Input
                      onChange={(value: any) => {
                        setMinimumMoney(value.target.value);
                        if (value.target.value) {
                          setRequireValue(
                            "Yêu cầu số mặt hàng tối thiểu là : " +
                            value.target.value
                          );
                        } else {
                          setRequireValue("Không yêu cầu giá trị tối thiểu");
                        }
                      }}
                      type="number"
                      min={0}
                    ></Input>
                  ) : null}
                </Space>
              </Radio.Group>
            </WrapProduct>

            <WrapProduct>
              <div className="title">Số lần sử dụng</div>
              <Checkbox.Group onChange={onChangeLimit}>
                <Space direction="vertical">
                  <Checkbox value={"LimitsTime"}>
                    Giới hạn số lần sử dụng mã giảm giá
                  </Checkbox>
                  {hide ? (
                    <Input
                      onChange={(value: any) => {
                        setTimes(value.target.value);
                      }}
                    ></Input>
                  ) : null}
                  <Checkbox value={"Limit1person"}>
                    Giới hạn 1 lần sử dụng cho 1 người
                  </Checkbox>
                </Space>
              </Checkbox.Group>
            </WrapProduct>

            <WrapProduct>
              <div className="title">Thời gian khuyển mãi</div>
              <Row gutter={[30, 20]}>
                <Col span={12}>
                  <Space direction="vertical" style={{ width: "100%" }}>
                    <Form.Item label={"Ngày bắt đầu"} name={"StartDate"}>
                      <DatePicker
                        disabledDate={(current) => {
                          let customDate = moment()
                            .add(1, "days")
                            .format("YYYY-MM-DD");
                          return (
                            current &&
                            current < moment(customDate, "YYYY-MM-DD")
                          );
                        }}
                        onChange={(value: any) =>
                          setStartDate(moment(value).format("DD/MM/YYYY"))
                        }
                        placeholder="Ngày bắt đầu"
                        style={{ width: "100%" }}
                      />
                    </Form.Item>
                  </Space>
                </Col>
                <Col span={12}>
                  <Space direction="vertical" style={{ width: "100%" }}>
                    <Form.Item label={"Giờ bắt đầu"} name={"StartTime"}>
                      <DatePicker
                        placeholder="Giờ bắt đầu"
                        picker="time"
                        style={{ width: "100%" }}
                      />
                    </Form.Item>
                  </Space>
                </Col>
              </Row>
              <div style={{ marginTop: "10px" }}>
                <Checkbox onChange={onChangeEndDate}>
                  Thời gian kết thúc
                </Checkbox>
              </div>
              {checkedEndate ? (
                <Row gutter={[30, 20]}>
                  <Col span={12}>
                    <Space direction="vertical" style={{ width: "100%" }}>
                      <Form.Item label={"Ngày kết thúc"} name={"EndDate"}>
                        <DatePicker
                          disabledDate={(current) => {
                            let customDate = moment()
                              .add(1, "days")
                              .format("YYYY-MM-DD");
                            return (
                              current &&
                              current < moment(customDate, "YYYY-MM-DD")
                            );
                          }}
                          onChange={(value: any) =>
                            setEndDate(moment(value).format("DD/MM/YYYY"))
                          }
                          placeholder="Ngày kết thúc"
                          style={{ width: "100%" }}
                        />
                      </Form.Item>
                    </Space>
                  </Col>
                  <Col span={12}>
                    <Space direction="vertical" style={{ width: "100%" }}>
                      <Form.Item name={"EndTime"} label="Giờ kết thúc">
                        <DatePicker
                          placeholder="Giờ kết thúc"
                          picker="time"
                          style={{ width: "100%" }}
                        />
                      </Form.Item>
                    </Space>
                  </Col>
                </Row>
              ) : null}
            </WrapProduct>
          </Col>
          <Col span={7}>
            <WrapProduct>
              <div className="title">Chi tiết phiếu giảm giá</div>
              {generateCode && codeValue == "" ? (
                <div className="generateCode">{generateCode}</div>
              ) : codeValue && generateCode == "" ? (
                <div className="generateCode">{codeValue}</div>
              ) : (
                <div style={{ marginTop: "20px" }}>Chưa có mã giảm giá.</div>
              )}
              <div>
                <span
                  style={{
                    paddingBottom: "10px",
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                >
                  Loại và cách thức:
                </span>
                <div className="type">
                  <ul>
                    <li>Giảm giá cho đơn hàng</li>
                    <li>{title == "Mã giảm giá" ? "Code" : "Tự động"}</li>
                  </ul>
                </div>
              </div>
              <div>
                <div style={{ fontSize: "14px", fontWeight: "500" }}>
                  Chi tiết:
                </div>
                <ul>
                  {discount ? (
                    <li>
                      Giảm {discount} {unit} cho toàn bộ đơn hàng
                    </li>
                  ) : null}
                  <li>{requiedValue}</li>
                  <li>
                    {times > 0 && numberUse === "Không giới hạn số lần sử dụng"
                      ? `Giới hạn ${times} lần sử dụng`
                      : times > 0 &&
                        numberUse !== "Không giới hạn số lần sử dụng"
                        ? `Giới hạn ${times} lần sử dụng cho mỗi người`
                        : times < 0 && numberUse
                          ? numberUse
                          : numberUse}
                  </li>
                  {startDate && startDate !== "Invalid date" ? (
                    <li>Bắt đầu từ ngày: {startDate}</li>
                  ) : null}
                  {endDate && endDate !== "Invalid date" ? (
                    <li>Kết thúc vào ngày: {endDate}</li>
                  ) : null}
                </ul>
              </div>
            </WrapProduct>
          </Col>
        </Row>
        <Button>Lưu</Button>
      </Form>
    </WrapperCMSProduct>
  );
};
