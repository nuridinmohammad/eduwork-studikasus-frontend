import axios from "axios";

const url = "http://localhost:3000";

export const registerUser = async (data) => {
  return await axios.post(`${url}/auth/register`, data);
};

export const loginUser = async (data) => {
  return await axios.post(`${url}/auth/login`, data);
};



export const logoutUser = async () => {
  const { token } = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : {};
  return await axios
    .post(`${url}/auth/logout`, null, {
      headers: {
        Authorization: `Bearer${token}`,
      },
    })
    .then((res) => {
      localStorage.removeItem("auth");
      return res;
    })
    .catch((error) => console.log(error));
};
