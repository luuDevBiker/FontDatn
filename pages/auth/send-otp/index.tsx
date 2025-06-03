import { Form, Image } from "antd";
import { useState } from "react";
import { BankTwoTone, MobileOutlined } from '@ant-design/icons';
import { useRouter } from "next/router";
import { BoxBody, BoxSendOtp, ButtonSenOTP, ButtunSubmit, Content, ContentBackgound, InputSendOTP, TitleStyle, Wrapper, WrapperBox, WrapperBox2, WrapperLogo } from "../../../styles/AuthStyled";
import backfround from '../../../assets/layout/login.png';
import AuthLayout from "@/components/layout/auth-layout/auth-layout";
import { RegexValidation } from "@/utils/common";

const SendOTP = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  let countDountS = 61;
  const [initSecond, setInitSecond] = useState<number>(0);

  const cssButtonGetOTP = [
    {
      background: '#D87035',
      color: 'white'
    },
    {
      color: '#FFFFFF !important',
      background: 'rgba(93, 95, 239, 0.5)'
    }
    ,
    {
      color: '#FFFFFF',
      background: 'rgba(24, 144, 255, 0.25)'
    }
    ,
    {
      color: '#FFFFFF !important',
      background: 'rgba(93, 95, 239, 0.5) !important',
      fontWeight: 400
    }
  ]
  const handleGetOTP = () => {
    const intervalId = setInterval(() => {
      countDountS = countDountS - 1;
      setInitSecond(countDountS);
      if (!countDountS) {
        clearInterval(intervalId);
        countDountS = 61;
      }
    }, 1000);
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
      <Wrapper >
        <ContentBackgound>
          Welcome to PetWorld
        </ContentBackgound>
        <WrapperBox>
          <Image
            alt=""
            style={{
              width: '100%',
              height: '610px',
              borderRadius: '10px 0px 0px 10px',
            }}
            src={backfround.src} />
        </WrapperBox>
        <WrapperBox2>
          <Content>
            Xác thực
          </Content>
          <WrapperLogo>
            <BankTwoTone />
            <div className='text_logo'>Pet World</div>
          </WrapperLogo>
          <BoxBody>
            <TitleStyle>Xác nhận thông tin</TitleStyle>
            <div className="content">Vui lòng nhập mã OTP chúng tôi đã gửi đến bạn qua Email/ Số điện thoại đăng ký.</div>
            <Form>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: 'Otp không được để trống'
                  },
                  {
                    validator: async (rule: any, value: any, callback) => {
                      if (isNaN(value) || RegexValidation.REGEXOTP.test(value)) {
                        return Promise.reject('Bạn nhập sai otp')
                      }
                    }
                  }
                ]}
              >
                <BoxSendOtp>
                  <InputSendOTP
                    prefix={<MobileOutlined />}

                  >
                  </InputSendOTP>
                  <ButtonSenOTP disabled={initSecond > 0}
                    style={initSecond > 0 ? cssButtonGetOTP[1] : cssButtonGetOTP[0]}
                    onClick={handleGetOTP}
                  >
                    Lấy mã {initSecond == 0 ? '' : '(' + initSecond}{initSecond == 0 ? '' : 's)'}
                  </ButtonSenOTP>
                </BoxSendOtp>
              </Form.Item>
              <ButtunSubmit htmlType="submit">Xác thực</ButtunSubmit>
            </Form>
            <div>Quay lại</div>
            <div>2022 All rights reserved by PetWorld</div>
          </BoxBody>
        </WrapperBox2>
      </Wrapper>
    </div>
  )
}

SendOTP.Layout = AuthLayout;
export default SendOTP;