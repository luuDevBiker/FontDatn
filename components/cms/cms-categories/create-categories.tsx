import { WrapperCMSProduct, WrapProduct } from "@/styles/CmsProductStylead";
import { Button, Col, Form, Input, message, Row, Select } from "antd";
import { useAppDispatch } from "@/app/hooks";
import TextArea from "antd/lib/input/TextArea";
import { ICategory } from "@/models/product";
import { cateCategories } from "@/features/product-slice";

const CreateCategories = () => {
  const { Option } = Select;
  const dispatch = useAppDispatch();
  
  const handleOnsubmit = (payload: any) => {
    dispatch(cateCategories(payload as ICategory))
      .unwrap()
      .then()
      .then((res: any) => {
        if (res.StatusCode === 200) {
          message.success({
            content: "Thêm mới thành công",
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
      <Form name="basic" layout="vertical" onFinish={handleOnsubmit}>
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
export default CreateCategories;
