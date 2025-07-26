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
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
  getCategories,
  selectProduct,
  updateProduct,
} from "@/features/product-slice";
import {
  IProduct,
  IVariant,
  IOption,
  IImage,
  ICategory,
} from "@/models/product";
import axios from "axios";
import { useRouter } from "next/router";
import { getOptions, selectOption } from "@/features/option-slice";
import { number } from "framer-motion";
const { TextArea } = Input;
const { Option } = Select;

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const EditProduct = (props: IProduct) => {
  //#region states product
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [product, setProduct] = useState<IProduct>({ ...props });
  const { options } = useAppSelector(selectOption);
  const { categories } = useAppSelector(selectProduct);
  const [optionSearch, setOptionSearch] = useState<any[]>([]);
  const [option, setOption] = useState("");
  const [listOption, setListOption] = useState<IOption[]>([]);
  // Images
  const [indexEdit, setIndexEdit] = useState(0);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [imagesEdit, setImagesEdit] = useState<any>([]);
  const [Images, setImages] = useState<any>([]);
  //#endregion

  //#region Form
  const [form] = Form.useForm();
  const dataForm = [
    { name: ["Name"], value: product.Name },
    { name: ["Brand"], value: product.Brand },
    { name: ["Description"], value: product.Description },
    { name: ["Category"], value: product.Category },
    { name: ["Options"], value: product.Options },
    { name: ["ProductVariants"], value: product.ProductVariants },
  ];
  //#endregion

  //#region handlePreview Image
  const handleCancel = () => setPreviewOpen(false);

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

  const uploadFile = (options: any) => {
    const { onSuccess, onError, file } = options;
    if (file) {
      let formData = new FormData();
      let files = file;
      formData.append("media", files);
      // formData.append("key", "000027c23a82224c791a5fa2f82e5c9a");
      formData.append("key", "00046640ba0af46891224e838db8dbc6");
      axios
        .post("https://thumbsnap.com/api/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then(async (res) => {
          let dataImg = res.data.data;
          if (res.status == 200) {
            const fileImage: UploadFile = {
              uid: dataImg.id,
              name: "",
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
            setPreviewOpen(false);
          }
        });
    }
  };

  const setImageWithIndex = (prop: UploadFile) => {
    let images = Images;
    images[indexEdit] = [...images[indexEdit], prop];
    setImages(images);
    let newImageIndex = [...imagesEdit, prop];
    setImagesEdit(newImageIndex);
  };
  //#endregion

  //#region Custom methood
  const handleOnsubmit = (payload: any) => {
    payload.Id = product.Id;
    payload.Options = listOption;
    payload.ProductVariants.map((el: any, index: number) => {
      el.Images = Images[index];
    });
    var productVariants = payload.ProductVariants;
    productVariants.map((el: any, index: Number) => {
      el.OptionValues.map((option: any, indexOption: Number) => {
        var optionMap = payload.Options.find(
          (e: any) => e.Name === option.Name
        );
        option.OptionId = optionMap.Id;
      });
    });
    var category: any = categories.find(
      (e: any) => e.Name === payload.Category
    );
    payload.Category = category.Name;
    payload.CategoryId = category.Id;
    console.log(payload);
    
    dispatch(updateProduct(payload as IProduct))
      .unwrap()
      .then()
      .then((res: any) => {
        if (res.StatusCode === 200) {
          message.success({
            content: "Cập nhật thành công",
            className: "erroNotFound-class",
            style: {
              marginTop: "3vh",
            },
          });
        }
      });
  };

  const onCheck = () => {
    Images.map((el: any, index: Number) => {
      console.log(index, el.url);
    });
  };

  const handleSearch = (value: string) => {
    if (!value) {
      setOptionSearch([]);
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

  const addNewOptions = () => {
    var displayOrder = listOption.length;
    setListOption([
      ...listOption,
      { Name: option, DisplayOrder: displayOrder },
    ]);
    setOption("");
    form.resetFields(["InputOptionName"]);
    form.setFieldsValue({ InputOptionName: "" });
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

  const addNewVariant = () => {
    let productVariants = form.getFieldValue("ProductVariants");
    if (Images.length < productVariants.length) {
      setIndexEdit(Images.length);
      setImages([...Images, []]);
    }
    var formProduct = { ...product };
    var formProductVariant = form.getFieldValue("ProductVariants");
    formProductVariant[indexEdit] = {
      ...formProductVariant[indexEdit],
      Images: [],
    };
    formProduct.ProductVariants = formProductVariant;
    setProduct(formProduct);
  };

  const setIndexVariant = (index: number) => {
    let imageCurrentEdit = Images[index];
    setImagesEdit(imageCurrentEdit);
    setIndexEdit(index);
    console.log(imageCurrentEdit, Images, indexEdit);
  };
  //#endregion

  //#region useEffect
  // Fecth Categories
  useEffect(() => {
    if (categories.length === 0) {
      dispatch(getCategories());
    }
  }, [dispatch, categories]);
  // Fetch Options
  useEffect(() => {
    if (options.length === 0) {
      dispatch(getOptions());
    }
  }, [dispatch, options]);

  useEffect(() => {
    setImages([]);
    console.log("images clear");
    setListOption(product.Options);
    let imagesVariant: any = [];
    let dataImages: any = [];
    product.ProductVariants.map((variant: IVariant, indexVariant: number) => {
      imagesVariant = [];
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
    });
    setImages(dataImages);
  }, [product, props]);
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
                  {categories?.map((el: ICategory, index: number) =>
                    el.Type === 0 ? (
                      <Option key={el.Id} value={el.Id}>
                        {el.Name}
                      </Option>
                    ) : null
                  )}
                </Select>
              </Form.Item>
              <Form.Item label="Thương hiệu" name="Brand">
                <Select>
                  {categories?.map((el: ICategory, index: number) =>
                    el.Type === 2 ? (
                      <Option key={el.Id} value={el.Name}>
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
                  {listOption &&
                    listOption.map((el, index) => {
                      return (
                        <span
                          key={el.Name || index}
                          style={{
                            width: "15%",
                            display: "inline-block",
                            margin: "0px 15% 0px 15%",
                          }}
                        >
                          <span className="border" style={{ float: "left" }}>
                            <Tag>{el.Name}</Tag>
                          </span>
                          <span style={{ float: "right" }}>
                            <DeleteOutlined
                              style={{ paddingLeft: "15px" }}
                              onClick={() => handleRemoveOptions(index)}
                            />
                          </span>
                        </span>
                      );
                    })}
                </div>
                <Button className="addnew">Tạo chi tiết sản phẩm</Button>
              </WrapperOptions>
            </WrapProduct>
          </Col>
          <Col xs={24} sm={17} md={17} xxl={17} xl={17}>
            <Form.List name="ProductVariants">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name }) => {
                    return (
                      <WrapProduct
                        key={key}
                        onClick={() => setIndexVariant(key)}
                      >
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
                        <WrapProduct key={key}>
                          <div className="title">Media</div>
                          <BoxMedia>
                            <Upload
                              onPreview={handlePreview}
                              fileList={
                                indexEdit === key ? imagesEdit : Images[key]
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
                      onClick={() => {
                        add();
                        addNewVariant();
                      }}
                      block
                      icon={<PlusOutlined />}
                    >
                      Thêm sản phẩm
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </Col>
          <Col xs={24} sm={17} md={17} xxl={17} xl={17}>
            <Button htmlType="submit">Lưu chỉnh sửa</Button>
            <Button htmlType="button" onClick={() => onCheck()}>
              Check
            </Button>
          </Col>
        </Row>
      </Form>
    </WrapperCMSProduct>
  );
};
export default EditProduct;
