import { NextPageWithLayout } from "@/models/common";
import {
  WrapperCMSProduct,
  WrapProduct
} from "@/styles/CmsProductStylead";
import { useEffect, useState } from "react";
import { Button, Col, Form, Input, Row, Select } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { message, Upload } from "antd";
import { useAppDispatch } from "@/app/hooks";
import { ICreateEmployees } from "@/models/user";
// import { createEmployees, getConfigurations } from "@/features/user-slice";

const { Dragger } = Upload;
const props: UploadProps = {
  name: "file",
  multiple: true,
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
    }
    if (status === "done") {
      message.success({
        // content: t("EntityNotFoundException"),
        content: "Đăng nhập thành công",
        // content: localization.wh,
        className: "erroNotFound-class",
        style: {
          marginTop: "3vh",
        },
      });
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) { },
};

export const CreateEmployees: NextPageWithLayout = () => {
  const dispatch = useAppDispatch();
  const [ProvinceData, setProvinceData] = useState<[]>([]);
  const [provinceDistrict, setDistrictData] = useState<[]>([]);
  const [wardData, setWardData] = useState<[]>([]);
  const [form] = Form.useForm();
  const [checkDistrict, setCheckDistrict] = useState<boolean>(true);
  const [checkWard, setCheckWard] = useState<boolean>(true);
  const handleSubmit = (values: any) => {
    const payload: ICreateEmployees = {
      avatar: "oKALS",
      email: values.email,
      firsName: "Hoàng",
      lastName: "Chung",
      passWord: values.passWord,
      phoneNumber: values.phoneNumber,
      roleId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      userName: values.userName,
    };
    // dispatch(createEmployees(payload))
    //   .unwrap()
    //   .then()
    //   .then((res: any) => {
    //     message.success({
    //       content: "Tạo mới nhân viên thành công",
    //       className: "erroNotFound-class",
    //       style: {
    //         marginTop: "3vh",
    //       },
    //     });
    //   });
  };

  const onFieldsChange = (changedFields: any, allValues: any) => {
    if (changedFields && changedFields[0].name[0] === "City") {
      setCheckDistrict(false);
      form.setFieldsValue({
        District: "",
        Ward: "",
      });
      if (changedFields[0].value === undefined) {
        setWardData([]);
      }
      let payload: any = {};
      payload.$filter = `Context eq '${changedFields[0].value}'`;
      // dispatch(getConfigurations(payload))
      //   .unwrap()
      //   .then()
      //   .then((res: any) => {
      //     if (res) {
      //       setDistrictData(res.Payload);
      //     }
      //   });
    }
    if (changedFields && changedFields[0].name[0] === "District") {
      setCheckWard(false);
      let payload: any = {};
      form.setFieldsValue({
        Ward: "",
      });
      payload.$filter = `Context eq '${changedFields[0].value}'`;
      // dispatch(getConfigurations(payload))
      //   .unwrap()
      //   .then()
      //   .then((res: any) => {
      //     if (res) {
      //       setWardData(res.Payload);
      //     }
      //   });
    }
  };

  useEffect(() => {
    let payload: any = {};
    payload.$filter = `Context eq 'Province'`;
    // dispatch(getConfigurations(payload))
    //   .unwrap()
    //   .then()
    //   .then((res: any) => {
    //     if (res) {
    //       setProvinceData(res.Payload);
    //     }
    //   });
  }, [dispatch]);

  return (
    <WrapperCMSProduct>
      <Row>
        <Col span={10}></Col>
        <Col span={14}>
          <Form
            layout="vertical"
            onFinish={handleSubmit}
            onFieldsChange={onFieldsChange}
            form={form}
            scrollToFirstError
          >
            <WrapProduct>
              <Form.Item label="Password" name={"passWord"}>
                <Input placeholder="Password" />
              </Form.Item>
              <Form.Item label="Số điện thoại" name={"phoneNumber"}>
                <Input placeholder="Số điện thoại" />
              </Form.Item>
              <Form.Item label="Avartar" name={"avartar"}>
                <Dragger {...props}>
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">
                    Nhấn vào hoặc kéo thả ảnh bạn cần upload
                  </p>
                </Dragger>
              </Form.Item>
              <Button htmlType="submit">Thêm mơí</Button>
            </WrapProduct>
            <WrapProduct>
              <Form.Item label="Họ tên" name={"fullname"}>
                <Input placeholder="Họ tên" />
              </Form.Item>
              <Form.Item label="Số điện thoại" name={"phoneNumber"}>
                <Input placeholder="Số điện thoại" />
              </Form.Item>
              <Col xxl={24} xl={24} sm={24} xs={24}>
                <Row gutter={[16, 16]}>
                  <Col xxl={8} xl={8} sm={12} xs={24}>
                    <Form.Item name={"City"} label="Tỉnh thành">
                      <Select
                        showSearch
                        optionFilterProp="children"
                        dropdownStyle={{ minWidth: "20%", height: "100px" }}
                        allowClear
                        placeholder={"Tỉnh thành"}
                        filterOption={(input: string, option: any) =>
                          option.props.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0 ||
                          option.props.value
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        {ProvinceData &&
                          ProvinceData.map((item) => (
                            <Select.Option key={item["Id"]} value={item["Key"]}>
                              {item["Value"]}
                            </Select.Option>
                          ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col xxl={8} xl={8} sm={12} xs={24}>
                    <Form.Item name={"District"} label="Quận/Huyện">
                      <Select
                        showSearch
                        allowClear
                        placeholder={"Quận/Huyện"}
                        disabled={checkDistrict}
                        dropdownStyle={{ minWidth: "20%", height: "100px" }}
                        filterOption={(input: string, option: any) =>
                          option.props.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0 ||
                          option.props.value
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        {provinceDistrict &&
                          provinceDistrict.map((item) => (
                            <Select.Option key={item["Id"]} value={item["Key"]}>
                              {item["Value"]}
                            </Select.Option>
                          ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col xxl={8} xl={8} sm={12} xs={24}>
                    <Form.Item name={"Ward"} label="Phường/Xã">
                      <Select
                        showSearch
                        allowClear
                        placeholder={"Phường/Xã"}
                        dropdownStyle={{ minWidth: "20%", height: "100px" }}
                        disabled={checkWard}
                        filterOption={(input: string, option: any) =>
                          option.props.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0 ||
                          option.props.value
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        {wardData &&
                          wardData.map((item) => (
                            <Select.Option key={item["Id"]} value={item["Key"]}>
                              {item["Value"]}
                            </Select.Option>
                          ))}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item label="Địa chỉ cụ thể" name={"phoneNumber"}>
                  <Input placeholder="Địa chỉ cụ thể" />
                </Form.Item>
              </Col>
            </WrapProduct>
          </Form>
        </Col>
      </Row>
    </WrapperCMSProduct>
  );
};
