import axios from "axios";

const url = "http://localhost:3000";

export const getAddress = async () => {
  const { token } = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : {};

  return await axios.get(`${url}/api/delivery-address?limit=`, {
    headers: {
      Authorization: `Bearer${token}`,
    },
  });
};

export const createAddress = async (data) => {
  const { token } = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : {};

  return await axios.post(`${url}/api/delivery-address`, data, {
    headers: {
      Authorization: `Bearer${token}`,
    },
  });
};
