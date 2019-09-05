import React, { Component } from "react";
import { storeProducts, detailProduct } from "./data";

const ProductContext = React.createContext();
// Provider
// Consumer
class ProductProvider extends Component {
  state = {
    products: [],
    detailProduct,
    cart: [],
    modelOpen: false,
    modelProduct: detailProduct,
    cartSubTotal : 0,
    cartTax : 0,
    cartTotal : 0,
  };

  componentDidMount() {
    this.setProducts();
  }

  setProducts = () => {
    let tempProducts = [];
    storeProducts.forEach(item => {
      const singleItem = { ...item };
      tempProducts = [...tempProducts, singleItem];
    });
    this.setState(() => {
      return { products: tempProducts };
    });
  };

  handleDetail = id => {
    const product = this.getItem(id);
    this.setState(() => {
      return { detailProduct: product };
    });
  };

  /**
   * Filters and find Product by Id
   * @param {Id} id
   */
  getItem = id => {
    const product = this.state.products.find(item => item.id === id);
    return product;
  };

  /** Add to Cart by ID Param */
  addToCart = id => {
    let tempProducts = [...this.state.products];
    const index = tempProducts.indexOf(this.getItem(id));
    const product = tempProducts[index];
    product.inCart = true;
    product.count = 1;
    const price = product.price;
    product.total = price;

    this.setState(
      () => {
        return { products: tempProducts, cart: [...this.state.cart, product] };
      },
      () => {
        console.log(this.state);
      }
    );
  };

/**
 * Opens the Model form
 * @param {id} id
 */
  openModel = id => {
    const product = this.getItem(id);
    this.setState({
        modelProduct: product,
        modelOpen: true,
    })
  };

/** Close Model Form */
  closeModel = ()=> {
      this.setState({
          modelOpen: false,
      })
  }

  increment = (id) => {
    
  }

  decrement = (id) => {
    
  }
  removeItem = (id) => {

  }

  clearCart = () => {
    
  }
  
  
  

  render() {
    return (
      <ProductContext.Provider
        value={{
          ...this.state,
          handleDetail: this.handleDetail,
          addToCart: this.addToCart,
          openModel: this.openModel,
          closeModel: this.closeModel,
          clearCart : this.clearCart,
          increment: this.increment,
          decrement : this.decrement,
          removeItem : this.removeItem,
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
