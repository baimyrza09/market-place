import React, { useContext, useEffect, useState } from "react";
import { productsContext } from "../../contexts/ProudctsContext";
import "./Header.css";
import BurgerMenu from "./BurgerMenu"
import { Link } from "react-router-dom";
import axios from 'axios';
import { PROFILE_API } from "../../helpers/constants";
import { Avatar, TextField, Button } from '@material-ui/core'

const Header = () => {
  const { getProducts, productsCountInCart } = useContext(productsContext);
  const [img, setImg] = useState('')

  async function logOut(){
    const { data } = await axios(`${PROFILE_API}`)
    console.log(data)
    await axios.put(`${PROFILE_API}`, {})
  }

  async function profileImg(){
    const { data } = await axios(`${PROFILE_API}`)
    console.log(data)
    setImg(data.img)
  }

  useEffect(()=>{
    profileImg()
  }, [])
  return (
    
    <div className="header pt-2">
      <nav className="navbar navbar-expand-lg ">
        <div className="container-fluid d-flex justify-content-between">
          <BurgerMenu/>
          <input className="w-input" type="search" placeholder="Я ищу" onChange={(e)=>getProducts(e.target.value)}/>
          <ul className="n-menu d-flex justify-content-start">
           <Link to='/cart'>
           <li className="nav-item" style={{ marginTop: "5px"}}>
              <svg
              className="svg"
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                className="bi bi-cart2"
                viewBox="0 0 16 16"
                color="#fff"
              >
                <path
                  fillRule="evenodd"
                  d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"
                />
              </svg>
              <span
                className="badge rounded-pill badge-notification bg-danger"
                style={{ marginLeft: "-1px", color: "#fff" }}
              >
                {productsCountInCart}
              </span>
            </li>
           </Link>
            <li className="nav-item dropleft">
              <a
                className="nav-link dropdown-toggle"
                type="button"
                data-toggle="dropdown"
                aria-expanded="false"
                className="d-flex ml-3"
              >
              
                 <Avatar alt="Remy Sharp" src={img} className="svg" />
              </a>

              <ul
                className="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                
               <Link to="/profile">
               <li>
                  <a className="dropdown-item" >My profile</a>
                </li>
               </Link>
               <Link to="/signin">
               <li>
                  <a className="dropdown-item" onClick={logOut}>Logout</a>
                </li>
               </Link>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Header;
