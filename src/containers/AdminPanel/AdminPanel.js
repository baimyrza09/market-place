import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { adminContext } from "../../contexts/AdminContext";

const AdminPanel = () => {
  const {
    products,
    getProductsData,
    addNewProduct,
    deleteProduct,
    editProduct,
  } = useContext(adminContext);
  const [product, setProduct] = useState({});

  useEffect(() => {
    getProductsData();
  }, []);

  function handleInputsValue(e) {
    let obj = {
      ...product,
      [e.target.name]: e.target.value,
      comments: []
    };
    setProduct(obj);
  }

  function handleClick() {
    addNewProduct(product);
    let newObj = {
      title: "",
      description: "",
      price: "",
      img: "",
    };
    setProduct(newObj);
  }

  return (
    <div>
      <form className="form-inline d-flex justify-content-center">
        <div className="form-group  mt-2 mb-2">
          <input
            name="title"
            onChange={handleInputsValue}
            type="text"
            placeholder="title"
            value={product.title}
            className="form-control mr-3"
          />
          <input
            name="description"
            onChange={handleInputsValue}
            type="text"
            placeholder="description"
            value={product.description}
            className="form-control mr-3"
          />
          <input
            name="price"
            onChange={handleInputsValue}
            type="text"
            placeholder="price"
            value={product.price}
            className="form-control mr-3"
          />
          <input
            name="img"
            onChange={handleInputsValue}
            type="text"
            placeholder="img"
            value={product.img}
            className="form-control mr-3"
          />
          <select
            onChange={handleInputsValue}
            name="gender"
            className="custom-select my-1 mr-sm-2"
            id="inlineFormCustomSelectPref"
          >
            <option selected>Gender...</option>
            <option value="man">Man</option>
            <option value="woman">Woman</option>
          </select>
          <select
            onChange={handleInputsValue}
            name="type"
            className="custom-select my-1 mr-sm-2 "
            id="inlineFormCustomSelectPref"
          >
            <option selected>Type...</option>
            <option value="jackets">Jackets</option>
            <option value="shirts">Shirts</option>
            <option value="trousers">Trousers</option>
          </select>

          <button
            type="button"
            className="btn"
            style={{ backgroundColor: "#791188", color: "#fff" }}
            onClick={handleClick}
          >
            Add
          </button>
        </div>
      </form>

      <table className="table">
        <thead style={{ backgroundColor: "#791188", color: "#fff" }}>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Description</th>
            <th scope="col">Price</th>
            <th scope="col">Img</th>
            <th scope="col">Genger</th>
            <th scope="col">Type</th>
            <th scope="col">Delete</th>
            <th scope="col">Edit</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item) => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>{item.description}</td>
              <td>{item.price}</td>
              <td><img src={item.img} style={{ width: "50px" }}/></td>
              <td>{item.gender}</td>
              <td>{item.type}</td>

              <td>
                <button
                  onClick={() => deleteProduct(item.id)}
                  type="button"
                  className="btn"
                  style={{ backgroundColor: "#791188", color: "#fff" }}
                >
                  delete
                </button>
              </td>
              <td>
                <Link to="/adminedit">
                  <button
                    onClick={() => editProduct(item.id)}
                    type="button"
                    className="btn"
                    style={{ backgroundColor: "#791188", color: "#fff" }}
                  >
                    edit
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;
