import React, { useState, useEffect, useRef } from "react";
import { useCart, useDispatchCart } from "./ContextReducer";

const Card = (props) => {
  const [qty, setqty] = useState(1);
  const [size, setsize] = useState("");
  const priceRef = useRef();
  let dispatch = useDispatchCart();
  let options = props.options;
  let priceOptions = Object.keys(options);
  let data = useCart();
  const AddToCart = async () => {
    let food = [];
    for (const item of data) {
      if (item.id === props.foodItem._id) {
        food = item;
        break;
      }
    }

    console.log("food", food);
    if (!food == []) {
      if (food.size === size) {
        await dispatch({
          type: "UPDATE",
          id: props.foodItem._id,
          price: finalPrice,
          qty: qty,
        });
        return;
      } else if (food.size !== size) {
        await dispatch({
          type: "ADD",
          id: props.foodItem._id,
          name: props.foodItem.name,
          price: finalPrice,
          qty: qty,
          size: size,
          // img: props.ImgSrc,
        });
        console.log("Size different so simply ADD one more to the list");
        return;
      }
      return;
    }

    await dispatch({
      type: "ADD",
      id: props.foodItem._id,
      name: props.foodItem.name,
      price: finalPrice,
      qty: qty,
      size: size,
    });
    // console.log("data", data);
  };

  let finalPrice = qty * parseInt(options[size]);

  useEffect(() => {
    setsize(priceRef.current.value);
  }, []);
  return (
    <div>
      <div
        className="card mt-3 "
        style={{ width: "18rem", maxHeight: "360px " }}
      >
        <img
          src={props.foodItem.img}
          className="card-img-top"
          alt="..."
          style={{ height: "12rem", objectFit: "fill" }}
        />
        <div className="card-body bg-success">
          <h5 className="card-title">{props.foodItem.name}</h5>
          <div className="container w-100 ">
            <select
              className="m-2 rounded "
              onChange={(e) => setqty(e.target.value)}
            >
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i} value={i + 1}>
                    {i + 1}
                  </option>
                );
              })}
            </select>
            <select
              className="m-2 rounded"
              ref={priceRef}
              onChange={(e) => setsize(e.target.value)}
            >
              {priceOptions.map((data) => {
                return (
                  <option key={data} value={data}>
                    {data}
                  </option>
                );
              })}
            </select>

            <div className="d-inline h-100 fs-5">${finalPrice}/-</div>
            <hr />
            <button className="btn btn-warning ms-2" onClick={AddToCart}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
