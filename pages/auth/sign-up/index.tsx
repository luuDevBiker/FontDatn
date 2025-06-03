import { Form, Input } from "antd";
import { useRouter } from "next/router";
import {
  BoxBody, ButtunSubmit,
  Content, ContentFooter2, StyledForm,
  Wrapper,
  WrapperBox,
  WrapperBox2
} from "../../../styles/AuthStyled";
import Image from "next/image";
import AuthLayout from "../../../components/layout/auth-layout/auth-layout";

const SignUp = () => {
  const router = useRouter();
  const [form] = Form.useForm();

  return (
    <div
      style={{ display: "flex", alignItems: "center", flexDirection: "column" }}
    >
      <Wrapper>
        <WrapperBox>
          <Image
            alt=""
            style={{
              width: "100%",
              height: "610px",
              borderRadius: "10px 0px 0px 10px",
            }}
            src={"https://hanoicomputer.net/wp-content/uploads/2022/10/pc-office-2358.jpg"}
          />
        </WrapperBox>
        <WrapperBox2>
          <Content>Sign up</Content>
          <BoxBody>
            <StyledForm>
              <Form.Item name={"displayName"}>
                <Input
                  placeholder="Tên của bạn"
                  size={"large"}
                  maxLength={100}
                  className="signin"
                />
              </Form.Item>
              <Form.Item name="userName">
                <Input.Password
                  placeholder="Số điện thoại"
                  size={"large"}
                  maxLength={20}
                  className="signin"
                />
              </Form.Item>
              <Form.Item name="password">
                <Input.Password
                  type="password"
                  placeholder="Password"
                  size={"large"}
                  maxLength={20}
                  className="signin"
                />
              </Form.Item>
              <Form.Item
                name="confirmPassWord"
                label=""
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "ok",
                  },
                ]}
              >
                <Input.Password
                  size="large"
                  placeholder="Nhập lại mật khẩu"
                  className="signin"
                />
              </Form.Item>
              <ButtunSubmit onClick={() => router.push("/auth/send-otp")}>
                Đăng ký
              </ButtunSubmit>
              <ContentFooter2>
                <div>bạn đã có tài khoản ?</div>{" "}
                <span onClick={() => router.push("/auth/")}>Đăng nhập</span>
              </ContentFooter2>
            </StyledForm>
          </BoxBody>
        </WrapperBox2>
      </Wrapper>
    </div>
  );
};

SignUp.Layout = AuthLayout;
export default SignUp;
