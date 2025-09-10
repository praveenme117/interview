import { useContext } from "react";
import CartProvider from "./Provider";

const App = () => {
  const { addToCart } = useContext(CartProvider);
  return <button onClick={() => addToCart("Apple")}>Add Apple</button>;
};

export default App;
