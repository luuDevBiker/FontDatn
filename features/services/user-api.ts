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
  getConfigurations(payload: any) {
    return axiosClient2({
      method: "get",
      url: `/msa-configuration/odata/Configurations`,
      params: payload,
    });
  }
}

export default new UserApi();
