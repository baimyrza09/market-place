import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { productsContext } from "../../contexts/ProudctsContext";
import { calcSubPrice, calcTotalPrice } from "../../helpers//CalcPrice";

const Cart = () => {
  const { cartData, getCart, changeCountProducts, makeOrder, deleteProductInCart } = useContext(
    productsContext
  );
  useEffect(() => {
    getCart();
  }, []);

  function handleChangeCount(e, id) {
    changeCountProducts(e.target.value, id);
  }
  return (
    <div className="cart">
      {cartData?.products ? (
        <div>
          <table className="table col-md-12 ">
            <thead>
              <tr>
                <th scope="col">image</th>
                <th scope="col">title</th>
                <th scope="col">price</th>
                <th scope="col">count</th>
                <th scope="col">subTotal</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {cartData.products.map((item) => (
                <tr key={item.product.id}>
                  <td>
                    <img style={{ width: "50px" }} src={item.product.img} />
                  </td>
                  <td>{item.product.title}</td>
                  <td>{item.product.price}</td>
                  <td>
                    <input
                      onChange={(e) => handleChangeCount(e, item.product.id)}
                      value={item.count}
                      type="number"
                      value={item.count}
                      style={{width: "50px"}}
                      min = "1"
                    />
                  </td>
                  <td>{calcSubPrice(item)}</td>
                  <td> <button className="btn" onClick={()=> deleteProductInCart(item.product.id)} style={{width: "105px", backgroundColor: '#791188', color: "white",  marginTop: '0'}} >Удалить</button></td>
                </tr>
              ))}
            </tbody>
          </table>
              <h4>Total: {calcTotalPrice(cartData.products)}</h4>

              <Link to="/credit">
              <button className="btn" style={{width: "105px", backgroundColor: '#791188', color: "white",  marginTop: '0'}} onClick={makeOrder}>Оплатить</button>
              </Link>
        </div>
      ) : (
       <h1>Корзина пустая</h1>
      )}
    </div>
  );
};

export default Cart;
