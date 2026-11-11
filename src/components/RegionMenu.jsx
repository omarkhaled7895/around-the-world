import Select from "react-select";

const options = [
  { value: "all regions", label: "All Regions" },
  { value: "africa", label: "Africa" },
  { value: "americas", label: "Americas" },
  { value: "asia", label: "Asia" },
  { value: "europe", label: "Europe" },
  { value: "oceania", label: "Oceania" },
];

const RegionMenu = ({ countriesList, filterCountriesList }) => {
  const handleRegionChange = (e) => {
    const region = e.label;
    const filterCountries =
      region === "All Regions"
        ? countriesList
        : countriesList.filter((country) => country.region === region);
    filterCountriesList(filterCountries);
  };
  return (
    <Select
      defaultValue={options[0]}
      onChange={handleRegionChange}
      options={options}
      className={{
        input: () => "dark:!text-gray-100",
        singleValue: () => "dark:text-gray-100",
        control: () =>
          "flex h-12 items-center justify-between gap-12 rounded-md !border-none pr-2 pl-4 shadow dark:bg-gray-900",
        indicatorSeparator: () => "hidden",
        option: () => "hover: !text-gray-800",
        menu: () => "bg-gray-100 dark:bg-gray-800 dark:text-gray-100",
      }}
    />
  );
};

export default RegionMenu;
