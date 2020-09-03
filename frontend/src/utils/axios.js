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
};

export const sellerApi = {
  registerSeller: (email, password, name) => {
    return request.post("/seller", {
      email,
      password,
      name,
    });
  },
};
