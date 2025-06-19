import React, { useState } from "react";
import {
  ActionButton,
  AuthWrapper,
  Container,
  FormBox,
  FormSlide,
  ToggleButton,
} from "../../../styles/AuthStyled";
import AuthLayout from "../../../components/layout/auth-layout/auth-layout";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Form, Input, Typography } from "antd";

const { Title } = Typography;

const SignUp = () => {
  const [isRegistering, setIsRegistering] = useState(false);

  const onLogin = (values: any) => {
    console.log("Login:", values);
  };

  const onRegister = (values: any) => {
    console.log("Register:", values);
  };

  return (
    <Container>
      <ToggleButton onClick={() => setIsRegistering(!isRegistering)}>
        {isRegistering
          ? "Đã có tài khoản? Đăng nhập"
          : "Chưa có tài khoản? Đăng ký"}
      </ToggleButton>

      <AuthWrapper>
        <FormSlide isRegistering={isRegistering}>
          <FormBox>
            <Title level={2}>Đăng nhập</Title>
            <Form name="login" layout="vertical" onFinish={onLogin}>
              <Form.Item
                label="Tài khoản"
                name="username"
                rules={[
                  { required: true, message: "Vui lòng nhập tài khoản!" },
                ]}
              >
                <Input prefix={<UserOutlined />} placeholder="Tài khoản" />
              </Form.Item>

              <Form.Item
                label="Mật khẩu"
                name="password"
                rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Mật khẩu"
                />
              </Form.Item>

              <Form.Item>
                <ActionButton type="primary" htmlType="submit">
                  Đăng nhập
                </ActionButton>
              </Form.Item>
            </Form>
          </FormBox>

          <FormBox>
            <Title level={2}>Đăng ký</Title>
            <Form name="register" layout="vertical" onFinish={onRegister}>
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: "Vui lòng nhập email!" }]}
              >
                <Input prefix={<MailOutlined />} placeholder="Email" />
              </Form.Item>

              <Form.Item
                label="Tài khoản"
                name="username"
                rules={[
                  { required: true, message: "Vui lòng nhập tài khoản!" },
                ]}
              >
                <Input prefix={<UserOutlined />} placeholder="Tài khoản" />
              </Form.Item>

              <Form.Item
                label="Mật khẩu"
                name="password"
                rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Mật khẩu"
                />
              </Form.Item>

              <Form.Item>
                <ActionButton type="primary" htmlType="submit">
                  Đăng ký
                </ActionButton>
              </Form.Item>
            </Form>
          </FormBox>
        </FormSlide>
      </AuthWrapper>
    </Container>
  );
};
SignUp.Layout = AuthLayout;
export default SignUp;
