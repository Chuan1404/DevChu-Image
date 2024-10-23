import { API } from "../assets/js/constants";
import { callWithToken } from "../utils/fetchData";

const commentService = {
  getCommentOfFile(fileId) {
    return callWithToken(`${API}comments/?fileId=${fileId}`);
  },
  addComment(fileId, content = "") {
    return callWithToken(`${API}comments/add`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fileId,
        content,
      }),
      type: 'json'
    });
  },
};

export default commentService;
