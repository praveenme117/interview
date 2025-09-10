import { useContext } from "react";
import CartProvider from "./Provider";
import Product from "./Product";
import Cart from "./Cart";

const App = () => {
  return (
    <CartProvider>
      <h2>Shopping cart</h2>
      <Product />
      <Cart />
    </CartProvider>
  );
};

export default App;
