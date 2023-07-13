import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getAddress } from "../app/apis/address.api";
import { createOrder } from "../app/apis/order.api";
import { clearItem } from "../app/features/cart/actions.cart";

const CheckoutPage = () => {
  const auth = useSelector((state) => state.auth);
  const [address, setAddress] = useState([]);
  const [checked, setChecked] = useState(false);
  const [addressOne, setAddressOne] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    !auth.token && !auth.user && navigate("/login");
    getAddress()
      .then((res) => setAddress(res.data.data))
      .catch((err) => console.log(err));
  }, [auth.token, auth.user, navigate]);

  const handleCreateOrder = () => {
    if (addressOne.length) {
      const payload = {
        delivery_fee: 27_000,
        delivery_address: addressOne,
      };
      setIsLoading((isLoading) => !isLoading);
      createOrder(payload)
        .then((res) => {
          console.log(res);
          alert(res.statusText);
          setIsLoading((isLoading) => !isLoading);
          dispatch(clearItem());
          navigate(`/invoice/${res.data._id}`);
        })
        .catch((err) => console.log(err));
    } else {
      alert("Pilih Alamat Pengiriman");
    }
  };

  return (
    <div className="col-md">
      <div className="mt-3">
        <div className="card">
          <div className="card-header text-center">Checkout</div>
          <div className="card-body">
            <div className="col-md">
              <h3>Pilih Alamat Pengiriman</h3>
            </div>
            <div className="col-md">
              <table className="table">
                <thead>
                  <tr>
                    <th></th>
                    <th>Nama Alamat</th>
                    <th>Detail</th>
                  </tr>
                </thead>
                <tbody>
                  {!address.length ? (
                    <tr>
                      <td colSpan={3} className="text-muted text-center">
                        No Have Any Address {" "}
                        <Link to={"/account#address"}>
                          <button className="badge btn btn-primary">+ Tambah Alamat</button>
                        </Link>
                      </td>
                    </tr>
                  ) : (
                    address.map((item) => (
                      <tr key={item._id}>
                        <td>
                          <input
                            type="checkbox"
                            value={item._id}
                            onChange={(e) => {
                              setChecked(e.target.value);
                              setAddressOne(e.target.value);
                            }}
                            checked={checked === item._id}
                          />
                        </td>
                        <td>{item.name}</td>
                        <td>{item.detail}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <div className="col-md">
              <div className="row">
                <button className="btn btn-primary" onClick={handleCreateOrder}>
                  {isLoading ? "Processing.." : "Berikutnya"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
