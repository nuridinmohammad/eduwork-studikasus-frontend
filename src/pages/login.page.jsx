import { useState } from "react";
import { loginUser } from "../app/apis/auth.api";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogin } from "../app/features/auth/actions.auth";

const LoginPage = () => {
  // state
  const [value, setValue] = useState({
    email: "",
    password: "",
  });
  const [errorLog, setErrorLog] = useState({});
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    loginUser(value)
      .then((response) => {
        alert(response.data.message);
        localStorage.setItem("auth", JSON.stringify(response.data));
        dispatch(userLogin(response.data));
        setErrorLog({});
        setValue({
          email: "",
          password: "",
        });
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        const { message } = error.response.data;

        if (message) {
          setErrorLog((preError) => ({
            ...preError,
            message: message,
          }));
        } else {
          setErrorLog((preError) => ({
            ...preError,
            message: "",
          }));
        }
      });
  };

  return (
    <div className="col-sm">
      <div className="d-flex justify-content-center align-items-center">
        <div className="mt-5" style={{ width: "40rem" }}>
          <div className="card">
            <div className="card-header text-center">Login</div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <div className="mt-1 text-danger fst-italic">
                    {errorLog.message ? errorLog.message : ""}
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
                </div>
                <button type="submit" className="btn btn-primary">
                  {isLoading ? "Loading.." : "Login"}
                </button>
              </form>
              <div className="mt-2">
                <span className="mx-1">Belum punya akun?</span>
                <Link to="/register">register</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
