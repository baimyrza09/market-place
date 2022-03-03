import React, { useContext, useEffect, useState } from "react";
import { productsContext } from "../../contexts/ProudctsContext";
import ProductCard from "./ProductCard";
import { Link, useHistory } from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";
import './ProductList.css'
const ProductsList = () => {
  const { products, getProducts, totalCount } = useContext(productsContext);
  const [expanded, setExpanded] = React.useState(false);
  const [gender,setGender] = useState('');
  const history = useHistory();

  useEffect(() => {
    getProducts();
  }, []);
 
  const handleChange = (panel) => (event, isExpanded) => {
    setGender(panel)
    setExpanded(isExpanded ? panel : false);
  };

  function fetchParams(gender, type) {
    if (type === "") {
        const query = new URLSearchParams(history.location.search);
        query.set("gender", gender);
        query.set("type", "");
        history.push("?" + query)
      getProducts();
      
    }
    if(gender == 'all') {
      console.log('DSADAS')
      history.replace('/list')
      getProducts();
      return
    }

    const query = new URLSearchParams(history.location.search);
    query.set("gender", gender);
    query.set("type", type);
    history.push("/list" + "?" + query)
    getProducts();
  }

  function pageCount() {
    return totalCount / 4;
  }

  function handlePagination(...args) {
    getProducts("", args[1]);
    let params = window.location.search.replace(/%3D/g, '')
  }

  return (
    <div className="d-flex justify-content-center flex-wrap">
      <div className="col-md-3 col-sm-4 col-xs-4 col-12 sidebar">
      <button
            className="menu__item btn"
            value="all"
            square
            expanded={expanded === "all"}
            onClick={(e) => fetchParams("all", "")}
          >
            Все
          </button>
        <button
          className="menu__item btn"
          value="man"
          data-toggle="collapse"
          data-target="#collapseExample"
          aria-expanded="false"
          aria-controls="collapseExample"
          onClick={(e) => fetchParams("man", "")}
        >
          Мужские
        </button>
        <button
          className="menu__item btn pl-5"
          value="jackets"
          onClick={(e) => fetchParams("man", "jackets")}  
        >
          Куртки
        </button>
        <button
          className="menu__item btn pl-5"
          value="trousers"
          onClick={(e) => fetchParams("man", "trousers")}
        >
          Брюки
        </button>
        <button
          className="menu__item btn pl-5"
          value="shirts"
          onClick={(e) => fetchParams("man", "shirts")}
        >
          Рубашки
        </button>

        <button
            className="menu__item btn"
            value="woman"
            data-toggle="collapse"
            data-target="#collapseExample1"
            aria-expanded="false"
            aria-controls="collapseExample"
            onClick={(e) => fetchParams("woman", "")}
          >
            Женские
          </button>

          <button
              className="menu__item btn pl-5"
              value="jackets"
              onClick={(e) => fetchParams("woman", "jackets")}
            >
              Куртки
            </button>
            <button
              className="menu__item btn pl-5"
              value="sweater"
              onClick={(e) => fetchParams("woman", "trousers")}
            >
              Брюки
            </button>
            <button className="menu__item btn pl-5" value="shirt"  onClick={(e) => fetchParams("woman", "shirts")}>
              Рубашки
            </button>


      </div>
      <div className="col-md-9 col-sm-8 col-xs-8 d-flex justify-content-start flex-wrap">
        {products.map((item) => (
          <ProductCard item={item} key={item.id} />
        ))}

        <div className="d-flex justify-content-center col-md-12">
          <Pagination
            count={Math.ceil(pageCount())}
            onChange={handlePagination}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductsList;
