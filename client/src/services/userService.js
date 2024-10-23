import { API } from "../assets/js/constants";
import { callWithToken } from "../utils/fetchData";

const userService = {
  getInfo() {
    return callWithToken(`${API}users/get-info`)
  },
  getReceipt() {
    return callWithToken(`${API}users/receipt`)
  },

  getPaid() {
    return callWithToken(`${API}users/paid`)
  },
  getFile() {
    return callWithToken(`${API}users/file`)
  }
};

export default userService;
