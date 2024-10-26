import { ADMIN_API, API } from "../assets/js/constants";
import { callWithToken, getData, postFile } from "../utils/fetchData";

const fileService = {
  getFiles(search = "") {
    if (search === "") search = "?";
    return callWithToken(`${API}/files/${search}`);
  },

  updateFiles(id, form) {
    return callWithToken(`${API}/files/${id}`, {
      method: "PATCH",
      body: JSON.stringify(form),
      type: 'json',
      headers: {
        'Content-Type': 'application/json'
      }
    })
  },

  extractFile(form) {
    return postFile(`${ADMIN_API}/files/extract`, {
      method: "POST",
      body: form,
    })
  },

  deleteFile(id, form) {
    return callWithToken(`${API}/files/${id}`, {
      method: "DELETE",
    })
  }
};

export default fileService;
