import { useContext, useEffect, useState } from "react";
import { CartContext } from "./Provider";

const Product = () => {
  const [product, setProduct] = useState([]);
  const [status, setStatus] = useState("Loading...");
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/posts");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setProduct(data.slice(0, 5));
      } catch (err) {
        console.log(err);
        setStatus("Error loading products...");
      } finally {
        setStatus("Done");
      }
    }
    fetchProduct();
  }, []);

  return (
    <div>
      <h3>Products</h3>
      <p>{status}</p>

      <ul>
        {product.map((p) => (
          <li key={p.id}>
            <strong>{p.title}</strong>
            <button style={{ marginLeft: "10px" }} onClick={() => addToCart(p)}>
              Add to Cart
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Product;
