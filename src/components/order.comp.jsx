import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getOrders } from "../app/apis/order.api";

const OrderComp = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders()
      .then((response) => {
        setOrders(response.data.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="row">
      {orders.length ? (
        <div className="col">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Order ID</th>
                <th scope="col">Total</th>
                <th scope="col">Status</th>
                <th scope="col">Invoice</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((item) => (
                <tr key={item._id}>
                  <td>{item.id}</td>
                  <td>{item.items_count}</td>
                  <td>{item.status}</td>
                  <td>
                    <button className="btn btn-success">
                      <Link to={`/invoice/${item._id}`} className="text-white">
                        Invoice
                      </Link>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center text-muted">No have any orders</div>
      )}
    </div>
  );
};

export default OrderComp;
