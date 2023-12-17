import React from "react";
import { useCart, useDispatchCart } from "../components/ContextReducer";

const CartData = () => {
  let data = useCart();
  let dispatch = useDispatchCart();
  let totalPrice = data?.reduce((total, food) => total + food.price, 0);

  // const handleRemove = (index)=>{
  //   console.log(index)
  //   dispatch({type:"REMOVE",index:index})
  // }

  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");
    // console.log(data,localStorage.getItem("userEmail"),new Date())
    let response = await fetch("http://localhost:4200/api/orderData", {
      // credentials: 'include',
      // Origin:"http://localhost:3000/login",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        orderDate: new Date().toDateString(),
      }),
    });
    console.log("JSON RESPONSE:::::", response.status);
    if (response.status === 200) {
      dispatch({ type: "DROP" });
    }
  };
  return (
    <div>
      <div className="container m-auto mt-5 table-responsive table-responsive-md table-responsive-sm">
        {data.length === 0 ? (
          <div>
            <div className="m-5 w-100 text-white fs-3">The Cart is Empty!</div>
          </div>
        ) : (
          <table className="table table-hover">
            <thead className=" fs-5">
              <tr className="table-success">
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Quantity</th>
                <th scope="col">Options</th>
                <th scope="col">Amount</th>
                <th scope="col">Remove Item</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((food, index) => (
                <tr className="table-success">
                  <th scope="row" key={data.index}>
                    {index + 1}
                  </th>
                  <td>{food.name}</td>
                  <td>{food.qty}</td>
                  <td>{food.size}</td>
                  <td>{food.price}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={() => {
                        dispatch({ type: "REMOVE", index: index });
                      }}
                    >
                      Delete
                    </button>{" "}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <div>
          <h1 className="fs-5 text-white">Total Price: {totalPrice}/-</h1>
        </div>
        <div
          className="btn bg-success text-white  mt-5"
          onClick={handleCheckOut}
        >
          Check Out
        </div>
      </div>
    </div>
  );
};

export default CartData;
