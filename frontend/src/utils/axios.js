import axios from "axios";

const request = axios.create({
  baseURL: "http://localhost:8000",
});
export const userApi = {
  registerUser: (email, password, name) => {
    return request.post("/user", {
      email: email,
      password: password,
      name,
    });
  },
  loginUser: (email, password) => {
    return request.post("/user/login", {
      email,
      password,
    });
  },
};

export const sellerApi = {
  registerSeller: (email, password, name) => {
    return request.post("/seller", {
      email,
      password,
      name,
    });
  },
  loginSeller: (email, password) => {
    return request.post("/seller/login", {
      email,
      password,
    });
  },
};

export const postApi = {
  post: (formData) => {
    return request.post("/post", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  getFile: (src) => {
    return request.get(`/post/images`, {
      params: {
        src: src,
      },
      responseType: "blob",
    });
  },
  getList: (seachKeyword = "") => {
    return request.get("/post", {
      params: {
        seachKeyword: seachKeyword,
      },
    });
  },
};
