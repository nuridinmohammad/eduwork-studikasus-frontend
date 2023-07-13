/* eslint-disable react-refresh/only-export-components */
import PropTypes from "prop-types";
import { memo, useEffect, useState } from "react";
import { getAddress } from "../app/apis/address.api";

const AddressComp = ({ isAddAddress, setIsAddAddress }) => {
  const [address, setAddress] = useState([]);

  useEffect(() => {
    getAddress()
      .then((res) => setAddress(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <div className="row">
        <div className="col-md">
          <button
            className="btn btn-primary"
            onClick={() => setIsAddAddress(!isAddAddress)}
          >
            + Tambbah Alamat
          </button>
        </div>
      </div>
      <div className="col-md mt-3">
        <table className="table table-borderless">
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Nama Alamat</th>
              <th scope="col">Alamat Detail</th>
            </tr>
          </thead>
          <tbody>
            {address.length ? (
              address.map((item, i) => (
                <tr key={item._id}>
                  <td>{i + 1}.</td>
                  <td>{item.name}</td>
                  <td>{item.detail}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="text-muted">No have any Address</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default memo(AddressComp);

AddressComp.propTypes = {
  isAddAddress: PropTypes.bool,
  setIsAddAddress: PropTypes.func,
};
