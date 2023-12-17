import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Modal from "../Modal";
import CartData from "../screens/CartData";
import { useCart } from "./ContextReducer";

const Navbar = () => {
  const [cartView, setcartView] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    localStorage.removeItem("AuthToken");
    navigate("/login");
  };

  const items = useCart();

  return (
    <div>
      <nav
        className="navbar navbar-expand-lg fw-bold bg-success"
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <NavLink className="navbar-brand fs-1  fst-italic" to="/">
            FoodArt
          </NavLink>

          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <ul className="navbar-nav me-auto ">
              <li className="nav-item">
                <NavLink className="nav-link  fs-5" aria-current="page" to="/">
                  Home
                </NavLink>
              </li>
              {localStorage.getItem("AuthToken") ? (
                <li className="nav-item">
                  <NavLink
                    className="nav-link  fs-5"
                    aria-current="page"
                    to="/myorders"
                  >
                    My Order
                  </NavLink>
                </li>
              ) : (
                ""
              )}
            </ul>
            {!localStorage.getItem("AuthToken") ? (
              <div className="d-flex">
                <NavLink
                  className="btn bg-white text-success mx-1"
                  to="/signup"
                >
                  SignUp
                </NavLink>
                <NavLink className="btn bg-white text-success mx-1" to="/login">
                  Login
                </NavLink>
              </div>
            ) : (
              <div className="d-flex">
                <div
                  className="btn bg-white text-success mx-2"
                  onClick={() => setcartView(true)}
                >
                  My Cart{" "}
                  <span class="badge text-bg-danger">{items?.length}</span>
                </div>
                {cartView ? (
                  <Modal onClose={() => setcartView(false)}>
                    <CartData />
                  </Modal>
                ) : (
                  ""
                )}
                <div
                  className="btn bg-white text-danger mx-2"
                  onClick={handleClick}
                >
                  Logout
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
