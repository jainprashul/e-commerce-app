import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import Details from "./components/Details";
import Cart from "./components/Cart/Cart";
import Default from "./components/PageNotFound/Default";
import { ProductProvider } from "./context";
import Model from "./components/Model";




function App() {
  return (
    <ProductProvider>
    <Router>
      <React.Fragment>
        <Navbar />

        <Switch>
          <Route exact path='/' component={ProductList}/>
          <Route path='/details' component={Details}/>
          <Route path='/cart' component={Cart}/>
          <Route component={Default}/>
        </Switch>
        <Model/>

      </React.Fragment>
    </Router>
    </ProductProvider>
    
  );
}

export default App;
