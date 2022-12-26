import { Button, Checkbox, Col, Form, Input, Row } from "antd";
import React from "react";
import { CloseCircleOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { useRouter } from "next/router";
import { BoxBody, BoxChange, ButtunSubmit, Content, ContentBackgound, ContentFooter, ContentFooter2, SignUpWithFacebook, SignUpWithGoogle, StyledForm, Wrapper, WrapperBox, WrapperBox2 } from "../../../styles/AuthStyled";
import backfround from '../../../assets/layout/login.png'
import Image from 'next/image';
import AuthLayout from "../../../components/layout/auth-layout/auth-layout";

const SignUp=()=>{
    const router = useRouter();
    const [form] = Form.useForm();

    return (
        <div style={{display:'flex',alignItems:'center',flexDirection:'column'}}>
          <Wrapper >
            <ContentBackgound>
                Welcome to PetWorld
            </ContentBackgound>
            <WrapperBox>  
              <img 
                    style={{
                      width:'100%',
                      height:'610px',
                      borderRadius: '10px 0px 0px 10px',
                    }}
                    src={backfround.src}/>
            </WrapperBox>
            <WrapperBox2>
              <Content>
                Sign up
              </Content>
              <BoxBody>
                <StyledForm >
                  <Form.Item
                  >
                    <Input
                      placeholder='Email Address'
                      // onChange={onChange}
                      size={'large'}
                      maxLength={100}
                      className='signin'
                    />
                  </Form.Item>
                  <Form.Item
                              name='Password'
                  >
                    <Input.Password
                        type='password'
                        placeholder='Password'
                        size={'large'}
                        maxLength={20}
                        className='signin' 
                    />
                  </Form.Item>
                  <Form.Item
                        name='confirmPassWord'
                        label=''
                        dependencies={['Password']}
                        hasFeedback
                        rules={[
                            {
                            required: true,
                            message: 'ok',
                            },
                        ]}
                        >
                        <Input.Password
                            size='large'
                            placeholder='Nhập lại mật khẩu'
                            className='signin' 
                            
                        />
                        </Form.Item>
                  <ButtunSubmit onClick={()=>router.push('/auth/send-otp')}>Đăng ký</ButtunSubmit>
                  <ContentFooter2>
                    <div>
                    Bạn mới biết đến Pet World?</div> <span onClick={()=>router.push('/auth/')}>Đăng nhập</span>
                  </ContentFooter2>
                </StyledForm>
              </BoxBody>
            </WrapperBox2>
        </Wrapper>
        </div>
    )
}

SignUp.Layout = AuthLayout;
export default SignUp;