import React from 'react'
import CartItem from './CartItem'

const CartList = ({value}) => {
    console.log(value);
    const {cart} = value;
    return (
        <div>
            { cart.map(item => (<CartItem key={item.id} item={item} value={value} />))}
        </div>
    )
}

export default CartList
