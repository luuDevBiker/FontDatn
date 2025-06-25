import { IUserRegister, IUserSignInPayload } from "@/models/user";
import { axiosClient2, axiosClient } from "./axios-client";

class UserApi {
  ///SignIn
  userSignIn(payload: IUserSignInPayload) {
    return axiosClient({
      method: "post",
      url: "/msa-identity/api/Users/SignIn",
      data: payload,
    });
  }
  userRegister(payload: IUserRegister) {
    return axiosClient({
      method: "post",
      url: "/msa-identity/api/Users/Register",
      data: payload,
    });
  }
  userConfirmOtp(payload: any) {
    return axiosClient({
      method: "post",
      url: `/msa-identity/api/Users/ConfirmOtp`,
      data: payload,
    });
  }
  userForgotPassword(payload: any) {
    return axiosClient({
      method: "put",
      url: `/msa-identity/api/Users/ForgotPassword`,
      data: payload,
    });
  }
}

export default new UserApi();
