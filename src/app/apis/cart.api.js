import axios from "axios";

const url = "http://localhost:3000";

export const saveCart = async (token, carts) => {
  return await axios.put(
    `${url}/api/carts`,
    { items: carts },
    {
      headers: {
        Authorization: `Bearer${token}`,
      },
    }
  );
};
