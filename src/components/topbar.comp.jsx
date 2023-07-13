import Container from "react-bootstrap/Container";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";
import { CartFill, PersonFill } from "react-bootstrap-icons";
import { useSelector } from "react-redux";

function TopbarComp() {
  const carts = useSelector((state) => state.carts);
  const navigate = useNavigate();

  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary p-3">
        <Container>
          <Link to="/" style={{ textDecoration: "white" }}>
            <Navbar.Brand>Pos System</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className=" ">
            <Nav className="me-auto">{""}</Nav>
            <div className="position-relative d-flex gap-4 justify-content-center align-items-center">
              <span className="position-relative">
                <Link to="cart">
                  <CartFill color="dark" size={20} />
                </Link>
                {carts.length ? (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {carts.length || ""}
                  </span>
                ) : (
                  ""
                )}
              </span>
              <span onClick={() => navigate("account")} role="button">
                <PersonFill size={20} color="dark" />
              </span>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
}

export default TopbarComp;
