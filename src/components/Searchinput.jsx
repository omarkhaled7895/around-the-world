const SearchInput = ({ countriesList, filterCountriesList }) => {
  const handleSearch = (e) => {
    const searchTerm = e.target.value.trim().toLowerCase();

    const filteredCountries = !searchTerm
      ? countriesList
      : countriesList.filter((country) =>
          country.names?.common?.toLowerCase().includes(searchTerm),
        );

    filterCountriesList(filteredCountries);
  };

  return (
    <form className="relative flex-1" onSubmit={(e) => e.preventDefault()}>
      <div className="absolute top-1/2 left-8 -translate-y-1/2">
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.5 11H11.7L11.4 10.7C12.4 9.6 13 8.1 13 6.5C13 2.9 10.1 0 6.5 0C2.9 0 0 2.9 0 6.5C0 10.1 2.9 13 6.5 13C8.1 13 9.6 12.4 10.7 11.4L11 11.7V12.5L16 17.5L17.5 16L12.5 11ZM6.5 11C4 11 2 9 2 6.5C2 4 4 2 6.5 2C9 2 11 4 11 6.5C11 9 9 11 6.5 11Z"
            fillRule="evenodd"
            clipRule="evenodd"
            fill="#848484"
          />
        </svg>
      </div>
      <input
        type="text"
        name="Search"
        onChange={handleSearch}
        className="h-12 w-full max-w-md rounded-full pl-20 shadow md:h-14 dark:bg-gray-800"
        placeholder="Search..."
      />
    </form>
  );
};

export default SearchInput;
