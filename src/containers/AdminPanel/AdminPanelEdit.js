import React, { useContext, useEffect, useState } from "react";
import { adminContext } from "../../contexts/AdminContext";

const AdminPanelEdit = (props) => {
  const { productToEdit, saveProduct } = useContext(adminContext);
  const [newEditItem, setNewEditItem] = useState(productToEdit);
  console.log(productToEdit);

  useEffect(() => {
    setNewEditItem(productToEdit);
  }, [productToEdit]);

  function handleEditInput(e) {
    let newProduct = {
      ...newEditItem,
      [e.target.name]: e.target.value,
    };
    setNewEditItem(newProduct);
  }

  

  return (
    <div>
      <table className="table mt-5">
        <thead style={{ backgroundColor: "#791188", color: "#fff" }}>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Description</th>
            <th scope="col">Price</th>
            <th scope="col">Img</th>
            <th scope="col">Gender</th>
            <th scope="col">Type</th>
            <th scope="col">save</th>
          </tr>
        </thead>
        <tbody >
          {newEditItem ? (
            <tr key={newEditItem.id}>
              <td>
                <input
                  value={newEditItem.title}
                  type="text"
                  name="title"
                  onChange={handleEditInput}
                  placeholder="title"
                />
              </td>
              <td>
                <input
                  value={newEditItem.description}
                  type="text"
                  name="description"
                  onChange={handleEditInput}
                  placeholder="description"
                />
              </td>
              <td>
                <input
                  value={newEditItem.price}
                  type="text"
                  name="price"
                  onChange={handleEditInput}
                  placeholder="price"
                />
              </td>
              <td>
                <input
                  value={newEditItem.img}
                  type="text"
                  name="img"
                  onChange={handleEditInput}
                  placeholder="img"
                />
              </td>

              <select
              style={{width: "150px"}}
                onChange={handleEditInput}
                name="gender"
                className="custom-select my-1 mr-sm-2 mt-4"
                id="inlineFormCustomSelectPref"
              >
                <option selected >{newEditItem.gender}</option>
                <option value="man">Man</option>
                <option value="woman">Woman</option>
              </select>
              <select
                style={{width: "150px"}}
                onChange={handleEditInput}
                value={handleEditInput.type}
                name="type"
                className="custom-select my-1 mr-sm-2 mt-4"
                id="inlineFormCustomSelectPref"
              >
                <option selected>{newEditItem.type}</option>
                <option value="jackets">Jackets</option>
                <option value="shirts">Shirts</option>
                <option value="trousers">Trousers</option>
              </select>

              <td>
                <button
                  onClick={() => saveProduct(newEditItem, props.history)}
                  type="button"
                  className="btn"
                  style={{ backgroundColor: "#791188", color: "#fff" }}
                >
                  save
                </button>
              </td>
            </tr>
          ) : (
            <h1>loading...</h1>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanelEdit;
