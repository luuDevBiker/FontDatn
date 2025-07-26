import { NextPageWithLayout } from "@/models/common";
import {
  BoxMedia,
  OptionWrapp,
  WrapperCMSProduct,
  WrapperOptions,
  WrapProduct,
} from "@/styles/CmsProductStylead";
import {
  AutoComplete,
  Button,
  Form,
  Input,
  message,
  Row,
  Col,
  Select,
  Tag,
  Image,
} from "antd";
import { useEffect, useState } from "react";
import type { RcFile, UploadProps } from "antd/es/upload";
import type { UploadFile } from "antd/es/upload/interface";
import {
  MinusCircleOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Modal, Upload } from "antd";
import moment from "moment";
import { useAppDispatch } from "@/app/hooks";
import { addNewProduct, getCategories } from "@/features/product-slice";
import { getOptions } from "@/features/option-slice";
import axios from "axios";
import { ICategory } from "@/models/product";
const { TextArea } = Input;
const { Option } = Select;
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
  const [isProductVariant, setIsProductVriant] = useState(false);
  const [option, setOption] = useState("");
  const [listOption, setListOption] = useState<Option[]>([]);
  const [options, setOptions] = useState<any[]>([]);
  const [optionSearch, setOptionSearch] = useState<any[]>([]);
  //#endregion

  //#region state prevew images
  const [indexImgs, setIndexImgs] = useState(0);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [Images, setImages] = useState<any>([]);
  const [categories, setCategories] = useState<any>([]);
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
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
  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    if (indexImgs + 1 > Images.length) {
      let images = [...Images, []];
      setImages([...images]);
    }
  };
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
        .then((res) => {
          let dataImg = res.data.data;

          if (res.status == 200) {
            const fileImage: UploadFile = {
              uid: dataImg.id,
              name: file.fileName,
              status: "done",
              url: dataImg.media,
            } as UploadFile;
            setImageWithIndex(fileImage);
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

  const setImageWithIndex = async (prop: UploadFile) => {
    setTimeout(() => {
      if (indexImgs + 1 > Images.length) {
        let images = [...Images, [prop]];
        setImages([...images]);
        setFileList([...fileList, prop]);
        console.log(images);
      } else {
        let images = Images;
        images[indexImgs] = [...images[indexImgs], prop];
        setImages(images);
        setFileList([...fileList, prop]);
        console.log(images);
      }
    }, 2000);
  };

  const setIndex = (index: number) => {
    Images[index] === undefined ? setFileList([]) : setFileList(Images[index]);
    setIndexImgs(index);
  };
  //#endregion

  //#region Utilities method

  //#endregion

  //#region Custom methood
  const handleCancel = () => setPreviewOpen(false);

  const handleOnsubmit = (payload: any) => {
    if (!payload.ProductVariants) {
      message.warning({
        content: "Chưa thêm chi tiểt sản phẩm !",
        duration: 3,
        style: {
          marginTop: "3vh",
        },
      });
      return;
    }
    payload.Options = listOption;
    payload.ProductVariants.map((el: any, index: number) => {
      el.Images = Images[index];
    });
    var category = categories.find((e: any) => e.Id === payload.Category);
    payload.Category = category.Name;
    payload.CategoryId = category.Id;
    console.log(payload);

    // dispatch(addNewProduct(payload))
    //   .unwrap()
    //   .then((res: any) => {
    //     if (res.StatusCode === 200) {
    //       message.success({ content: "Tạo sản phẩm thành công", duration: 2 });
    //       form.resetFields();
    //       setIndex(-1);
    //       setListOption([]);
    //       setImages([]);
    //     } else {
    //       message.error({
    //         content: "Tạo sản phẩm thất bại",
    //         duration: 2,
    //         style: {
    //           marginTop: "3vh",
    //         },
    //       });
    //     }
    //   });
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
    value !== "" ? setOption(value) : console.log();
  };
  const handleRemoveOptions = (index: number) => {
    const list = [...listOption];
    list.splice(index, 1);
    setListOption(list);
  };
  //#endregion
  //#region Variant
  const onCreateVariant = () => {
    if (listOption.length === 0) {
      message.warning({
        content: "Chưa thêm thuộc tính !",
        duration: 3,
        style: {
          marginTop: "3vh",
        },
      });
      return;
    }
    setIsProductVriant(true);
  };
  //#endregion

  //#endregion

  //#region useEffect
  useEffect(() => {
    if (categories.length === 0) {
      dispatch(getCategories())
        .unwrap()
        .then((res: any) => {
          setCategories(res.Payload);
        });
    }
    if (options.length === 0) {
      dispatch(getOptions())
        .unwrap()
        .then((res: any) => {
          setOptions(res.Payload);
        });
    }
  }, [dispatch]);
  //#endregion

  // Hàm xử lý khi người dùng gõ
  const handleSearch = (value: string) => {
    if (!value) {
      setOptions([]);
      return;
    }

    const optionFilter = options.filter((item) =>
      item.Name.toLowerCase().includes(value.toLowerCase())
    );
    setOptionSearch(optionFilter.map((val) => ({ value: val.Name })));
  };

  const onSelect = (value: string) => {
    form.setFieldsValue({ InputOptionName: value });
    setOption(value);
  };

  //#region Html Layout

  if (categories.length === 0) {
    return <></>;
  }
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
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Thêm loại sản phẩm phân loại sản phẩm",
                  },
                ]}
                label="Danh mục sản phẩm"
                name={"Category"}
              >
                <Select>
                  {categories?.map((el: ICategory, index: number) =>
                    el.Type === 0 ? (
                      <Option key={el.Id} value={el.Id}>
                        {el.Name}
                      </Option>
                    ) : null
                  )}
                </Select>
              </Form.Item>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Thêm thương hiệu sản phẩm phân loại sản phẩm",
                  },
                ]}
                label="Thương hiệu"
                name="Brand"
              >
                <Select>
                  {categories?.map((el: ICategory, index: number) =>
                    el.Type === 2 ? (
                      <Option key={el.Id} value={el.Id}>
                        {el.Name}
                      </Option>
                    ) : null
                  )}
                </Select>
              </Form.Item>
            </WrapProduct>
          </Col>
          <Col xs={24} sm={17} md={17} xxl={17} xl={17}>
            <WrapProduct>
              <WrapperOptions>
                <OptionWrapp>
                  <div className="border">
                    <Form.Item label="Tên thuộc tính">
                      <AutoComplete
                        options={optionSearch}
                        onSearch={handleSearch}
                        onKeyDown={(event) => {
                          if (event.key === "Enter") {
                            addNewOptions();
                          }
                        }}
                        onSelect={onSelect}
                        style={{ width: "100%" }}
                      >
                        <Input
                          name={"InputOptionName"}
                          value={option}
                          onChange={onChangeInputOptionName}
                          onKeyDown={(event) => {
                            if (event.key === "Enter") {
                              addNewOptions();
                            }
                          }}
                          placeholder="Hãy nhập tên thuộc tính : ( Ram, CPU, MainBoard...) "
                        />
                      </AutoComplete>
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
                      <OptionWrapp key={el.Name || index}>
                        <div className="border">
                          <Tag>{el.Name}</Tag>
                        </div>
                        <div>
                          <DeleteOutlined
                            style={{ paddingLeft: "15px" }}
                            onClick={() => handleRemoveOptions(index)}
                          />
                        </div>
                      </OptionWrapp>
                    );
                  })}
                </div>
                {listOption.length > 0 ? (
                  <Button onClick={onCreateVariant} className="addnew">
                    Tạo chi tiết sản phẩm
                  </Button>
                ) : (
                  <></>
                )}
              </WrapperOptions>
            </WrapProduct>
          </Col>
          {isProductVariant ? (
            <Col xs={24} sm={17} md={17} xxl={17} xl={17}>
              <Form.List name="ProductVariants">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name }) => {
                      return (
                        <WrapProduct key={key}>
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
                            {() => (
                              <Col span={50}>
                                {listOption.map((el, index) => (
                                  <div key={index}>
                                    {el.Name}
                                    <Form.Item
                                      hidden
                                      name={[index, "DisplayOrder"]}
                                      initialValue={el.DisplayOrder}
                                    />
                                    <Form.Item
                                      hidden
                                      name={[index, "Name"]}
                                      initialValue={el.Name}
                                    />
                                    <Form.Item name={[index, "Value"]}>
                                      <Input placeholder="Value" />
                                    </Form.Item>
                                  </div>
                                ))}
                              </Col>
                            )}
                          </Form.List>

                          <WrapProduct onClick={() => setIndex(key)}>
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
                                visible={previewOpen}
                                title={previewTitle}
                                footer={null}
                                onCancel={handleCancel}
                              >
                                <Image
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
  //#endregion
};
