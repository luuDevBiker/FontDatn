import { axiosClient } from "./axios-client";

class OptionApi {
  getOptions() {
    return axiosClient({
      method: "get",
      url: `/msa-product/odata/Options`,
    });
  }
}

export default new OptionApi();
