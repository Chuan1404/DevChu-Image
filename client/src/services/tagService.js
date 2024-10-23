import { API } from "../assets/js/constants";
import { getData } from "../utils/fetchData";

const tagService = {
  getByKw(kw) {
    return getData(`${API}tags/?q=${kw}`);
  },
  getTop() {
    return getData(`${API}tags/top`)
  }
};

export default tagService;