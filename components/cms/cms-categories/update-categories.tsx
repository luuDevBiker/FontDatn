import { WrapperCMSProduct, WrapProduct } from "@/styles/CmsProductStylead";
import { useAppDispatch } from "@/app/hooks";
import { ICategory } from "@/models/product";
import { updateCategories } from "@/features/product-slice";
import { Button, Form, Input, message, Row, Col, Select } from "antd";
import TextArea from "antd/lib/input/TextArea";

const UpdateCategories = (props: ICategory) => {
  const { Option } = Select;
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const dataForm = [
    { name: ["Name"], value: props.Name },
    { name: ["Type"], value: props.Type },
    { name: ["Description"], value: props.Description },
  ];

  const handleOnsubmit = (payload: any) => {
    payload.Id = props.Id;
    dispatch(updateCategories(payload as ICategory))
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
              <Form.Item label="Danh mục sản phẩm" name={"Type"}>
                <Select>
                  <Option value={0}>Loại Sản Phẩm</Option>
                  <Option value={1}>Danh Mục</Option>
                  <Option value={2}>Thương Hiệu</Option>
                </Select>
              </Form.Item>
            </WrapProduct>
          </Col>
        </Row>
        <Button htmlType="submit">Lưu chỉnh sửa</Button>
      </Form>
    </WrapperCMSProduct>
  );
};
export default UpdateCategories;
