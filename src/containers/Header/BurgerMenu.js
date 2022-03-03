import React, { useContext, useState } from "react";
// import { cafesContext } from "../../contexts/CafesContext";
import "./BurgerMenu.css";
import { Link, useHistory } from "react-router-dom";
import { productsContext } from "../../contexts/ProudctsContext";

const HamburgerMenu = () => {
  const { getProducts } = useContext(productsContext);
  const [expanded, setExpanded] = React.useState(false);
  const [gender, setGender] = useState("");
  const history = useHistory();

  const handleChange = (panel) => (event, isExpanded) => {
    setGender(panel);
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

  return (
    <div>
      <div className="hamburger-menu">
        <input id="menu__toggle" type="checkbox" />
        <label className="menu__btn" htmlFor="menu__toggle">
          <span></span>
        </label>
        <ul className="menu__box">
          {/* <Link  to="/list"> */}
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

          {/* <Link to="/list" style={{ textDecoration: "none" }}> */}
            <div className="collapse" id="collapseExample">
              <button
                className="menu__item btn pl-5"
                value="jackets"
                onClick={(e) => fetchParams("man", "")}
              >
                Все Мужские
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
            </div>
          {/* </Link> */}

          <button
            className="menu__item btn"
            value="woman"
            data-toggle="collapse"
            data-target="#collapseExample1"
            aria-expanded="false"
            aria-controls="collapseExample"
            square
            expanded={expanded === "woman"}
          >
            Женские
          </button>
          {/* <Link to="/list" style={{ textDecoration: "none" }}> */}
            <div className="collapse" id="collapseExample1">
              <button
                className="menu__item btn pl-5"
                value="jackets"
                onClick={(e) => fetchParams("woman", "")}
              >
                Все Женские
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
                value="trousers"
                onClick={(e) => fetchParams("woman", "trousers")}
              >
                Брюки
              </button>
              <button
                className="menu__item btn pl-5"
                value="shirts"
                onClick={(e) => fetchParams("woman", "shirts")}
              >
                Рубашки
              </button>
            </div>
          {/* </Link> */}
        </ul>
      </div>
    </div>
  );
};

export default HamburgerMenu;
