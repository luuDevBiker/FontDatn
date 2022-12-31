export interface IUserSignInPayload {
  userKame: string;
  password: string;
  remember: boolean;
}

export interface ICreateEmployees {
  userName: string;
  passWord: string;
  email: string;
  avatar: string;
  firsName: string;
  lastName: string;
  phoneNumber: string;
  roleId: string;
}

export interface ILoginResponse {
  id: string;
  userName: string;
  email: Date;
  phoneNumber: string;
  token:string;
  refreshToken:any;
  accessTokenExpireTime: Date;
  refreshTokenExpireTime: Date;
  accessToken: string;
  profileCollection:IProfileCollection[]
}
export interface IRefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
  refreshTokenExpireTime: Date;
  accessTokenExpireTime: Date;
  userId: string;
}
export interface IRegisterResponse {
  id: string;
  userName: string;
  email: Date;
  phoneNumber: string;
  token:string;
  refreshToken:string;
  profileCollection:IProfileCollection[]
}
export interface IProfileCollection {
  id:string;
  displayName: string;
  description: string;
  gender: string;
  isPrimary:boolean;
  avatar:any
}
export interface IInitialUserState {
  loginInfo: ILoginResponse,
  register: any,
  sendOtp: any,
  otp: any,
  loading: boolean;   
  newRefreshToken:any;
  error: boolean;
  isAuthentication:boolean;
  token:string;
}
export interface IRegisterPayload {
  displayName:string,
  userName:string,
  password:string,
  confirmPassWord: string,
  languageCode: string
}
export interface IConfirmOtpPayload {
  phoneNumber: string,
  otp: string,
  otpType: string
}
export interface IUserSignInPayload {
  userName:string,
  password:string,
}
export interface IUserForgotPasswordPayload {
  phoneNumber:string,
  otp:string,
  newPassword:string,
  confirmPassword:string
}
export interface IUserChangePasswordPayload {
  currentPassword: string,
  newPassword:string,
  confirmPassword:string
}
export interface IUserSendOtpPayload {
  numberPhone: string,
  languageCode: string,
}

