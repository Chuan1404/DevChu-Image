import { API } from "../assets/js/constants";
import { postData } from "../utils/fetchData";

const utilsService = {
  getColor(data = {}) {
    return postData(`${API}/getColor/`, data);
  },

 
};

export default utilsService;
