import { useEffect, useState } from "react";
import { useDebounce } from "./hook/useDebounce";

export function SearchBox() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    if (debouncedQuery) {
      fetch(
        `https://jsonplaceholder.typicode.com/users?name_like=${debouncedQuery}`
      )
        .then((res) => res.json())
        .then((data) => setResult(data))
        .catch((err) => console.log("Error Fetching ...", err));
    } else {
      setResult([]);
    }
  }, [debouncedQuery]);

  return (
    <div>
      <h3>Debounced Search</h3>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Please type here ..."
      />

      <ul>
        {result.map((user) => {
          <li key={user.id}>{user.name}</li>;
        })}
      </ul>
    </div>
  );
}
