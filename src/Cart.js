import React, { useContext } from "react";
import CartProvider, { CartContext } from "./Provider";

const Cart = () => {
  const { cart } = useContext(CartContext);
  return (
    <div>
      <h3>Cart items: ({cart.length})</h3>
      <ul>
        {cart.map((item, index) => (
          <li key={index}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
