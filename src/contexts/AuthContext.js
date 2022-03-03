import React, { useReducer, useState } from "react";
import { AUTH_API } from "../helpers/constants";
import { PROFILE_API } from "../helpers/constants";
import axios from "axios";

export const authContext = React.createContext();

const INIT_STATE = {
  polzovatel: [],
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
  }
};

const AuthContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  async function registerUser(e, history) {
    e.preventDefault();
    const newUser = {
      name: e.target[0].value,
      lastName: e.target[1].value,
      address: e.target[2].value,
      img: '',
      email: e.target[3].value,
      password: e.target[4].value,
      cart: []
    };
    try {
      const res = await axios.post(`${AUTH_API}`, newUser);
      history.push("/signin");
    } catch {
      alert("Некорректная почта или пароль !");
    }
  }

  function hasAccount(history) {
    history.push("/signin");
  }

  async function loginUser(e, history) {
    e.preventDefault();
    const newUser = {
      email: e.target[0].value,
      password: e.target[1].value,
    };
  
    try {
      const { data } = await axios(`${AUTH_API}`);
      let userId = data.filter((item) => {
        return item.email === newUser.email;
      });

     let polzovatel = userId.map(item =>{
          return item.id
      });
      
      if(polzovatel == '') {
          polzovatel = 'error'
      }

      console.log(userId)
      let [profile] = userId

      console.log(profile)

      const { res } = await axios(`${AUTH_API}/${polzovatel}`);
      await axios.post(`${PROFILE_API}`, profile)
      console.log("success")
      history.push('/')
    } catch {
      alert("Некорректная почка или пароль !");
    }
  }


  function hasnotAccount(history) {
    history.push("/signup");
  }

  return (
    <authContext.Provider
      value={{
        registerUser,
        hasAccount,
        loginUser,
        hasnotAccount,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthContext;
