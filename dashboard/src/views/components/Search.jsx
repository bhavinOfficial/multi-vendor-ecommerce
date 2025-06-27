const Search = ({ setPerPage, perPage, searchValue, setSearchValue }) => {
  return (
    <div className="flex justify-between items-center">
      <select
        onChange={(e) => setPerPage(parseInt(e.target.value))}
        value={perPage}
        className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
      >
        <option value="5">5</option>
        <option value="15">15</option>
        <option value="25">25</option>
      </select>
      <input
        className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
        type="text"
        placeholder="Search"
        onChage={(e) => setSearchValue(e.target.value)}
        value={searchValue}
      />
    </div>
  );
};

export default Search;
