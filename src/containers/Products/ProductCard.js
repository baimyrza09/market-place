import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./ProductCard.css";
import { productsContext } from "../../contexts/ProudctsContext";

const ProductCard = ({ item }) => {
  const { addAndDeleteProductInCart, checkProductInCard } = useContext(
    productsContext
  );
  return (
    <div
      key={item.id}
      className="card col-md-3 col-sm-6 col-xs-11 mb-4"
      style={{ width: "18rem", border: "none" }}
    >
      <Link to={`/details/${item.id}`}>
        <img className="card-img-top" src={item.img} alt="Card image cap" />
      </Link>
      <div className="card-body" style={{ padding: "0" }}>
        <h5 className="card-title">{item.price}</h5>
        <p className="card-text">
          {item.title} / {item.description.slice(0, 13)}...
        </p>
        {checkProductInCard(item.id) ? (
          <button onClick={() => addAndDeleteProductInCart(item)} className="btn" style={{width: "105px", backgroundColor: '#791188', color: "white", marginTop: '0'}}>
             В Корзине
          </button>
        ) : (
          <button onClick={() => addAndDeleteProductInCart(item)} className="btn" style={{width: "105px", backgroundColor: '#791188', color: "white",  marginTop: '0'}}>
            Купить
          </button>
        )}
       
      </div>
    </div>
  );
};

export default ProductCard;
