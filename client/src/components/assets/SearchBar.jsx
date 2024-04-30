import { useState } from "react";
import { SearchIcon } from "@chakra-ui/icons";

const SearchBar = () => {
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    // Handle search functionality here
  };

  return (
    <div className="flex items-center relative w-full">
      <input
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        className="flex-grow w-full h-full px-3 py-2 pr-10 text-sm rounded border border-gray-300 focus:outline-none"
      />

      <button
        type="button"
        onClick={handleSearch}
        className="absolute right-0 top-0 bottom-0 flex items-center justify-center w-10 h-full rounded-r-md bg-blue-500 text-white focus:outline-none"
      >
        <SearchIcon />
      </button>
    </div>
  );
};

export default SearchBar;
