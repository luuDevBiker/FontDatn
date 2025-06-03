import { Form, Input, message } from "antd";
import { useRouter } from "next/router";
import {
  BoxBody, ButtunSubmit,
  Content,
  ContentBackgound,
  ContentFooter, StyledForm,
  Wrapper,
  WrapperBox,
  WrapperBox2
} from "../../../styles/AuthStyled";
import backfround from "../../../assets/layout/login.png";
import Image from "next/image";
import { IUserSignInPayload } from "@/models/user";
import { userSignIn } from "@/features/user-slice";
import { useAppDispatch } from "@/app/hooks";

const SignIn = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();

  const onFinish = (values: any) => {
    let payload: IUserSignInPayload = { ...values };
    payload.remember = false;
    dispatch(userSignIn(payload))
      .unwrap()
      .then()
      .then((res: any) => {
        message.success({
          // content: t("EntityNotFoundException"),
          content: "Đăng nhập thành công",
          // content: localization.wh,
          className: "erroNotFound-class",
          style: {
            marginTop: "3vh",
          },
        });
        router.push("/");
      })
      .catch((error: any) => { });
  };
  return (
    <div
      style={{ display: "flex", alignItems: "center", flexDirection: "column" }}
    >
      <Wrapper>
        <ContentBackgound></ContentBackgound>
        <WrapperBox>
          <Image
            alt=""
            style={{
              width: "100%",
              height: "610px",
              borderRadius: "10px 0px 0px 10px",
            }}
            src={backfround.src}
          />
        </WrapperBox>
        <WrapperBox2>
          <Content>Đăng Nhập</Content>
          <BoxBody>
            <StyledForm form={form} onFinish={onFinish}>
              <Form.Item
                name={"userName"}
                rules={[
                  {
                    required: true,
                    message: "Tên đăng nhập không được để trống",
                  },
                ]}
              >
                <Input
                  placeholder="Email"
                  // onChange={onChange}
                  size={"large"}
                  maxLength={100}
                  className="signin"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Mật khẩu  không được để trống",
                  },
                ]}
              >
                <Input.Password
                  type="password"
                  placeholder="Mật khẩu"
                  size={"large"}
                  maxLength={20}
                  className="signin"
                />
              </Form.Item>
              <ButtunSubmit htmlType="submit">Đăng nhập</ButtunSubmit>
              <div
                className="rest"
                onClick={() => router.push("/auth/forgot-password")}
              >
                Quên mật khẩu?
              </div>
              <ContentFooter>
                <div>Bạn mới biết đến Pet World?</div>{" "}
                <span onClick={() => router.push("/auth/sign-up")}>
                  Đăng ký
                </span>
              </ContentFooter>
            </StyledForm>
          </BoxBody>
        </WrapperBox2>
      </Wrapper>
    </div>
  );
};

export default SignIn;