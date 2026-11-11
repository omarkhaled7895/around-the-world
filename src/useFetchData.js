//

import { useState, useEffect } from "react";

const API = "https://api.restcountries.com/countries/v5";
const FIELDS =
  "names.common,capitals,region,subregion,population,flag.url_svg,codes.alpha_3,tlds,currencies,languages";

export const useFetchData = (country) => {
  const [result, setResult] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    fetchDataFromLocalStorage();
  }, [country]);

  const fetchDataFromAPI = async () => {
    setIsLoading(true);
    setIsError(false);

    try {
      let url;

      if (country) {
        if (country) {
          url = `${API}/names.common/${encodeURIComponent(country)}?response_fields=${FIELDS}`;
        }
      } else {
        url = `${API}?response_fields=${FIELDS}&limit=100&offset=0`;
      }

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_RC_API_KEY}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const json = await response.json();

      if (country) {
        setResult(json.data);
      } else {
        const countries = [...json.data.objects];
        let more = json.data.meta.more;
        let offset = 100;

        while (more) {
          const nextResponse = await fetch(
            `${API}?response_fields=${FIELDS}&limit=100&offset=${offset}`,
            {
              headers: {
                Authorization: `Bearer ${import.meta.env.VITE_RC_API_KEY}`,
              },
            },
          );

          if (!nextResponse.ok) {
            throw new Error(`HTTP ${nextResponse.status}`);
          }

          const nextJson = await nextResponse.json();

          countries.push(...nextJson.data.objects);
          more = nextJson.data.meta.more;
          offset += 100;
        }

        setResult(countries);
        setFilteredCountries(countries);

        localStorage.setItem("countries", JSON.stringify(countries));
      }
    } catch (error) {
      console.error("Fetch failed:", error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDataFromLocalStorage = () => {
    try {
      const data = JSON.parse(localStorage.getItem("countries"));

      if (data && data.length > 0) {
        if (country) {
          const selectedCountry = data.find(
            (item) => item.names.common.toLowerCase() === country.toLowerCase(),
          );

          if (selectedCountry) {
            setResult(selectedCountry);
            setIsLoading(false);
          } else {
            fetchDataFromAPI();
          }
        } else {
          setResult(data);
          setFilteredCountries(data);
          setIsLoading(false);
        }
      } else {
        fetchDataFromAPI();
      }
    } catch (error) {
      console.error("Local Storage failed:", error);
      fetchDataFromAPI();
    }
  };

  return {
    result,
    filteredCountries,
    setFilteredCountries,
    isLoading,
    isError,
  };
};
