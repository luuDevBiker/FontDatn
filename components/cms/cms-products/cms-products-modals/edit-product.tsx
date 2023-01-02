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
import type { ColumnsType } from "antd/es/table";
import moment from "moment";
import { useAppDispatch } from "@/app/hooks";
import { addNewProduct } from "@/features/product-slice";
import { IProduct, IVariant, IOption, IImage } from "@/models/product";
import FormItem from "antd/es/form/FormItem";
import axios from "axios";
const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const EditProduct = (props: IProduct) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<Boolean>(true);
  //#region states product
  const [isOptions, setIsOptions] = useState(false);
  const [isProductVariant, setIsProductVriant] = useState(false);
  const [option, setOption] = useState("");
  const [listOption, setListOption] = useState<IOption[]>([]);
  //#endregion
  //#region state prevew images
  const [indexImgs, setIndexImgs] = useState(0);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [Images, setImages] = useState<any>([]);
  //#endregion
  //#region Form
  const [form] = Form.useForm();
  const { getFieldValue, setFieldValue, setFieldsValue } = form;
  const dataForm = [
    {
      name: ["Name"],
      value: props.Name,
    },
    { name: ["Brand"], value: props.Brand },
    { name: ["Description"], value: props.Description },
    { name: ["Category"], value: props.Category },
    { name: ["Options"], value: props.Options },
    { name: ["ProductVariants"], value: props.ProductVariants },
  ];

  //#region UseEffect
  useEffect(() => {
    setListOption(props.Options);
    let imagesVariant: any = [];
    let dataImages: any = [];
    props.ProductVariants.map((variant: IVariant, indexVariant: number) => {
      setIndexImgs(indexVariant);
      console.log(indexImgs);

      variant.Images.map(async (img: IImage, indexImg: number) => {
        const fileImage: UploadFile = {
          uid: img.Uid,
          name: img.Name,
          status: "done",
          url: img.Url,
        } as UploadFile;
        imagesVariant = [...imagesVariant, fileImage];
      });
      dataImages = [...dataImages, imagesVariant];
      imagesVariant = []
    });
    setImages(dataImages)
  }, [props]);
  console.log(Images);
  //#endregion
  //#endregion
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
  const handleCancel = () => setPreviewOpen(false);
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
  //#region Custom methood
  const handleOnsubmit = (payload: any) => {
    payload.Options = listOption;
    payload.ProductVariants.map((el: any, index: number) => {
      el.Images = Images[index];
    });
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
  return (
    <WrapperCMSProduct>
      <Form
        name="basic"
        layout="vertical"
        form={form}
        onFinish={handleOnsubmit}
        fields={dataForm}
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
          <Col xs={24} sm={17} md={17} xxl={17} xl={17}>
            <WrapProduct>
              <div className="title">Phân loại sản phẩm</div>
              <Form.Item label="Danh mục sản phẩm" name={"Category"}>
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

          {/* Product variants */}
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
                  {listOption &&
                    listOption.map((el, index) => {
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
                <Button onClick={onCreateVariant} className="addnew">
                  Tạo chi tiết sản phẩm
                </Button>
              </WrapperOptions>
            </WrapProduct>
          </Col>
          <Col xs={24} sm={17} md={17} xxl={17} xl={17}>
            <Form.List name="ProductVariants">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name }) => {
                    console.log(key);
                    
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
                                {listOption &&
                                  listOption.map((el, index) => {
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
            <Button htmlType="submit">Lưu chỉnh sửa</Button>
          </Col>
        </Row>
      </Form>
    </WrapperCMSProduct>
  );
};
export default EditProduct;
