const ConfirmPage = () => {
  return (
    <div className="col-md">
      <div className="mt-3">
        <div className="card">
          <div className="card-header text-center">Checkout</div>
          <div className="card-body">
            <div className="col-md">
              <h3>Konfirmasi</h3>
            </div>
            <div className="col-md my-5">
              <table className="table">
                <tr>
                  <th>Alamat</th>
                  <td>Alamat Pengiriman</td>
                </tr>
                <tr>
                  <th>Sub Total</th>
                  <td>Rp. 230.000</td>
                </tr>
                <tr>
                  <th>Ongkir</th>
                  <td>Rp. 20.000</td>
                </tr>
                <tr>
                  <th>Total</th>
                  <td>Rp. 250.000</td>
                </tr>
              </table>
            </div>
            <div className="col-md">
              <div className="d-flex justify-content-between align-items-center">
                <button className="btn btn-primary">Sebelumnya</button>
                <button className="btn btn-success">Bayar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPage;
