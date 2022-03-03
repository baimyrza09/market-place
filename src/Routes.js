import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AdminPanel from "./containers/AdminPanel/AdminPanel";
import AdminPanelEdit from "./containers/AdminPanel/AdminPanelEdit";
import Footer from "./containers/Footer/Footer";
import Header from "./containers/Header/Header";
import Home from "./containers/Home/Home";
import SignIn from "./containers/SignIn/SignIn";
import SignUp from "./containers/SignUp/SignUp";
import AdminContextProvider from "./contexts/AdminContext";
import AuthContextProvider from "./contexts/AuthContext";
import ProductsContextProvider from "./contexts/ProudctsContext";
import ProductDeatail from "./containers/Products/ProductDetail"
import ProductsList from "./containers/Products/ProductsList";
import BurgerMenu from "./containers/Header/BurgerMenu"
import Cart from "./containers/Cart/Cart";
import Profile from "./containers/Profile/Profile";
import PaymentPage from "./containers/CreditCard/PaymentPage/PaymentPage";
import CreditCard from "./containers/CreditCard/PaymentCard/CreditCard";


const Routes = () => {
  return (
    <div>
      <ProductsContextProvider>
        <BrowserRouter>
          <Header />
          <Switch>
            <AdminContextProvider>
              <Route exact path="/admin" component={AdminPanel} />
              <Route exact path="/adminedit" component={AdminPanelEdit} />
            </AdminContextProvider>
          </Switch>
          <Switch>
            <AuthContextProvider>
              <Route exact path="/signup" component={SignUp} />
              <Route exact path="/signin" component={SignIn} />
              <Route exact path="/profile" component={Profile}/>
            </AuthContextProvider>
          </Switch>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/details/:id" component={ProductDeatail}/>
            <Route exact path="/list" component={ProductsList}/>
            <Route exact path="/burger" component={BurgerMenu}/>
            <Route exact path="/cart" component={Cart}/>
            <Route exact path="/payment" component={PaymentPage}/>
            <Route exact path="/credit" component={CreditCard}/>
          </Switch>
          <Footer />
        </BrowserRouter>
      </ProductsContextProvider>
    </div>
  );
};

export default Routes;
