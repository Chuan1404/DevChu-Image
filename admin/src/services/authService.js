import { API, SERVER } from "../assets/js/constants";
import { postData } from "../utils/fetchData";

const authService = {
  async signIn(form) {
    const response = await fetch(`${SERVER}/auth/sign-in`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    return !response.status.toString().startsWith("2")
      ? {
          error: (await response.json()).error,
        }
      : {
          ...(await response.json()),
        };
  },

  refreshToken(form) {
    return postData(`${API}/auth/refresh-token`, form);
  },
  google(form) {
    return postData(`${API}/auth/admin/google`, form);
  },
};

export default authService;
