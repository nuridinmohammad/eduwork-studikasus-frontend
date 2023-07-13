import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getInvoiceByOrderId } from "../app/apis/order.api";
import { formatRupiah } from "../utils";

const InvoicePage = () => {
  const auth = useSelector((state) => state.auth);
  const [invoice, setInvoice] = useState({});
  const navigate = useNavigate();
  const { order_id } = useParams();

  useEffect(() => {
    !auth.token && !auth.user && navigate("/login");
    getInvoiceByOrderId(order_id)
      .then((res) => {
        setInvoice(res.data);
        console.log(res);
      })
      .catch((err) => console.log(err));
  }, [auth.token, auth.user, navigate, order_id]);

  return (
    <div className="col-md">
      <div className="mt-3">
        <div className="card">
          <div className="card-header text-center">Invoice</div>
          <div className="card-body">
            <div className="col-md my-3">
              <table className="table">
                <tbody>
                  <tr>
                    <th>Status</th>
                    <td>{invoice?.payment_status || "Loading.."}</td>
                  </tr>
                  <tr>
                    <th>Order ID</th>
                    <td>#{invoice?.order?._id || "Loading.."}</td>
                  </tr>
                  <tr>
                    <th>Total Amount</th>
                    <td>{formatRupiah(invoice.total) || "Loading.."}</td>
                  </tr>
                  <tr>
                    <th>Billed To</th>
                    <td>
                      {invoice?.delivery_address?.detail},{" "}
                      {invoice?.delivery_address?.provinsi},{" kabupaten "}
                      {invoice?.delivery_address?.kabupaten}, {" kecamatan "}
                      {invoice?.delivery_address?.kecamatan}, {" kelurahan "}
                      {invoice?.delivery_address?.kelurahan}
                    </td>
                  </tr>
                  <tr>
                    <th>Payment to</th>
                    <td>
                      BCA a.n admin Mohammad Nuridin
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoicePage;
