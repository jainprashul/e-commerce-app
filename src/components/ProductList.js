import React, { Component } from "react";
import Product from "./Product";
import Title from "./Title";
import {storeProducts} from '../data'

export default class ProductList extends Component {
  state = {
    products: storeProducts,
  };
  render() {
    return (
      <React.Fragment>
        <div className="py-5">
          <div className="container">
            <div className="row">
                <Title name='Our' title='products'/>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
