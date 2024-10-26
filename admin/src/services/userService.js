import { ADMIN_API, API } from "../assets/js/constants";
import { callWithToken } from "../utils/fetchData";

const userService = {
  getInfo() {
    return callWithToken(`${API}/users/get-info`);
  },
  getUsers(search = '', role) {
    if(search == '') search = '?'
    return callWithToken(`${ADMIN_API}/users/${search}&role=${role}`)
  },
  addUser(form) {
    return callWithToken(`${ADMIN_API}/users/add`, {
      method: "POST",
      body: form,
    })
  },
  deleteUser(id) {
    return callWithToken(`${ADMIN_API}/users/delete/${id}`)
  },
  updateUser(id, form) {
    return callWithToken(`${ADMIN_API}/users/update/${id}`, {
      method: "POST",
      body: form,
    })
  }
};

export default userService;
