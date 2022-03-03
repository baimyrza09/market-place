import React, { useContext } from "react";
import { authContext } from "../../contexts/AuthContext";
import "./SignIn.css";

const SignIn = (props) => {
    const { loginUser, hasnotAccount } = useContext(authContext);

  return (
    <div className="text-center mt-5 mb-5 pb-3">
      <form className="form-signin" onSubmit={(e)=> loginUser(e, props.history)}>
        <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
        <label for="inputEmail" className="sr-only">
          Email address
        </label>
        <input
          type="email"
          id="inputEmail"
          className="form-control"
          placeholder="Email address"
          required=""
          autofocus=""
        />
        <label for="inputPassword" className="sr-only">
          Password
        </label>
        <input
          type="password"
          id="inputPassword"
          className="form-control"
          placeholder="Password"
          required=""
        />
        <button className="btn btn-lg btn-primary btn-block" type="submit">
          Sign in
        </button>
      </form>
    </div>
  );
};

export default SignIn;
