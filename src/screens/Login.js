import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [formValue, setformValue] = useState({
    email: "",
    password: "",
  });
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const fetchData = await fetch("http://localhost:4200/api/loginUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formValue.email,
        password: formValue.password,
      }),
    });
    const data = await fetchData.json();

    if (data) {
      localStorage.setItem("userEmail", formValue.email);
      localStorage.setItem("AuthToken", data.authToken);
      // console.log(localStorage.getItem("AuthToken"));
      navigate("/");
    } else {
      alert("Please Entered Valid Details");
    }

    console.log("data", data);
  };
  const handleChange = (e) => {
    setformValue({ ...formValue, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              name="email"
              value={formValue.email}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formValue.password}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>

          <Link to="/signup" className="m-3">
            Don't Have Account?
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
