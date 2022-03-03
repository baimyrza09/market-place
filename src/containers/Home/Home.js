import React, { useEffect, useState } from "react";
import axios from "axios";
import { JSON_API } from "../../helpers/constants";
import { Link } from "react-router-dom";

const Home = () => {
  const [limitProducts, setLimitProducts] = useState([]);

  async function getLimiProducts() {
    const { data } = await axios(`${JSON_API}/products?_limit=12`);
    setLimitProducts(data);
  }

  useEffect(() => {
    getLimiProducts();
  }, []);

  return (
    <div>
      <div
        id="carouselExampleControls"
        className="carousel slide mr-3 ml-3 mt-4 mb-4"
        data-ride="carousel"
      >
        <div className="carousel-inner" style={{ borderRadius: "15px" }}>
          <div className="carousel-item active">
            <img
              className="d-block w-100"
              src="https://images.wbstatic.net/bners1/big_winter_sale_2212.jpg"
              alt="First slide"
            />
          </div>
          <div className="carousel-item">
            <img
              className="d-block w-100"
              src="https://images.wbstatic.net/bners1/big_gift_men_2212.jpg"
              alt="Second slide"
            />
          </div>
          <div className="carousel-item">
            <img
              className="d-block w-100"
              src="https://images.wbstatic.net/bners1/big_gift_kids_2212.jpg"
              alt="Third slide"
            />
          </div>
        </div>
        <a
          className="carousel-control-prev"
          href="#carouselExampleControls"
          role="button"
          data-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Previous</span>
        </a>
        <a
          className="carousel-control-next"
          href="#carouselExampleControls"
          role="button"
          data-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Next</span>
        </a>
      </div>

      <div>
        <h2
          style={{ fontSize: "35px", fontWeight: "700", color: "black" }}
          className="ml-3"
        >
          Возможно, Вам понравится
        </h2>
        <div className="d-flex justify-content-center mr-2 ml-2 flex-wrap">
          {limitProducts?.map((item) => (
            <div
              key={item.id}
              className="card col-md-2 col-sm-4 col-xs-12"
              style={{ width: "18rem", border: "none" }}
            >
               <Link to={`/details/${item.id}`}>
            
              <img className="card-img-top" src={item.img} alt="Card image cap" />
              </Link>
              <div className="card-body" style={{ padding: "0" }}>
                <h5 className="card-title">{item.price}</h5>
                <p className="card-text">
                  {item.title} / {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
