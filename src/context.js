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
    cartSubTotal: 0,
    cartTax: 0,
    cartTotal: 0
  };

  componentDidMount() {
    this.setProducts();
  }

  /** Set the copy of the product data , without changing the data in original file. */
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
        this.addTotals();
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
      modelOpen: true
    });
  };

  /** Close Model Form */
  closeModel = () => {
    this.setState({
      modelOpen: false
    });
  };

  /** Increment Cart Product Item Count
   * @parmas {id} id  */
  increment = id => {
    let tempCart = [...this.state.cart];
    const selectedProduct = tempCart.find(item => item.id === id);

    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];

    product.count += 1;
    product.total = product.count * product.price;

    this.setState(
      {
        cart: [...tempCart]
      },
      () => {
        this.addTotals();
      }
    );
  };

  /** Decrement Cart Product Item Count
   * @parmas {id} id
   */
  decrement = id => {
    let tempCart = [...this.state.cart];
    const selectedProduct = tempCart.find(item => item.id === id);

    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];

    product.count -= 1;
    if (product.count === 0) {
      this.removeItem(id);
    } else {
      product.total = product.count * product.price;

      this.setState(
        {
          cart: [...tempCart]
        },
        () => {
          this.addTotals();
        }
      );
    }
  };

  /** Remove item from the cart and update cart values
   * @params {id} id
   */
  removeItem = id => {
    let tempProducts = [...this.state.products];
    let tempCart = [...this.state.cart];

    // remove from cart
    tempCart = tempCart.filter(item => item.id !== id);

    // update cart values
    const index = tempProducts.indexOf(this.getItem(id));
    let removedProduct = tempProducts[index];
    removedProduct.inCart = 0;
    removedProduct.count = 0;
    removedProduct.total = 0;

    this.setState(
      {
        cart: [...tempCart],
        products: [...tempProducts]
      },
      () => {
        this.addTotals();
      }
    );
  };

  clearCart = () => {
    this.setState(
      {
        cart: []
      },
      () => {
        this.setProducts();
        this.addTotals();
      }
    );
  };

  /** Calculating subtotals , tax & total */
  addTotals = () => {
    let subTotal = 0;
    this.state.cart.map(item => (subTotal += item.total));
    const tempTax = subTotal * 0.1;
    const tax = parseFloat(tempTax.toFixed(2));
    const total = subTotal + tax;

    this.setState({
      cartSubTotal: subTotal,
      cartTax: tax,
      cartTotal: total
    });
  };

  render() {
    return (
      <ProductContext.Provider
        value={{
          ...this.state,
          handleDetail: this.handleDetail,
          addToCart: this.addToCart,
          openModel: this.openModel,
          closeModel: this.closeModel,
          clearCart: this.clearCart,
          increment: this.increment,
          decrement: this.decrement,
          removeItem: this.removeItem
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
