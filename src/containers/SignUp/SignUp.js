import React, { useContext } from "react";
import { authContext } from "../../contexts/AuthContext";
import "./SignUp.css";

const SignUp = (props) => {
  const { registerUser, hasAccount } = useContext(authContext);

  return (
    <div className="text-center mt-5 ">
      <form className="form-signin" onSubmit={(e) => registerUser(e, props.history)}>
        <h1 class="h3 mb-3 font-weight-normal">Please sign up</h1>

        <label className="sr-only">Name</label>
        <input
          type="text"
          id="inputName"
          className="form-control"
          placeholder="Name"
          required=""
          autoFocus=""
        />
        <label className="sr-only">Last name</label>
        <input
          type="text"
          id="inputLastName"
          className="form-control"
          placeholder="Last Name"
          required=""
          autoFocus=""
        />
        <label className="sr-only">Address</label>
        <input
          type="text"
          id="inputAddress"
          className="form-control"
          placeholder="Address"
          required=""
          autoFocus=""
        />

        <label for="inputEmail" className="sr-only">
          Email address
        </label>
        <input
          type="email"
          id="inputEmail"
          className="form-control"
          placeholder="Email address"
          required=""
          autoFocus=""
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

export default SignUp;
