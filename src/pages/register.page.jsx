import { useState } from "react";
import { registerUser } from "../app/apis/auth.api";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
  // state
  const [value, setValue] = useState({
    fullname: "",
    email: "",
    password: "",
  });
  const [errorLog, setErrorLog] = useState({});
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  //handle
  const handleChange = (e) => {
    setValue((preValue) => ({
      ...preValue,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading((isLoading) => !isLoading);
    registerUser(value)
      .then((response) => {
        console.log(response.data);
        alert("Success Register!");
        setErrorLog({});
        setValue({
          fullname: "",
          email: "",
          password: "",
        });
        setLoading(false);
        navigate("/login");
      })
      .catch((error) => {
        setLoading(false);
        const { fullname, email, password } = error.response.data.fields;
        if (fullname) {
          setErrorLog((preError) => ({
            ...preError,
            fullname: fullname.message,
          }));
        } else {
          setErrorLog((preError) => ({
            ...preError,
            fullname: "",
          }));
        }
        if (email) {
          setErrorLog((preError) => ({ ...preError, email: email.message }));
        } else {
          setErrorLog((preError) => ({
            ...preError,
            email: "",
          }));
        }
        if (password) {
          setErrorLog((preError) => ({
            ...preError,
            password: password.message,
          }));
        } else {
          setErrorLog((preError) => ({
            ...preError,
            password: "",
          }));
        }
      });
  };
  return (
    <div className="col-sm">
      <div className="d-flex justify-content-center align-items-center">
        <div className="mt-5" style={{ width: "40rem" }}>
          <div className="card">
            <div className="card-header text-center">Register</div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="fullname" className="form-label">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="fullname"
                    name="fullname"
                    onChange={handleChange}
                    value={value.fullname}
                  />
                  <div className="mt-1 text-danger fst-italic">
                    {errorLog.fullname}
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    onChange={handleChange}
                    value={value.email}
                  />
                  <div className="mt-1 text-danger fst-italic">
                    {errorLog.email}
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    name="password"
                    onChange={handleChange}
                    value={value.password}
                  />
                  <div className="mt-1 text-danger fst-italic">
                    {errorLog.password}
                  </div>
                </div>

                <button type="submit" className="btn btn-primary">
                  {isLoading ? "Loading.." : "Register"}
                </button>
              </form>
              <div className="mt-2">
                <span className="mx-1">Sudah punya akun?</span>
                <Link to="/login">login</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
