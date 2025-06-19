import { Button, Form,Input } from "antd";
import styled, { css, keyframes } from "styled-components";

// export const Wrapper=styled.div`
//     background: #ffffff;
//     /* background-image: ; */
//     box-shadow: 0px 3px 6px -4px rgba(0, 0, 0, 0.12), 0px 6px 16px rgba(0, 0, 0, 0.08), 0px 9px 28px 8px rgba(0, 0, 0, 0.05);
//     margin-top: 0px;
//     border-radius: 20px;
//     width: 65%;
//     height: 610px;
//     display: flex;
//     align-items: center;
// `
// export const WrapperBox=styled.div`
//     width: 50%;
//     height: 100%;
//     border-radius: 10px 0px 0px 10px;
// `
// export const WrapperBox2=styled.div`
//     width: 50%;
//     background-color: #FFFFFF;
//     height: 100%;
//     border-radius: 10px;
   
// `
export const Content=styled.div`
    font-family: "Open Sans",Arial,sans-serif;
    font-style: normal;
    font-weight: 700;
    color: #010101;
    font-size: 24px;
    line-height: 112px;
    margin-top: 17px;
    margin-left: 65px;
`
export const StyledForm = styled(Form)`

  .ant-form {
    padding: 80px !important;
  }
  .ant-input-affix-wrapper {
    border-radius: 10px;
  }
  .ant-input-prefix {
    color: #1890ff;
    margin-right: 14px;
  }
  .ant-input-password-icon.anticon {
    color: #1890ff;
  }
  .resetPassword {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .rest {
    padding-top: 6px;
    cursor: pointer;
    color: #442D2D;
    font-stretch: 100;
    mix-blend-mode: multiply;
    opacity: 0.49;
    line-height: 24px;
    font-size: 16px;
    float: right;
  }
`;

export const BoxBody=styled.div`
    margin-top: 30px;
    margin-left: 65px;
    width: 73%;
    .signin{
        width: 100%;
        height: 30px;
        border-style:outset;
        border: none;
        font-size: 20px;
        color: #000000;
        mix-blend-mode: multiply;
        opacity: 0.6;
        outline: 0;
        border-width: 0 0 2px;
        border-color: blue;
        outline: 0;
        border-bottom: 1px solid #000000;
        transform: matrix(1, 0, 0, 1, 0, 0);
    }
    .signup{
        input[type="password"]{
            width: 100%;
            height: 30px;
            margin-top: 30px;
            border-style:outset;
            border: none;
            font-size: 20px;
            color: #000000;
            mix-blend-mode: multiply;
            opacity: 0.6;
            outline: 0;
            border-bottom: 1px solid #000000;
            transform: matrix(1, 0, 0, 1, 0, 0);
        }
       
    }   
    .content{
        text-align: center;
        margin-top: 1px;
    }
`

export const ButtunSubmit=styled(Button)`
    width: 100%;
    background: #D87035;
    height: 45px;
    border-radius: 8px;
    border: none;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 585;
    font-size: 18px;
    line-height: 40px;
    color: #FFFFFF;
    font-stretch: 100;
    &:hover{
        background: #5D5FEF;
        color: #FFFFFF;
    }
    cursor: pointer;
`

export const ContentBackgound=styled.div`
    position: absolute;
    font-family: 'Jokerman';
    font-style: normal;
    font-weight: 400;
    font-size: 32px;
    line-height: 62px;
    color: #0500FF;
    top: 180px;
    left: 323px;
    .contetn{
        position:relative;
    }
`

export const BoxChange=styled.div`
    display: flex;
    hr{
        width: 160px;
        border: 1px solid #000000;
        height: 1px;
        margin-top: 18px;
        opacity: 0.39;
    }
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 37px;
    opacity: 0.39;
    color: #000000;
    margin-top: 30px;
`
export const SignUpWithGoogle=styled(Button)`
    margin-top: 20px;
    width: 100%;
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    height: 45px;
    line-height: 30px;
    background: linear-gradient(90deg, #0D9CC9 5.27%, rgba(16, 124, 158, 0.91) 42.27%, rgba(43, 40, 208, 0.559375) 79.41%);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    color: #FFFFFF;
    border: none;
    margin-bottom: 16px;
    &:hover{
        background: #44C6D8;
    }
    cursor: pointer;
`

export const ContentFooter=styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 55px;
    div{
        margin-right: 8px;
        opacity: 0.49;
    }
    span{
        color: #007AD9;
        mix-blend-mode: multiply;
        font-weight: 600;
        font-size: 19px;
        line-height: 26px;
        cursor: pointer;
    }
`
export const ContentFooter2=styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 160px;
    div{
        margin-right: 8px;
        opacity: 0.49;
    }
    span{
        color: #007AD9;
        mix-blend-mode: multiply;
        font-weight: 600;
        font-size: 19px;
        line-height: 26px;
        cursor: pointer;
    }
`
export const SignUpWithFacebook=styled(Button)`
    width: 100%;
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    height: 45px;
    line-height: 30px;
    background: #039BE5;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    color: #FFFFFF;
    border: none;
    &:hover{
        background: #44C6D8;
    }
    cursor: pointer;
`

export const BoxSendOtp=styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 30px;
`
export const ButtonSenOTP=styled(Button)`
    margin-left: 11px;
    background: #D87035;
    border-radius: 12px;
    height: 42px;
    color: #FFFFFF;
    margin-bottom: 0px;
`

export const InputSendOTP=styled(Input)`
    height: 42px;
    border-radius: 12px;
    border: solid 1px black;
    margin-bottom: 0px;
    svg{
        width: 22px;
        height: 22px;
        color: black;
    }
`

export const WrapperLogo=styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 7px;
    margin-right: 7.5px;
    margin-top: 30px;
    .text_logo {
        font-weight: 400;
        font-size: 30px;
        margin-left: 7.5px;
        line-height: 38px;
    }
`

export const TitleStyle=styled.div`
    font-size: 20px;
    text-align: center;
    margin-bottom: 0;
    font-weight: 600;
`

export const WrapperSigin=styled.div`
a {
	font-family: Poppins-Regular;
	font-size: 14px;
	line-height: 1.7;
	color: #666666;
	margin: 0px;
	transition: all 0.4s;
	-webkit-transition: all 0.4s;
  -o-transition: all 0.4s;
  -moz-transition: all 0.4s;
}

a:focus {
	outline: none !important;
}

a:hover {
	text-decoration: none;
  color: #57b846;
}

/*---------------------------------------------*/
h1,h2,h3,h4,h5,h6 {
	margin: 0px;
}

p {
	font-family: Poppins-Regular;
	font-size: 14px;
	line-height: 1.7;
	color: #666666;
	margin: 0px;
}

ul, li {
	margin: 0px;
	list-style-type: none;
}


/*---------------------------------------------*/
input {
	outline: none;
	border: none;
}

textarea {
  outline: none;
  border: none;
}

textarea:focus, input:focus {
  border-color: transparent !important;
}

input:focus::-webkit-input-placeholder { color:transparent; }
input:focus:-moz-placeholder { color:transparent; }
input:focus::-moz-placeholder { color:transparent; }
input:focus:-ms-input-placeholder { color:transparent; }

textarea:focus::-webkit-input-placeholder { color:transparent; }
textarea:focus:-moz-placeholder { color:transparent; }
textarea:focus::-moz-placeholder { color:transparent; }
textarea:focus:-ms-input-placeholder { color:transparent; }

input::-webkit-input-placeholder { color: #999999; }
input:-moz-placeholder { color: #999999; }
input::-moz-placeholder { color: #999999; }
input:-ms-input-placeholder { color: #999999; }

textarea::-webkit-input-placeholder { color: #999999; }
textarea:-moz-placeholder { color: #999999; }
textarea::-moz-placeholder { color: #999999; }
textarea:-ms-input-placeholder { color: #999999; }

/*---------------------------------------------*/
button {
	outline: none !important;
	border: none;
	background: transparent;
}

button:hover {
	cursor: pointer;
}

iframe {
	border: none !important;
}


/*//////////////////////////////////////////////////////////////////
[ Utility ]*/
.txt1 {
  font-family: Poppins-Regular;
  font-size: 13px;
  line-height: 1.5;
  color: #999999;
}

.txt2 {
  font-family: Poppins-Regular;
  font-size: 13px;
  line-height: 1.5;
  color: #666666;
}


/*//////////////////////////////////////////////////////////////////
[ login ]*/

.limiter {
  width: 100%;
  margin: 0 auto;
}

.container-login100 {
  width: 100%;  
  min-height: 60vh;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 15px;

}

.wrap-login100 {
  width: 960px;
  background: #fff;
  border-radius: 10px;
  overflow: hidden;

  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 17px 130px 33px 95px;
}

/*------------------------------------------------------------------
[  ]*/
.login100-pic {
  width: 316px;
}

.login100-pic img {
  max-width: 100%;
}


/*------------------------------------------------------------------
[  ]*/
.login100-form {
  width: 290px;
}

.login100-form-title {
  font-family: Poppins-Bold;
  font-size: 24px;
  color: #333333;
  line-height: 1.2;
  text-align: center;

  width: 100%;
  display: block;
  padding-bottom: 54px;
}


/*---------------------------------------------*/
.wrap-input100 {
  position: relative;
  width: 100%;
  z-index: 1;
  margin-bottom: 10px;
}

.input100 {
  font-family: Poppins-Medium;
  font-size: 15px;
  line-height: 1.5;
  color: #666666;

  display: block;
  width: 100%;
  background: #e6e6e6;
  height: 50px;
  border-radius: 25px;
  padding: 0 30px 0 68px;
}


/*------------------------------------------------------------------
[ Focus ]*/
.focus-input100 {
  display: block;
  position: absolute;
  border-radius: 25px;
  bottom: 0;
  left: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
  box-shadow: 0px 0px 0px 0px;
  color: rgba(87,184,70, 0.8);
}

.input100:focus + .focus-input100 {
  -webkit-animation: anim-shadow 0.5s ease-in-out forwards;
  animation: anim-shadow 0.5s ease-in-out forwards;
}

@-webkit-keyframes anim-shadow {
  to {
    box-shadow: 0px 0px 70px 25px;
    opacity: 0;
  }
}

@keyframes anim-shadow {
  to {
    box-shadow: 0px 0px 70px 25px;
    opacity: 0;
  }
}

.symbol-input100 {
  font-size: 15px;

  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  align-items: center;
  position: absolute;
  border-radius: 25px;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding-left: 35px;
  pointer-events: none;
  color: #666666;

  -webkit-transition: all 0.4s;
  -o-transition: all 0.4s;
  -moz-transition: all 0.4s;
  transition: all 0.4s;
}

.textForgot{
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: Poppins-Regular;
    font-size: 17px !important;
    line-height: 1.5;
    cursor: pointer;
    color: #666;
    .txt1{
        font-size: 15px;
    color: #666;

    }
    .txt2{
        font-size: 15px;
    color: #666;

    }
    margin-top: 10px;
}
.input100:focus + .focus-input100 + .symbol-input100 {
  color: #57b846;
  padding-left: 28px;
}
.createacc{
    display: flex;
    align-items: flex-end;
    margin-top: auto;
}
/*------------------------------------------------------------------
[ Button ]*/
.container-login100-form-btn {
  width: 100%;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding-top: 20px;
}

.login100-form-btn {
  font-family: Montserrat-Bold;
  font-size: 15px;
  line-height: 1.5;
  color: #fff;
  text-transform: uppercase;

  width: 100%;
  height: 50px;
  border-radius: 25px;
  background: #57b846;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 25px;

  -webkit-transition: all 0.4s;
  -o-transition: all 0.4s;
  -moz-transition: all 0.4s;
  transition: all 0.4s;
}

.login100-form-btn:hover {
  background: #333333;
}



/*------------------------------------------------------------------
[ Responsive ]*/



@media (max-width: 992px) {
  .wrap-login100 {
    padding: 177px 90px 33px 85px;
  }

  .login100-pic {
    width: 35%;
  }

  .login100-form {
    width: 50%;
  }
}

@media (max-width: 768px) {
  .wrap-login100 {
    padding: 100px 80px 33px 80px;
  }

  .login100-pic {
    display: none;
  }

  .login100-form {
    width: 100%;
  }
}

@media (max-width: 576px) {
  .wrap-login100 {
    padding: 100px 15px 33px 15px;
  }
}


/*------------------------------------------------------------------
[ Alert validate ]*/

.validate-input {
  position: relative;
}

.alert-validate::before {
  content: attr(data-validate);
  position: absolute;
  max-width: 70%;
  background-color: white;
  border: 1px solid #c80000;
  border-radius: 13px;
  padding: 4px 25px 4px 10px;
  top: 50%;
  -webkit-transform: translateY(-50%);
  -moz-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  -o-transform: translateY(-50%);
  transform: translateY(-50%);
  right: 8px;
  pointer-events: none;

  font-family: Poppins-Medium;
  color: #c80000;
  font-size: 13px;
  line-height: 1.4;
  text-align: left;

  visibility: hidden;
  opacity: 0;

  -webkit-transition: opacity 0.4s;
  -o-transition: opacity 0.4s;
  -moz-transition: opacity 0.4s;
  transition: opacity 0.4s;
}

.alert-validate::after {
  content: "\f06a";
  font-family: FontAwesome;
  display: block;
  position: absolute;
  color: #c80000;
  font-size: 15px;
  top: 50%;
  -webkit-transform: translateY(-50%);
  -moz-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  -o-transform: translateY(-50%);
  transform: translateY(-50%);
  right: 13px;
}

.alert-validate:hover:before {
  visibility: visible;
  opacity: 1;
}

@media (max-width: 992px) {
  .alert-validate::before {
    visibility: visible;
    opacity: 1;
  }
}

`

// NEW
export const Wrapper = styled.div`
  background: #ffffff;
  box-shadow: 0px 3px 6px -4px rgba(0, 0, 0, 0.12),
              0px 6px 16px rgba(0, 0, 0, 0.08),
              0px 9px 28px 8px rgba(0, 0, 0, 0.05);
  border-radius: 20px;
  width: 65%;
  height: 610px;
  display: flex;
  align-items: center;
`;

export const WrapperBox = styled.div`
  width: 50%;
  height: 100%;
  border-radius: 20px 0px 0px 20px;
  background: url('/login-image.jpg') center/cover no-repeat;
`;

export const WrapperBox2 = styled.div`
  width: 50%;
  height: 100%;
  background-color: #ffffff;
  border-radius: 0px 20px 20px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FormContainer = styled.div`
  width: 80%;
`;

export const LoginButton = styled(Button)`
  width: 100%;
  height: 40px;
  font-weight: bold;
  background: linear-gradient(90deg, #4facfe 0%, #00f2fe 100%);
  border: none;

  &:hover {
    background: linear-gradient(90deg, #00f2fe 0%, #4facfe 100%);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 242, 254, 0.4);
  }
`;


const slideIn = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
`;

const slideOut = keyframes`
  from { transform: translateX(-50%); }
  to { transform: translateX(0); }
`;

export const Container = styled.div`
  background: linear-gradient(135deg, #4facfe, #00f2fe);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url("https://assets.isu.pub/document-structure/230530104013-516677457fd54e456bfe38a98e2760fe/v1/80d96b2a994829e279f0cc1f44c288eb.jpeg");
`;

export const ToggleButton = styled.button`
  margin-bottom: 1.5rem;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 20px;
  border: none;
  background-color: #fff;
  color: #333;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  transition: 0.3s;

  &:hover {
    transform: scale(1.05);
  }
`;

export const AuthWrapper = styled.div`
  width: 800px;
  height: 500px;
  overflow: hidden;
  border-radius: 20px;
  background: #ffffff;
  box-shadow: 0px 12px 30px rgba(0, 0, 0, 0.2);
  position: relative;
`;

export const FormSlide = styled.div<{ isRegistering: boolean }>`
  display: flex;
  width: 200%;
  height: 100%;
  transition: transform 0.6s ease-in-out;

  ${(props) =>
    props.isRegistering
      ? css`
          transform: translateX(-50%);
          animation: ${slideIn} 0.6s forwards;
        `
      : css`
          transform: translateX(0%);
          animation: ${slideOut} 0.6s forwards;
        `}
`;

export const FormBox = styled.div`
  width: 50%;
  padding: 3rem;
  box-sizing: border-box;
`;

export const ActionButton = styled(Button)`
  width: 100%;
  height: 40px;
  font-weight: bold;
  background: linear-gradient(to right, #4facfe, #00f2fe);
  border: none;

  &:hover {
    background: linear-gradient(to left, #00f2fe, #4facfe);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 242, 254, 0.4);
  }
`;