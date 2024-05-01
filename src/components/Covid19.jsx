import React, { useState, useEffect } from "react";
import Loading from "./LoadingDots";
import CovidMap from "./CovidMap";
import LoadCountryTask from "../tasks/LoadCountriesTasks";
import Legend from "./Legend";
import legendItems from "../entities/LegendItems";
import LoadingDots from "./LoadingDots";

const Covid19 = () => {
  const [countries, setCountries] = useState([]);

  const legendItemsReverse = [...legendItems].reverse();

  const load = () => {
    console.log("load");
    const loadCountriesTask = new LoadCountryTask();
    loadCountriesTask.load((countries) => setCountries(countries));
  };

  useEffect(load, []);

  return (
    <div>
      {countries.length === 0 ? (
        <LoadingDots />
      ) : (
        <div>
          <CovidMap countries={countries} />
          <Legend legendItems={legendItemsReverse} />
        </div>
      )}
    </div>
  );
};

export default Covid19;