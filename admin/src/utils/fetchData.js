import authService from "../services/authService";

export const postData = async (api, data = {}, options = {}) => {
  const response = await fetch(api, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },

    body: JSON.stringify(data),
  });
  return !response.status.toString().startsWith("2")
    ? {
        error: (await response.json()).error,
      }
    : {
        ...(await response.json()),
      };
};

export const getData = async (api, options = {}) => {
  let response = await fetch(api, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  return response.json();
};

export const callWithToken = async (api, options = {}, type = "json") => {
  const token = JSON.parse(localStorage.getItem("token"));
  if (!token)
    return {
      status: 401,
      error: "Forbidden",
    };

  options = {
    ...options,
    method: options.method ? options.method : "GET",
    headers: {
      Authorization: `Bearer ${token.accessToken}`,
      ...options.headers,
    },
    body: options.body ? options.body : null,
  };
  if (type === "json") options.headers["Content-Type"] = "application/json";

  let response = await fetch(api, options);

  if (response.status === 401) {
    response = await authService.refreshToken({
      token: token.refreshToken,
    });

    if (!response.error) {
      options.headers.Authorization = `Bearer ${response.accessToken}`;
      localStorage.setItem("token", JSON.stringify(response));
      response = await fetch(api, options);
    } else {
      localStorage.removeItem("token");
      return {
        status: 403,
        error: "Forbiden",
      };
    }
  }

  return response.json();
};

export const postFile = async (api, options = {}) => {
  const token = JSON.parse(localStorage.getItem("token"));
  if (!token)
    return {
      status: 403,
      error: "Forbiden",
    };

  options = {
    method: options.method ? options.method : "GET",
    headers: {
      Authorization: `Bearer ${token.accessToken}`,
      ...options.headers,
    },
    body: options.body ? options.body : null,
  };
  let response = await fetch(api, options);
  if (!response.status.toString().startsWith("2")) {
    response = await authService.refreshToken({
      token: token.refreshToken,
    });
    if (!response.error) {
      options.headers.Authorization = `Bearer ${response.accessToken}`;
      localStorage.setItem("token", JSON.stringify(response));
      response = await fetch(api, options);
    } else {
      localStorage.removeItem("token");
      return {
        status: 403,
        error: "Forbiden",
      };
    }
  }

  return response.arrayBuffer();
};
