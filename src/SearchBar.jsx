import React, { useCallback, useState } from "react";
import { debounce } from "./utils/debounce";

const SearchBar = () => {
  const [query, setQuery] = useState("");

  const handleSearch = (value) => {
    console.log(value);
  };

  const debouncedSearch = useCallback(debounce(handleSearch, 500), []);

  const handleChange = (e) => {
    setQuery(e.target.value);
    debouncedSearch(e.target.value);
  };
  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Please type here..."
      />
    </div>
  );
};

export default SearchBar;
