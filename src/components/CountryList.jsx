import CountryCard from "./CountryCard";
import EmptySearch from "./EmptySearch";

const CountryList = ({ data }) => {
  return (
    <div className="mt-8 grid justify-between gap-x-[70px] gap-y-12 md:grid-cols-[repeat(2,minmax(0,_auto))] lg:grid-cols-[repeat(4,minmax(0,_auto))] lg:gap-y-[70px]">
      {data && data.length ? (
        data.map((country) => (
          <CountryCard
            key={country.codes.alpha_3 || country.names.common}
            name={country.names.common}
            capital={country.capitals?.[0]?.name || "N/A"}
            region={country.region}
            population={country.population}
            flag={country.flag.url_svg}
          />
        ))
      ) : (
        <EmptySearch />
      )}
    </div>
  );
};

export default CountryList;
