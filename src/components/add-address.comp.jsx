/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";
import { memo, useState } from "react";
import { createAddress } from "../app/apis/address.api";

const AddAddressComp = ({ isAddAddress, setIsAddAddress }) => {
  const [value, setValue] = useState({
    name: "",
    detail: "",
    kelurahan: "",
    kecamatan: "",
    kabupaten: "",
    provinsi: "",
  });
  const [isLoading, setLoading] = useState(false);
  const [errorLog, setErrorLog] = useState({});
  console.log("render");
  const handleChange = (e) => {
    setValue((preValue) => {
      return {
        ...preValue,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading((isLoading) => !isLoading);
    createAddress(value)
      .then((response) => {
        console.log(response.data);
        alert("Success Added Address!");
        setErrorLog({});
        setValue({
          name: "",
          detail: "",
          kelurahan: "",
          kecamatan: "",
          kabupaten: "",
          provinsi: "",
        });
        setLoading(false);
        setIsAddAddress(!isAddAddress);
      })
      .catch((error) => {
        setLoading(false);
        const { name, detail, kelurahan, kecamatan, kabupaten, provinsi } =
          error.response.data.fields;
        if (name) {
          setErrorLog((preError) => ({
            ...preError,
            name: name.message,
          }));
        } else {
          setErrorLog((preError) => ({
            ...preError,
            name: "",
          }));
        }
        if (detail) {
          setErrorLog((preError) => ({ ...preError, detail: detail.message }));
        } else {
          setErrorLog((preError) => ({
            ...preError,
            detail: "",
          }));
        }
        if (kelurahan) {
          setErrorLog((preError) => ({
            ...preError,
            kelurahan: kelurahan.message,
          }));
        } else {
          setErrorLog((preError) => ({
            ...preError,
            kelurahan: "",
          }));
        }

        if (kecamatan) {
          setErrorLog((preError) => ({
            ...preError,
            kecamatan: kecamatan.message,
          }));
        } else {
          setErrorLog((preError) => ({
            ...preError,
            kecamatan: "",
          }));
        }

        if (kabupaten) {
          setErrorLog((preError) => ({
            ...preError,
            kabupaten: kabupaten.message,
          }));
        } else {
          setErrorLog((preError) => ({
            ...preError,
            kabupaten: "",
          }));
        }

        if (provinsi) {
          setErrorLog((preError) => ({
            ...preError,
            provinsi: provinsi.message,
          }));
        } else {
          setErrorLog((preError) => ({
            ...preError,
            provinsi: "",
          }));
        }
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-md">
          <div className="mb-3">
            <label htmlFor="alamat" className="form-label">
              Nama Alamat
            </label>
            <input
              type="text"
              className="form-control"
              id="alamat"
              name="name"
              value={value.name}
              onChange={handleChange}
            />
            <div className="mt-1 fst-italic text-danger">{errorLog.name}</div>
          </div>
          <div className="mb-3">
            <label htmlFor="alamat-detail" className="form-label">
              Alamat Detail
            </label>
            <textarea
              className="form-control"
              id="alamat-detail"
              style={{ height: "210px" }}
              name="detail"
              value={value.detail}
              onChange={handleChange}
            ></textarea>
            <div className="mt-1 fst-italic text-danger">{errorLog.detail}</div>
          </div>
        </div>
        <div className="col-md">
          <div className="mb-3">
            <label htmlFor="provinsi" className="form-label">
              Provinsi
            </label>
            <input
              type="text"
              className="form-control"
              id="provinsi"
              name="provinsi"
              value={value.provinsi}
              onChange={handleChange}
            />
            <div className="mt-1 fst-italic text-danger">
              {errorLog.provinsi}
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="kabupaten" className="form-label">
              Kabupaten
            </label>
            <input
              type="text"
              className="form-control"
              id="kabupaten"
              name="kabupaten"
              value={value.kabupaten}
              onChange={handleChange}
            />
            <div className="mt-1 fst-italic text-danger">
              {errorLog.kabupaten}
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="kecamatan" className="form-label">
              Kecamatan
            </label>
            <input
              type="text"
              className="form-control"
              id="kecamatan"
              name="kecamatan"
              value={value.kecamatan}
              onChange={handleChange}
            />
            <div className="mt-1 fst-italic text-danger">
              {errorLog.kecamatan}
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="kelurahan" className="form-label">
              Kelurahan/Desa
            </label>
            <input
              type="text"
              className="form-control"
              id="kelurahan"
              name="kelurahan"
              value={value.kelurahan}
              onChange={handleChange}
            />
            <div className="mt-1 fst-italic text-danger">
              {errorLog.kelurahan}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md">
            <button type="submit" className="btn btn-warning">
              {isLoading ? "Process.." : "Simpan"}
            </button>
            <button
              type="submit"
              className="mx-3 btn btn-primary"
              onClick={() => setIsAddAddress(false)}
            >
              Batal
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default memo(AddAddressComp);
AddAddressComp.propTypes = {
  isAddAddress: PropTypes.bool,
  setIsAddAddress: PropTypes.func,
};
