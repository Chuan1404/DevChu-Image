import { API } from "../assets/js/constants";
import { callWithToken } from "../utils/fetchData";

const userService = {
  getInfo() {
    return callWithToken(`${API}/users/get-info`);
  },
  getUsers(search = "", role = "ROLE_CUSTOMER") {
    if (search == "") search = `?role=${role}`;
    else search += `&role=${role}`;
    return callWithToken(`${API}/users/${search}`);
  },
  addUser(form) {
    return callWithToken(
      `${API}/users`,
      {
        method: "POST",
        body: form,
      },
      "multipart/file"
    );
  },
  deleteUser(id) {
    return callWithToken(`${API}/users/${id}`, {
      method: "DELETE",
    });
  },
  updateUser(id, form) {
    return callWithToken(
      `${API}/users/${id}`,
      {
        method: "PATCH",
        body: form,
      },
      "multipart/file"
    );
  },
};

export default userService;
