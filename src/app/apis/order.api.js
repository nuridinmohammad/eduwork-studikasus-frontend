import axios from "axios";

const url = "http://localhost:3000";

export const createOrder = async (payload) => {
  const { token } = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : {};

  return await axios.post(`${url}/api/orders`, payload, {
    headers: {
      Authorization: `Bearer${token}`,
    },
  });
};

export const getInvoiceByOrderId = async (order_id) => {
  const { token } = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : {};

  return await axios.get(`${url}/api/invoices/${order_id}`, {
    headers: {
      Authorization: `Bearer${token}`,
    },
  });
};

export const getOrders = async () => {
  const { token } = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : {};

  return await axios.get(`${url}/api/orders?limit=`, {
    headers: {
      Authorization: `Bearer${token}`,
    },
  });
};
