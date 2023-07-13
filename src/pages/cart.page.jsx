import { useDispatch, useSelector } from "react-redux";
import { formatRupiah } from "../utils";
import dummyImage from "../assets/react.svg";
import {
  addItem,
  clearItem,
  removeItem,
  removeOne,
} from "../app/features/cart/actions.cart";
import { TrashFill } from "react-bootstrap-icons";
import { useEffect, useState } from "react";
import { saveCart } from "../app/apis/cart.api";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const carts = useSelector((state) => state.carts);
  const { token } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(carts));
  }, [carts]);

  const handleCheckout = () => {
    if (token) {
      setIsLoading((isLoading) => !isLoading);
      saveCart(token, carts)
        .then((res) => {
          if (!res.data.length) {
            alert("Carts Kosong!");
            setIsLoading(false);
          } else {
            setIsLoading((isLoading) => !isLoading);
            navigate("/checkout");
          }
        })
        .catch((err) => console.log(err));
    } else {
      return navigate("/login");
    }
  };

  return (
    <div className="col-md">
      <div className="mt-3">
        <div className="card">
          <div className="card-header text-center">Keranjang Belanja</div>
          <div className="card-body">
            <div className="d-flex justify-content-between col-md">
              <h3>
                Total :{" "}
                {carts.length &&
                  formatRupiah(
                    carts
                      .map((item) => item.qty * item.price)
                      .reduce((a, b) => a + b)
                  )}
                ,-
              </h3>
              <span onClick={() => dispatch(clearItem())}>
                <button className="btn btn-danger">
                  <TrashFill /> clear
                </button>
              </span>
            </div>
            <div className="col-md text-center">
              <table className="table">
                <thead>
                  <tr>
                    <th>Gambar</th>
                    <th>Barang</th>
                    <th>Subtotal</th>
                    <th>Qty</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {carts.length ? (
                    carts.map((item) => (
                      <tr key={item._id}>
                        <td>
                          <img
                            src={item.image_url || dummyImage}
                            alt={item.name}
                          />
                        </td>
                        <td>{item.name}</td>
                        <td>{formatRupiah(item.price * item.qty)}</td>
                        <td>
                          <div className="d-flex gap-2 justify-content-center align-items-center">
                            <button
                              onClick={() => {
                                dispatch(addItem(item));
                              }}
                            >
                              +
                            </button>
                            <span>{item.qty}</span>
                            <button
                              onClick={() => {
                                if (item.qty > 1) {
                                  dispatch(removeItem(item));
                                }
                              }}
                            >
                              -
                            </button>
                            <button
                              className="bg-danger border border-borderless text-white"
                              onClick={() => dispatch(removeOne(item._id))}
                            >
                              X
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td className="text-muted" colSpan={4}>
                        No have any Carts
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="col-md">
              <div className="row">
                <button className="btn btn-primary" onClick={handleCheckout}>
                  {isLoading ? "Processing.." : "Checkout"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
