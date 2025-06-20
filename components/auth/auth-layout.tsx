import React, { useState } from "react";
import {
  ActionButton,
  AuthWrapper,
  Container,
  ContainerAuth,
  FormBox,
  FormSlide,
  ToggleButton,
  WhiteTitle,
} from "../../styles/AuthStyled";
import AuthLayout from "../../components/layout/auth-layout/auth-layout";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Checkbox, Form, Input, Typography, message } from "antd";
import { useRouter } from "next/router";
import { userSignIn } from "@/features/user-slice";
import { useAppDispatch } from "@/app/hooks";
import jwt_decode from "jwt-decode";
type Mode = "login" | "register" | "otp" | "forgot";

const SignInSignUp = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [mode, setMode] = useState<Mode>("login");

  const onLogin = (values: any) => {
    console.log(values);
    if (!values.username || !values.password) {
      message.error("Vui lòng nhập đầy đủ thông tin đăng nhập");
      return;
    }

    dispatch(userSignIn(values))
      .unwrap()
      .then((res: any) => {
        var tokeDecode: any = jwt_decode(res.AccessToken);
        let role =
          tokeDecode[
            "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
          ];
        if (role === "Users") {
          router.push("/");
        } else {
          router.push("/cms/cms-dashboard");
        }
      });
  };

  const onRegister = (values: any) => {
    if (values.password !== values.confirmPassword) {
      message.error("Mật khẩu xác nhận không khớp!");
      return;
    }
    console.log("Register:", values);
    setMode("otp");
  };

  const onVerifyOtp = (values: any) => {
    if (!values.otp) {
      message.error("Vui lòng nhập mã OTP");
      return;
    }
    console.log("OTP xác nhận:", values.otp);
    message.success("Đăng ký thành công!");
    setMode("login");
  };

  const onForgotPassword = (values: any) => {
    if (!values.email) {
      message.error("Vui lòng nhập email để khôi phục mật khẩu");
      return;
    }
    console.log("Khôi phục mật khẩu gửi email:", values);
    message.success("Mã xác nhận đã được gửi đến email của bạn");
    setMode("otp");
  };

  return (
    <Container>
      <ToggleButton
        onClick={() => setMode(mode === "login" ? "register" : "login")}
      >
        {mode === "register"
          ? "Đã có tài khoản? Đăng nhập"
          : "Chưa có tài khoản? Đăng ký"}
      </ToggleButton>
      <ContainerAuth>
        <AuthWrapper>
          <FormSlide isRegistering={mode !== "login"}>
            {/* LOGIN FORM */}
            <FormBox>
              <WhiteTitle level={2}>Đăng nhập</WhiteTitle>
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
                  rules={[
                    { required: true, message: "Vui lòng nhập mật khẩu!" },
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined />}
                    placeholder="Mật khẩu"
                  />
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked">
                  <Checkbox>Nhớ mật khẩu</Checkbox>
                </Form.Item>

                <Form.Item>
                  <ActionButton htmlType="submit">Đăng nhập</ActionButton>
                </Form.Item>

                <Form.Item>
                  <a
                    onClick={() => setMode("forgot")}
                    style={{ cursor: "pointer" }}
                  >
                    Quên mật khẩu?
                  </a>
                </Form.Item>
              </Form>
            </FormBox>

            {/* OTHER FORM BOX */}
            <FormBox>
              {mode === "register" && (
                <>
                  <WhiteTitle level={2}>Đăng ký</WhiteTitle>
                  <Form name="register" layout="vertical" onFinish={onRegister}>
                    <Form.Item
                      label="Tài khoản"
                      name="username"
                      rules={[
                        { required: true, message: "Vui lòng nhập tài khoản!" },
                      ]}
                    >
                      <Input
                        prefix={<UserOutlined />}
                        placeholder="Tài khoản"
                      />
                    </Form.Item>

                    <Form.Item
                      label="Mật khẩu"
                      name="password"
                      rules={[
                        { required: true, message: "Vui lòng nhập mật khẩu!" },
                      ]}
                    >
                      <Input.Password
                        style={{
                          outline: "none",
                          boxShadow: "none", // loại bỏ shadow xanh
                          borderColor: "#ccc", // tùy chọn
                        }}
                        prefix={<LockOutlined />}
                        placeholder="Mật khẩu"
                      />
                    </Form.Item>

                    <Form.Item
                      label="Xác nhận mật khẩu"
                      name="confirmPassword"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng xác nhận mật khẩu!",
                        },
                      ]}
                    >
                      <Input.Password
                        prefix={<LockOutlined />}
                        placeholder="Xác nhận mật khẩu"
                      />
                    </Form.Item>

                    <Form.Item>
                      <ActionButton>Đăng ký</ActionButton>
                    </Form.Item>
                  </Form>
                </>
              )}

              {mode === "otp" && (
                <>
                  <WhiteTitle level={2}>Xác thực OTP</WhiteTitle>
                  <Form
                    name="otpVerify"
                    layout="vertical"
                    onFinish={onVerifyOtp}
                  >
                    <Form.Item
                      label="Nhập mã OTP gửi qua email"
                      name="otp"
                      rules={[
                        { required: true, message: "Vui lòng nhập mã OTP!" },
                      ]}
                    >
                      <Input placeholder="Mã OTP" />
                    </Form.Item>

                    <Form.Item>
                      <ActionButton>Xác nhận</ActionButton>
                    </Form.Item>
                  </Form>
                </>
              )}

              {mode === "forgot" && (
                <>
                  <WhiteTitle level={2}>Quên mật khẩu</WhiteTitle>
                  <Form
                    name="forgot"
                    layout="vertical"
                    onFinish={onForgotPassword}
                  >
                    <Form.Item
                      label="Số điện thoại"
                      name="PnoneMumber"
                      rules={[
                        { required: true, message: "Vui lòng nhập email!" },
                      ]}
                    >
                      <Input
                        prefix={<MailOutlined />}
                        placeholder="số điện thoại đăng nhập"
                      />
                    </Form.Item>

                    <Form.Item>
                      <ActionButton>Gửi mã xác nhận</ActionButton>
                    </Form.Item>

                    <Form.Item>
                      <a
                        onClick={() => setMode("login")}
                        style={{ cursor: "pointer" }}
                      >
                        ← Quay lại đăng nhập
                      </a>
                    </Form.Item>
                  </Form>
                </>
              )}
            </FormBox>
          </FormSlide>
        </AuthWrapper>
      </ContainerAuth>
    </Container>
  );
};
SignInSignUp.Layout = AuthLayout;
export default SignInSignUp;
