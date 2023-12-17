import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Footer from "../components/Footer";

const Home = () => {
  const [searchItem, setsearchItem] = useState("");
  const [foodItems, setfoodItems] = useState([]);
  const [foodCategory, setfoodCategory] = useState([]);

  const loadData = async () => {
    let response = await fetch("http://localhost:4200/api/foodItems", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    response = await response.json();
    setfoodItems(response[0]);
    setfoodCategory(response[1]);
    // console.log("first", response[0], response[1]);
  };

  useEffect(() => {
    loadData();
  }, []);
  return (
    <div>
      <div>
        <Navbar />
      </div>

      <div id="carouselExampleFade" className="carousel slide carousel-fade">
        <div className="carousel-inner" style={{ maxHeight: "550px" }}>
          <div className="carousel-caption" style={{ zIndex: "10" }}>
            <div className="d-flex" role="search">
              <input
                className="form-control "
                type="search"
                onChange={(e) => setsearchItem(e.target.value)}
                placeholder="Search"
                aria-label="Search"
              />
            </div>
          </div>
          <div className="carousel-item active">
            <img
              src="https://source.unsplash.com/random/900×700/?pizza"
              className="d-block w-100"
              style={{ filter: "brightness(30%)" }}
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://source.unsplash.com/random/900×700/?burger"
              className="d-block w-100"
              style={{ filter: "brightness(30%)" }}
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://source.unsplash.com/random/900×700/?noodles"
              className="d-block w-100"
              style={{ filter: "brightness(30%)" }}
              alt="..."
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <div className="container ">
        {!foodCategory == []
          ? foodCategory.map((data) => {
              return (
                <div className="row mb-3">
                  <div key={data._id} className="fs-5 m-2">
                    {data.CategoryName}
                  </div>
                  <hr />
                  {!foodItems == []
                    ? foodItems
                        .filter(
                          (items) =>
                            items.CategoryName === data.CategoryName &&
                            items.name
                              .toLowerCase()
                              .includes(searchItem.toLocaleLowerCase())
                        )
                        .map((filterItems) => {
                          return (
                            <div
                              key={filterItems._id}
                              className="col-12 col-md-6 col-lg-3"
                            >
                              <Card
                                foodItem={filterItems}
                                options={filterItems.options[0]}
                              />
                            </div>
                          );
                        })
                    : "No Such Data Found!"}
                </div>
              );
            })
          : ""}
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
