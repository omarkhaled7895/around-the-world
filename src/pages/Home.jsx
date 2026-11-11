// import { useEffect, useState } from "react";
import SearchInput from "../components/Searchinput";
import RegionMenu from "../components/RegionMenu";
import CountryList from "../components/CountryList";
import ShowMessage from "../components/ShowMessage";
import { useFetchData } from "../useFetchData";

const Home = () => {
  const {
    result,
    filteredCountries,
    isError,
    isLoading,
    setFilteredCountries,
  } = useFetchData();

  // const [countriesList, setCountriesList] = useState([]);
  // const [filteredCountries, setFilteredCountries] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [isError, setIsError] = useState(false);
  // const API = "https://api.restcountries.com/countries/v5";
  // const FIELDS =
  //   "names.common,capitals,region,population,flag.url_svg,codes.alpha_3";

  // const fetchCountriesData = async () => {
  //   setIsLoading(true);
  //   try {
  //     const countries = [];
  //     let offset = 0;
  //     let more = true;

  //     while (more) {
  //       const response = await fetch(
  //         `${API}?response_fields=${FIELDS}&limit=100&offset=${offset}`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${import.meta.env.VITE_RC_API_KEY}`,
  //           },
  //         },
  //       );
  //       if (!response.ok) throw new Error(`HTTP ${response.status}`);

  //       const json = await response.json();
  //       countries.push(...json.data.objects);
  //       more = json.data.meta.more;
  //       offset += 100;
  //     }

  //     console.log(countries);
  //     setCountriesList(countries);
  //     setFilteredCountries(countries);
  //   } catch (error) {
  //     console.error("Fetch failed:", error);
  //     setIsError(true);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  return (
    <>
      {isError && <ShowMessage message="Something went wrong!" />}
      {isLoading && <ShowMessage message="Loading..." />}
      {!isError && !isLoading && (
        <>
          <div className="flex flex-col justify-between gap-10 md:h-14 md:flex-row md:gap-0">
            <SearchInput
              countriesList={result}
              filterCountriesList={setFilteredCountries}
            />
            <RegionMenu
              countriesList={result}
              filterCountriesList={setFilteredCountries}
            />
          </div>
          <CountryList data={filteredCountries} />
        </>
      )}
    </>
  );
};

export default Home;
