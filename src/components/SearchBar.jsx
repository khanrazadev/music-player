import PropTypes from "prop-types";

import { CiSearch } from "react-icons/ci";

function SearchBar({ searchQuery, handleSearch }) {
  return (
    <div className="bg-[rgba(255,255,255,0.08)] px-4 py-2 rounded-lg w-full flex justify-between items-center">
      <input
        className="w-full bg-transparent outline-none text-lg opacity-60 flex-grow"
        placeholder="Search Song, Artist"
        value={searchQuery}
        onChange={handleSearch}
      />
      <CiSearch className="w-8 h-8 opacity-40 my-auto" />
    </div>
  );
}

SearchBar.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  handleSearch: PropTypes.func.isRequired,
};
export default SearchBar;
