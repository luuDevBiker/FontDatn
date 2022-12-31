import { NextPageWithLayout } from "@/models/common";
import {
  BoxMedia,
  OptionWrapp,
  WrapperCMSProduct,
  WrapperOptions,
  WrapProduct,
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
  InputNumber,
  Typography,
  Popconfirm,
} from "antd";
import React, { useEffect, useState } from "react";
import type { RcFile, UploadProps } from "antd/es/upload";
import type { UploadFile } from "antd/es/upload/interface";
import {
  MinusCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  FundFilled,
  PlusOutlined,
} from "@ant-design/icons";
import { Modal, Upload } from "antd";
import { AnyARecord } from "dns";
import { Color, OptionProduct } from "@/utils/common";
const { TextArea } = Input;
const { Option } = Select;
import type { CustomTagProps } from "rc-select/lib/BaseSelect";
// import QRCode from "react-qr-code";
import type { ColumnsType } from "antd/es/table";
import moment from "moment";
import Barcodes from "./generate-barcode";
import { useAppDispatch } from "@/app/hooks";
import { addNewProduct } from "@/features/product-slice";
import { IAddProduct, IVariant } from "@/models/product";
import FormItem from "antd/es/form/FormItem";
import axios from "axios";
const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

interface Option {
  Name: string;
  DisplayOrder: number;
}

const ItemInput = Input;

export const CreateProduct: NextPageWithLayout = () => {
  //#region states product
  const [isOptions, setIsOptions] = useState(false);
  const [isProductVariant, setIsProductVriant] = useState(false);
  const [option, setOption] = useState("");
  const [listOption, setListOption] = useState<Option[]>([]);
  //#endregion

  //#region state prevew images
  const [indexImgs, setIndexImgs] = useState(0);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [Images, setImages] = useState<any>([]);
  //#endregion

  const handleCancel = () => setPreviewOpen(false);
  const [form] = Form.useForm();
  const { getFieldValue, setFieldValue } = form;
  const dispatch = useAppDispatch();

  //#region handlePreview Image
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
    );
  };
  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);
  const uploadFile = (options: any) => {
    const { onSuccess, onError, file } = options;
    if (file) {
      let formData = new FormData();
      let files = file;
      formData.append("media", files);
      formData.append("key", "000027c23a82224c791a5fa2f82e5c9a");
      axios
        .post("https://thumbsnap.com/api/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then(async (res) => {
          console.log(res);

          let dataImg = res.data.data;
          if (res.status == 200) {
            const fileImage: UploadFile = {
              uid: dataImg.id,
              name: file.fileName,
              status: "done",
              url: dataImg.media,
            } as UploadFile;
            await setImageWithIndex(fileImage);
          } else {
            message.error({
              content: "Thêm ảnh lỗi",
              className: "erroNotFound-class",
              style: {
                marginTop: "3vh",
              },
            });
          }
        });
    }
  };

  const setImageWithIndex = (prop: UploadFile) => {
    if (indexImgs + 1 > Images.length) {
      let images = [...Images, [prop]];
      setImages([...images]);
      setFileList([...fileList, prop]);
    } else {
      let images = Images;
      images[indexImgs] = [...images[indexImgs], prop];
      setImages(images);
      setFileList([...fileList, prop]);
    }
  };

  const setIndex = (index: number) => {
    Images[index] === undefined ? setFileList([]) : setFileList(Images[index]);
    setIndexImgs(index);
  };
  //#endregion
  //#region Utilities method

  const string2 = moment().format("DD/MM/YY");
  const generateDay = string2.split("/", 3);
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  //#endregion
  //#region Chuyển tiếng việt qua tiếng anh
  function removeVietnameseTones(str: string) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
    // Remove extra spaces
    // Bỏ các khoảng trắng liền nhau
    str = str.replace(/ + /g, " ");
    str = str.trim();
    // Remove punctuations
    // Bỏ dấu câu, kí tự đặc biệt
    str = str.replace(
      /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
      " "
    );
    return str;
  }
  //#endregion
  //#region Custom methood
  const handleOnsubmit = (payload: any) => {
    payload.Options = listOption;
    payload.ProductVariants.map((el: any, index: number) => {
      el.Images = Images[index];
    });
    console.log(payload);

    dispatch(addNewProduct(payload))
      .unwrap()
      .then()
      .then((res: any) => {});
  };
  //#region Options
  const addNewOptions = () => {
    form.setFieldsValue({ InputOptionName: "" });
    var displayOrder = listOption.length;
    setListOption([
      ...listOption,
      { Name: option, DisplayOrder: displayOrder },
    ]);
    setOption("");
  };
  const onChangeInputOptionName = (e: any) => {
    let value = e.target.value;
    value !== "" ? setOption(value) : console.log(e);
  };
  const handleRemoveOptions = (index: number) => {
    const list = [...listOption];
    list.splice(index, 1);
    setListOption(list);
  };
  //#endregion
  //#region Variant
  const onCreateVariant = () => {
    setIsProductVriant(true);
  };
  //#endregion
  //#endregion
  //#region UseEffect
  useEffect(() => {}, []);
  //#endregion
  return (
    <WrapperCMSProduct>
      <Form
        name="basic"
        layout="vertical"
        form={form}
        onFinish={handleOnsubmit}
      >
        <Row gutter={[25, 25]}>
          <Col xs={24} sm={17} md={17} xxl={17} xl={17}>
            <WrapProduct>
              {/* Product Name */}
              <Form.Item
                label="Tên sản phẩm"
                name={"Name"}
                rules={[
                  {
                    required: true,
                    message: "Tên sản phẩm không được để trống!",
                  },
                ]}
              >
                <Input placeholder="Tên sản phẩm"></Input>
              </Form.Item>
              {/* Product Description */}
              <Form.Item
                label="Mô tả"
                required
                name={"Description"}
                rules={[
                  {
                    required: true,
                    message:
                      "Thêm mô tả cho sản phẩm để khách hàng dễ tìm kiếm",
                  },
                ]}
              >
                <TextArea placeholder="Mô tả"></TextArea>
              </Form.Item>
            </WrapProduct>
          </Col>
          <Col span={7}>
            <WrapProduct>
              <div className="title">Phân loại sản phẩm</div>
              <Form.Item label="Danh mục sản phẩm" name={"Categoty"}>
                <Select>
                  <Option value="LAP-TOP">LAP TOP</Option>
                  <Option value="PC-GAMMING">PC GAMMING</Option>
                  <Option value="PC-DO-HOA">PC ĐỒ HỌA</Option>
                </Select>
              </Form.Item>
              <Form.Item label="Thương hiệu" name="Brand">
                <Select>
                  <Option value="ACER">ACER</Option>
                  <Option value="SAMSUNG">SAMSUNG</Option>
                  <Option value="ASUS">ASUS</Option>
                  <Option value="APLE">APLE</Option>
                  <Option value="KINGDOM">KINGDOM</Option>
                  <Option value="INTEL">INTEL</Option>
                  <Option value="AMD">AMD</Option>
                </Select>
              </Form.Item>
            </WrapProduct>
          </Col>
          {isOptions ? (
            <></>
          ) : (
            <Col span={5} onClick={() => setIsOptions(true)}>
              <Button>Thêm thuộc tính cho sản phẩm</Button>
            </Col>
          )}

          {/* Product variants */}

          {
            isOptions ? (
              //#region create options
              <Col xs={24} sm={17} md={17} xxl={17} xl={17}>
                <WrapProduct>
                  <WrapperOptions>
                    <OptionWrapp>
                      <div className="border">
                        <Form.Item label="Tên thuộc tính">
                          <Input
                            name={"InputOptionName"}
                            value={option}
                            onChange={onChangeInputOptionName}
                            placeholder="Hãy nhập tên thuộc tính : ( Ram, CPU, MainBoard...) "
                          />
                        </Form.Item>
                      </div>
                      <div className="btn-box">
                        <PlusOutlined
                          onClick={addNewOptions}
                          style={{ marginLeft: "6px" }}
                        />
                      </div>
                    </OptionWrapp>
                    <div>
                      {listOption.map((el, index) => {
                        return (
                          <OptionWrapp>
                            <div className="border">
                              <Tag>{el.Name}</Tag>
                            </div>
                            <div>
                              {
                                <DeleteOutlined
                                  style={{ paddingLeft: "15px" }}
                                  onClick={() => handleRemoveOptions(index)}
                                />
                              }
                            </div>
                          </OptionWrapp>
                        );
                      })}
                    </div>
                    {!isProductVariant ? (
                      <Button onClick={onCreateVariant} className="addnew">
                        Tạo chi tiết sản phẩm
                      </Button>
                    ) : (
                      <></>
                    )}
                  </WrapperOptions>
                </WrapProduct>
              </Col>
            ) : (
              <></>
            )
            //#endregion
          }
          {isProductVariant ? (
            <Col xs={24} sm={17} md={17} xxl={17} xl={17}>
              <Form.List name="ProductVariants">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name }) => {
                      return (
                        <WrapProduct>
                          <Form.Item
                            label="Giá nhập"
                            name={[name, "ImportPrice"]}
                            rules={[
                              {
                                required: true,
                                message: "Giá nhập không được để trống",
                              },
                            ]}
                          >
                            <Input placeholder="Điền giá nhập của sản phẩm" />
                          </Form.Item>
                          <Form.Item
                            label="Giá bán"
                            name={[name, "Price"]}
                            rules={[
                              {
                                required: true,
                                message: "Giá bán không được để trống",
                              },
                            ]}
                          >
                            <Input placeholder="Điền giá bán của sản phẩm" />
                          </Form.Item>
                          <Form.Item
                            label="Số lượng"
                            name={[name, "Quantity"]}
                            rules={[
                              {
                                required: true,
                                message: "Số lượng không được để trống",
                              },
                            ]}
                          >
                            <Input placeholder="Điền số lượng của sản phẩm" />
                          </Form.Item>
                          <Form.List name={[name, "OptionValues"]}>
                            {() => {
                              return (
                                <Col span={50}>
                                  {listOption.map((el, index) => {
                                    return (
                                      <div key={index}>
                                        {el.Name}
                                        <Form.Item
                                          hidden
                                          name={[index, "DisplayOrder"]}
                                          initialValue={el.DisplayOrder}
                                        ></Form.Item>
                                        <Form.Item
                                          hidden
                                          name={[index, "Name"]}
                                          initialValue={el.Name}
                                        ></Form.Item>
                                        <Form.Item name={[index, "Value"]}>
                                          <Input placeholder="Value" />
                                        </Form.Item>
                                      </div>
                                    );
                                  })}
                                </Col>
                              );
                            }}
                          </Form.List>
                          <WrapProduct key={key} onClick={() => setIndex(key)}>
                            <div className="title">Media</div>
                            <BoxMedia>
                              <Upload
                                onPreview={handlePreview}
                                onChange={handleChange}
                                fileList={
                                  indexImgs == key ? fileList : Images[key]
                                }
                                listType="picture-card"
                                customRequest={uploadFile}
                                className="upload-list-inline"
                                name="file"
                                multiple
                              >
                                <div>
                                  <PlusOutlined />
                                  <div style={{ marginTop: 8 }}>Upload</div>
                                </div>
                              </Upload>
                              <Modal
                                open={previewOpen}
                                title={previewTitle}
                                footer={null}
                                onCancel={handleCancel}
                              >
                                <img
                                  alt="example"
                                  style={{ width: "100%" }}
                                  src={previewImage}
                                />
                              </Modal>
                            </BoxMedia>
                          </WrapProduct>
                          <MinusCircleOutlined onClick={() => remove(name)} />
                        </WrapProduct>
                      );
                    })}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                      >
                        Thêm sản phẩm
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
              <Button htmlType="submit">Lưu</Button>
            </Col>
          ) : (
            <></>
          )}
        </Row>
      </Form>
    </WrapperCMSProduct>
  );
};
