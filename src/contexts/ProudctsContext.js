import React, { useReducer } from "react";
import axios from "axios";
import { JSON_API } from "../helpers/constants";
import { calcSubPrice, calcTotalPrice } from "../helpers/CalcPrice";
import { Link, useHistory } from "react-router-dom";

export const productsContext = React.createContext();

const INIT_STATE = {
  products: [],
  prouctDeatails: null,
  productsCountInCart: JSON.parse(localStorage.getItem("cart"))
    ? JSON.parse(localStorage.getItem("cart")).products.length
    : 0,
  cartData: {},
  totalCount: 0,
  totalSum: null,
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "GET_PRODUCTS":
      return { ...state, products: action.payload };
    case "GET_PRODUCTS_DETAILS":
      return { ...state, productDeatails: action.payload };
    case "ADD_AND_DELETE_IN_CART":
      return { ...state, productsCountInCart: action.payload };
    case "GET_CART":
      return { ...state, cartData: action.payload };
    case "SET_TOTAL_COUNT":
      return { ...state, totalCount: action.payload };
    case "GET_SUM":
      return { ...state, totalSum: action.payload };
    default:
      return state;
  }
};

const ProductsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);
  const history = useHistory();

  async function getProducts(search = "", page = 1) {
    let params = window.location.search.replace(/%3D/g, "");
    if (!params) params = "?";
    if (search) search = "q=" + search;

    if (params == "?gender=man&type=") params = params.slice(0, 11);
    if (params == "?gender=woman&type=") params = params.slice(0, 13);
    if (params == "?gender=all&type=") return;

    let { data, headers } = await axios(
      `${JSON_API}/products${params}&${search}&_page=${page}&_limit=4`
    );
    dispatch({
      type: "GET_PRODUCTS",
      payload: data,
    });
    dispatch({
      type: "SET_TOTAL_COUNT",
      payload: headers["x-total-count"],
    });
  }

  async function getProductsDetails(id) {
    const { data } = await axios(`${JSON_API}/products/${id}`);
    dispatch({
      type: "GET_PRODUCTS_DETAILS",
      payload: data,
    });
  }

  function addAndDeleteProductInCart(product) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (!cart) {
      cart = {
        products: [],
        totalPrice: 0,
      };
    }
    let newProduct = {
      product: product,
      count: 1,
      subPrice: 0,
    };
    newProduct.subPrice = calcSubPrice(newProduct);
    let newCart = cart.products.filter(
      (item) => item.product.id === product.id
    );
    if (newCart.length > 0) {
      cart.products = cart.products.filter(
        (item) => item.product.id !== product.id
      );
    } else {
      cart.products.push(newProduct);
    }
    cart.totalPrice = calcTotalPrice(cart.products);
    localStorage.setItem("cart", JSON.stringify(cart));

    dispatch({
      type: "ADD_AND_DELETE_IN_CART",
      payload: cart.products.length,
    });
  }

  function checkProductInCard(id) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (!cart) {
      cart = {
        products: [],
        totalPrice: 0,
      };
    }
    let newCart = cart.products.filter((item) => item.product.id === id);
    return newCart.length > 0 ? true : false;
  }

  function getCart() {
    let cart = JSON.parse(localStorage.getItem("cart"));
    dispatch({
      type: "GET_CART",
      payload: cart,
    });
  }

  function deleteProductInCart(id) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart.products = cart.products.filter((item) => {
      return item.product.id !== id;
    });
    
    localStorage.setItem("cart", JSON.stringify(cart));
    dispatch({
        type: "ADD_AND_DELETE_IN_CART",
        payload: cart.products.length,
      });
    getCart();
  }

  function changeCountProducts(count, id) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart.products = cart.products.map((item) => {
      if (item.product.id === id) {
        item.count = count;
        item.subPrice = calcSubPrice(item);
      }
      return item;
    });
    cart.totalPrice = calcTotalPrice(cart.products);
    localStorage.setItem("cart", JSON.stringify(cart));
    getCart();
  }
  function makeOrder() {
    let cart = JSON.parse(localStorage.getItem("cart"));
    dispatch({
      type: "GET_SUM",
      payload: cart.totalPrice,
    });
    console.log(cart.totalPrice);
  }

  async function addNewComments(newProduct) {
    try {
      await axios.put(`${JSON_API}/products/${newProduct.id}`, newProduct);
    } catch (error) {
      console.log({ ...error });
    }
  }

  return (
    <productsContext.Provider
      value={{
        products: state.products,
        productDetails: state.productDeatails,
        totalCount: state.totalCount,
        productsCountInCart: state.productsCountInCart,
        cartData: state.cartData,
        totalSum: state.totalSum,
        getProducts,
        getProductsDetails,
        // filterProducts,
        addAndDeleteProductInCart,
        checkProductInCard,
        getCart,
        changeCountProducts,
        makeOrder,
        addNewComments,
        makeOrder,
        deleteProductInCart,
      }}
    >
      {children}
    </productsContext.Provider>
  );
};

export default ProductsContextProvider;
