import { useState } from "react";
import {
  ActionButton,
  AuthWrapper,
  Container,
  ContainerAuth,
  FormBox,
  FormSlide,
  SmallButton,
  ToggleButton,
  WhiteTitle,
} from "../../styles/AuthStyled";
import AuthLayout from "../../components/layout/auth-layout/auth-layout";
import {
  LockOutlined,
  MobileOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Checkbox, Form, Input, InputNumber, message } from "antd";
import { useRouter } from "next/router";
import {
  userSignIn,
  userRegister,
  selectUser,
  userConfirmOtp,
  userForgotPassword,
} from "@/features/user-slice";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import jwt_decode from "jwt-decode";
import { error, log } from "console";
type Mode = "login" | "register" | "otp" | "forgot";

const SignInSignUp = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [mode, setMode] = useState<Mode>("login");
  const [numberPhone, setNumberPhone] = useState<any>("");
  const { register } = useAppSelector(selectUser);
  const onLogin = (values: any) => {
    console.log(values);
    if (!values.UserName || !values.Password) {
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
      })
      .catch((error) => {
        if (
          error.StatusCode === 500 &&
          error.Message === "You need confirm otp"
        ) {
          setMode("otp");
          setNumberPhone(values.UserName);
        }
      });
  };

  const onRegister = (values: any) => {
    if (values.password !== values.confirmPassword) {
      message.error("Mật khẩu xác nhận không khớp!");
      return;
    }
    values.LanguageCode = "vi-VN";
    dispatch(userRegister(values))
      .unwrap()
      .then((res: any) => {
        setMode("otp");
      });
  };

  const onVerifyOtp = (values: any) => {
    if (!values.Otp) {
      message.error("Vui lòng nhập mã OTP");
      return;
    }
    values.PhoneNumber = register.PhoneNumber
      ? register.PhoneNumber
      : numberPhone;
    values.OtpType = 0;
    dispatch(userConfirmOtp(values))
      .unwrap()
      .then((res: any) => {
        console.log(res);

        message.success("Đăng ký thành công!");
        setMode("login");
      });
  };

  const onForgotPassword = (values: any) => {
    if (!values.PhoneNumber) {
      message.error("Vui lòng nhập số điện thoại để khôi phục mật khẩu");
      return;
    }
    if (values.NewPassword !== values.ConfirmPassword) {
      message.error("Mật khẩu không giống nhau");
      return;
    }
    if (!values.Otp || values.Otp.length < 6) {
      message.error("Sai định dạng OTP");
      return;
    }
    values.Otp = `${values.Otp}`;
    values.OtpType = 0;
    dispatch(userForgotPassword(values))
      .unwrap()
      .then((res: any) => {
        console.log(res);
        if (res.StatusCode === 200) {
          message.success("Khôi phục tài khoản thành công");
          setMode("login");
        }
      });
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
            {/* SignIn */}
            <FormBox>
              <WhiteTitle level={2}>Đăng nhập</WhiteTitle>
              <Form name="login" layout="vertical" onFinish={onLogin}>
                <Form.Item
                  name="UserName"
                  rules={[
                    { required: true, message: "Vui lòng nhập tài khoản!" },
                  ]}
                >
                  <Input prefix={<UserOutlined />} placeholder="Tài khoản" />
                </Form.Item>

                <Form.Item
                  name="Password"
                  rules={[
                    { required: true, message: "Vui lòng nhập mật khẩu!" },
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined />}
                    placeholder="Mật khẩu"
                  />
                </Form.Item>
                <Form.Item>
                  <ActionButton htmlType="submit">Đăng nhập</ActionButton>
                </Form.Item>
                <Form.Item>
                  <a
                    onClick={() => setMode("forgot")}
                    style={{ cursor: "pointer", color: "white" }}
                  >
                    Quên mật khẩu?
                  </a>
                </Form.Item>
              </Form>
            </FormBox>
            {/* Register */}
            <FormBox>
              {mode === "register" && (
                <>
                  <WhiteTitle level={2}>Đăng ký</WhiteTitle>
                  <Form name="register" layout="vertical" onFinish={onRegister}>
                    <Form.Item
                      name="DisplayName"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập số điện thoại!",
                        },
                      ]}
                    >
                      <Input
                        prefix={<UserOutlined />}
                        placeholder="Tài khoản"
                      />
                    </Form.Item>
                    <Form.Item
                      name="UserName"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập số điện thoại!",
                        },
                      ]}
                    >
                      <Input
                        prefix={<UserOutlined />}
                        placeholder="Tài khoản"
                      />
                    </Form.Item>
                    <Form.Item
                      name="Password"
                      rules={[
                        { required: true, message: "Vui lòng nhập mật khẩu!" },
                      ]}
                    >
                      <Input.Password
                        prefix={<LockOutlined />}
                        placeholder="Mật khẩu"
                      />
                    </Form.Item>
                    <Form.Item
                      name="ConfirmPassword"
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
                      <ActionButton htmlType="submit">Đăng ký</ActionButton>
                    </Form.Item>
                  </Form>
                </>
              )}
              {/* region Confirm OTP */}
              {mode === "otp" && (
                <>
                  <WhiteTitle level={2}>Xác thực OTP</WhiteTitle>
                  <Form name="Otp" layout="vertical" onFinish={onVerifyOtp}>
                    <Form.Item
                      name="Otp"
                      rules={[
                        { required: true, message: "Vui lòng nhập mã OTP!" },
                      ]}
                    >
                      <Input placeholder="Mã OTP" />
                    </Form.Item>

                    <Form.Item>
                      <ActionButton htmlType="submit">Xác nhận</ActionButton>
                    </Form.Item>
                  </Form>
                </>
              )}
              {/* Forgot password */}
              {mode === "forgot" && (
                <>
                  <WhiteTitle level={2}>Quên mật khẩu</WhiteTitle>
                  <Form
                    name="forgot"
                    layout="vertical"
                    onFinish={onForgotPassword}
                  >
                    <Form.Item
                      name="PhoneNumber"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập số điẹno thoại!",
                        },
                      ]}
                    >
                      <Input
                        prefix={<PhoneOutlined />}
                        placeholder="số điện thoại đăng nhập"
                      />
                    </Form.Item>
                    <Form.Item
                      name="NewPassword"
                      rules={[
                        { required: true, message: "Vui lòng nhập mật khẩu!" },
                      ]}
                    >
                      <Input.Password
                        prefix={<LockOutlined />}
                        placeholder="Mật khẩu"
                      />
                    </Form.Item>
                    <Form.Item
                      name="ConfirmPassword"
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
                    <Form.Item
                      name="Otp"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng xác nhận mật khẩu!",
                        },
                      ]}
                    >
                      <InputNumber
                        prefix={<MobileOutlined />}
                        placeholder="Xác nhận OTP"
                        style={{ width: "100%" }}
                      />
                    </Form.Item>
                    <Form.Item>
                      <ActionButton htmlType="submit">Xác nhận</ActionButton>
                    </Form.Item>
                    <Form.Item>
                      <a
                        onClick={() => setMode("login")}
                        style={{ cursor: "pointer", color: "white" }}
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
