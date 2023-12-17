import React, { useState } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [formValue, setformValue] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();

    const fetchData = await fetch("http://localhost:4200/api/createUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formValue.name,
        email: formValue.email,
        password: formValue.password,
      }),
    });
    const data = await fetchData.json();

    console.log("data", data);
  };
  const handleChange = (e) => {
    setformValue({ ...formValue, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="mb-3 ">
            <label htmlFor="exampleInputName" className="form-label">
              UserName
            </label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              value={formValue.name}
              className="form-control"
            />
          </div>
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

          <Link to="/login" className="m-3">
            Already Have Account?
          </Link>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
