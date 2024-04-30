import { useState } from "react";
import { SearchIcon } from "@chakra-ui/icons";
import ButtonSection from "./ButtonSection";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="flex items-center justify-between h-14 bg-blue-200 px-4">
      {/* Logo */}
      <h1 className="font-medium text-xl">Shatack</h1>

      {/* Search Bar */}
      <div className="flex items-center flex-grow mx-4">
        {/* <input
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          className="flex-grow w-full h-full px-3 py-2 text-sm rounded border border-gray-300 focus:outline-none"
        />
        <button
          type="button"
          className="flex items-center justify-center w-10 h-10 ml-2 rounded-md bg-blue-500 text-white focus:outline-none"
        >
          <SearchIcon />
        </button> */}
        <SearchBar/>
      </div>

      {/* Button Section */}
      <div className="lg:min-w-2/6">
        <ButtonSection />
      </div>
    </div>
  );
};

export default Navbar;
