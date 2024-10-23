import { API } from "../assets/js/constants";
import { callWithToken, getData } from "../utils/fetchData";
import queryLocation from "../utils/queryLocation";

const fileService = {
  getFiles(search = "") {
    if (search == "") search = "?";
    return getData(`${API}files/${search}`);
  },
  getFile(id) {
    return getData(`${API}files/${id}`);
  },
  downloadFile(url, definition = {}) {
    let query = queryLocation.toString(definition)
    return callWithToken(`${API}files/download/${url}?${query}`, {type: 'text'})
  }
};

export default fileService;