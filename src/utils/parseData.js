// src/utils/parseData.js

import jsonData from '../data/file'; // Adjust the import path to your JSON file's location

const parseDataCases = () => {
  const pakistanData = jsonData.filter(item => item.iso_code === 'PAK');
  const saudiData = jsonData.filter(item => item.iso_code === 'SAU');

  const formatDate = (dateString) => {
    const [month, day, year] = dateString.split('/');
    return new Date(year, month - 1, day);
};

// Map data for Pakistan
const pakistanCases = pakistanData.map(item => ({
    date: formatDate(item.date),
    value: item.total_cases_per_million,
  }));

// Map data for Saudi Arabia
const saudiCases = saudiData.map(item => ({
  date: formatDate(item.date),
  value: item.total_cases_per_million,
}));

// Returning separate data objects for each country
return { pakistanCases, saudiCases };
};

const getTotalCases = () => {
    const targetDate = '12/31/2021'; // The date you're interested in

    const findTotalCasesOnDate = (countryCode) => {
        // Find the entry for the target date
        const entry = jsonData.find(item => item.iso_code === countryCode && item.date === targetDate);
        // Return the total_cases for that entry, or 0 if the entry doesn't exist
        return entry ? parseInt(entry.total_cases, 10) || 0 : 0;
    };

    // Get total cases for Pakistan and Saudi Arabia on the target date
    const pakistanTotalCases = findTotalCasesOnDate('PAK');
    const saudiTotalCases = findTotalCasesOnDate('SAU');

    return { pakistanTotalCases, saudiTotalCases };
};

const getTotalTests = () => {
    const targetDate = '12/31/2021'; // The date you're interested in

    const findTotalTestsOnDate = (countryCode) => {
        // Find the entry for the target date
        const entry = jsonData.find(item => item.iso_code === countryCode && item.date === targetDate);
        // Return the total_tests for that entry, or 0 if the entry doesn't exist
        return entry ? parseInt(entry.total_tests, 10) || 0 : 0;
    };

    // Get total tests for Pakistan and Saudi Arabia on the target date
    const pakistanTotalTests = findTotalTestsOnDate('PAK');
    const saudiTotalTests = findTotalTestsOnDate('SAU');

    return { pakistanTotalTests, saudiTotalTests };
};

const parseDataForTesting = () => {
  const pakistanData = jsonData.filter(item => item.iso_code === 'PAK');
  const saudiData = jsonData.filter(item => item.iso_code === 'SAU');

  // Formatting the date
  const formatDate = (dateString) => {
    const [month, day, year] = dateString.split('/');
    return new Date(year, month - 1, day); // Note: month is 0-indexed in JavaScript Date
  };

  // Mapping to get new_tests and new_tests_smoothed
  const pakistanTestingData = pakistanData.map(item => ({
    date: formatDate(item.date),
    newTests: item.new_tests || 0,
    newTestsSmoothed: item.new_tests_smoothed || 0,
  }));

  const saudiTestingData = saudiData.map(item => ({
    date: formatDate(item.date),
    newTests: item.new_tests || 0,
    newTestsSmoothed: item.new_tests_smoothed || 0,
  }));

  return { pakistanTestingData, saudiTestingData };
};

const parseTestsPerThousand = (jsonData) => {
  // Helper function to format the date into a more standard format (YYYY-MM-DD)
  const formatDate = (dateString) => {
    const [month, day, year] = dateString.split('/');
    return new Date(year, month - 1, day);
  };

  // Filtering and mapping data for Pakistan
  const pakistanData = jsonData
    .filter(item => item.iso_code === 'PAK' && item.total_tests_per_thousand)
    .map(item => ({
      date: formatDate(item.date),
      totalTestsPerThousand: parseFloat(item.total_tests_per_thousand),
    }));

  // Filtering and mapping data for Saudi Arabia
  const saudiData = jsonData
    .filter(item => item.iso_code === 'SAU' && item.total_tests_per_thousand)
    .map(item => ({
      date: formatDate(item.date),
      totalTestsPerThousand: parseFloat(item.total_tests_per_thousand),
    }));

  return { pakistanData, saudiData };
};

const parsePositiveRate = (jsonData) => {
  const formatDate = (dateString) => {
      const [month, day, year] = dateString.split('/');
      return new Date(year, month - 1, day);
  };

  const pakistanData = jsonData.filter(item => item.iso_code === 'PAK').map(item => ({
      date: formatDate(item.date),
      positiveRate: parseFloat(item.positive_rate) || 0,
  }));

  const saudiData = jsonData.filter(item => item.iso_code === 'SAU').map(item => ({
      date: formatDate(item.date),
      positiveRate: parseFloat(item.positive_rate) || 0,
  }));

  return { pakistanData, saudiData };
};

const parseNewVaccinationsSmoothed = (jsonData) => {
  const formatDate = (dateString) => {
    const [month, day, year] = dateString.split('/');
    return new Date(year, month - 1, day);
};

  // Filter and map data for Pakistan
  const pakistanVaccinations = jsonData
      .filter(item => item.iso_code === 'PAK' && item.new_vaccinations_smoothed)
      .map(item => ({
          date: formatDate(item.date),
          value: item.new_vaccinations_smoothed,
      }));

  // Filter and map data for Saudi Arabia
  const saudiVaccinations = jsonData
      .filter(item => item.iso_code === 'SAU' && item.new_vaccinations_smoothed)
      .map(item => ({
          date: formatDate(item.date),
          value: item.new_vaccinations_smoothed,
      }));

  // Returning separate data objects for each country
  return { pakistanVaccinations, saudiVaccinations };
};

const parseNewVaccinationsSmoothedPerMillion = (jsonData) => {
  const formatDate = (dateString) => {
    const [month, day, year] = dateString.split('/');
    return new Date(year, month - 1, day);
};

  // Filter and map data for Pakistan
  const pakistanVaccinations = jsonData
      .filter(item => item.iso_code === 'PAK' && item.new_vaccinations_smoothed_per_million)
      .map(item => ({
          date: formatDate(item.date),
          value: item.new_vaccinations_smoothed_per_million,
      }));

  // Filter and map data for Saudi Arabia
  const saudiVaccinations = jsonData
      .filter(item => item.iso_code === 'SAU' && item.new_vaccinations_smoothed_per_million)
      .map(item => ({
          date: formatDate(item.date),
          value: item.new_vaccinations_smoothed_per_million,
      }));

  // Returning separate data objects for each country
  return { pakistanVaccinations, saudiVaccinations };
};

const parseStringencyIndex = (jsonData) => {
  const formatDate = (dateString) => {
    const [month, day, year] = dateString.split('/');
    return new Date(year, month - 1, day);
};

  // Filter and map data for Pakistan
  const pakistanVaccinations = jsonData
      .filter(item => item.iso_code === 'PAK' && item.stringency_index)
      .map(item => ({
          date: formatDate(item.date),
          value: item.stringency_index,
      }));

  // Filter and map data for Saudi Arabia
  const saudiVaccinations = jsonData
      .filter(item => item.iso_code === 'SAU' && item.stringency_index)
      .map(item => ({
          date: formatDate(item.date),
          value: item.stringency_index,
      }));

  // Returning separate data objects for each country
  return { pakistanVaccinations, saudiVaccinations };
};

const NewPeopleVaccinatedSmoothedPerHundred = (jsonData) => {
  const formatDate = (dateString) => {
    const [month, day, year] = dateString.split('/');
    return new Date(year, month - 1, day);
};

  // Filter and map data for Pakistan
  const pakistanVaccinations = jsonData
      .filter(item => item.iso_code === 'PAK' && item.new_people_vaccinated_smoothed_per_hundred)
      .map(item => ({
          date: formatDate(item.date),
          value: item.new_people_vaccinated_smoothed_per_hundred,
      }));

  // Filter and map data for Saudi Arabia
  const saudiVaccinations = jsonData
      .filter(item => item.iso_code === 'SAU' && item.new_people_vaccinated_smoothed_per_hundred)
      .map(item => ({
          date: formatDate(item.date),
          value: item.new_people_vaccinated_smoothed_per_hundred,
      }));

  // Returning separate data objects for each country
  return { pakistanVaccinations, saudiVaccinations };
};

const getTotalCasesByCountryOnDate = (countryCode) => {
  const targetDate = '12/31/2021'; 
  const dataPoint = jsonData.find(
    (item) => item.iso_code === countryCode && item.date === targetDate
  );
  return dataPoint ? dataPoint.total_cases : null;
};


const ParseNewCasesSmoothed = () => {
  const pakistanData = jsonData.filter(item => item.iso_code === 'PAK');
  const saudiData = jsonData.filter(item => item.iso_code === 'SAU');

  const formatDate = (dateString) => {
    const [month, day, year] = dateString.split('/');
    return new Date(year, month - 1, day);
};

// Map data for Pakistan
const pakistanCases = pakistanData.map(item => ({
    date: formatDate(item.date),
    value: item.new_cases_smoothed,
  }));

// Map data for Saudi Arabia
const saudiCases = saudiData.map(item => ({
  date: formatDate(item.date),
  value: item.new_cases_smoothed,
}));

// Returning separate data objects for each country
return { pakistanCases, saudiCases };
};

const ParseNewCasesSmoothedPerMillion = () => {
  const pakistanData = jsonData.filter(item => item.iso_code === 'PAK');
  const saudiData = jsonData.filter(item => item.iso_code === 'SAU');

  const formatDate = (dateString) => {
    const [month, day, year] = dateString.split('/');
    return new Date(year, month - 1, day);
};

// Map data for Pakistan
const pakistanCases = pakistanData.map(item => ({
    date: formatDate(item.date),
    value: item.new_cases_smoothed_per_million,
  }));

// Map data for Saudi Arabia
const saudiCases = saudiData.map(item => ({
  date: formatDate(item.date),
  value: item.new_cases_smoothed_per_million,
}));

// Returning separate data objects for each country
return { pakistanCases, saudiCases };
};

const ParseTotalDeathsPerMillion = () => {
  const pakistanData = jsonData.filter(item => item.iso_code === 'PAK');
  const saudiData = jsonData.filter(item => item.iso_code === 'SAU');

  const formatDate = (dateString) => {
    const [month, day, year] = dateString.split('/');
    return new Date(year, month - 1, day);
};

// Map data for Pakistan
const pakistanCases = pakistanData.map(item => ({
    date: formatDate(item.date),
    value: item.total_deaths_per_million,
  }));

// Map data for Saudi Arabia
const saudiCases = saudiData.map(item => ({
  date: formatDate(item.date),
  value: item.total_deaths_per_million,
}));

// Returning separate data objects for each country
return { pakistanCases, saudiCases };
};

const ParseNewDeathsSmoothed = () => {
  const pakistanData = jsonData.filter(item => item.iso_code === 'PAK');
  const saudiData = jsonData.filter(item => item.iso_code === 'SAU');

  const formatDate = (dateString) => {
    const [month, day, year] = dateString.split('/');
    return new Date(year, month - 1, day);
};

// Map data for Pakistan
const pakistanCases = pakistanData.map(item => ({
    date: formatDate(item.date),
    value: item.new_deaths_smoothed,
  }));

// Map data for Saudi Arabia
const saudiCases = saudiData.map(item => ({
  date: formatDate(item.date),
  value: item.new_deaths_smoothed,
}));

// Returning separate data objects for each country
return { pakistanCases, saudiCases };
};

const ParseNewDeathsSmoothedPerMillion = () => {
  const pakistanData = jsonData.filter(item => item.iso_code === 'PAK');
  const saudiData = jsonData.filter(item => item.iso_code === 'SAU');

  const formatDate = (dateString) => {
    const [month, day, year] = dateString.split('/');
    return new Date(year, month - 1, day);
};

// Map data for Pakistan
const pakistanCases = pakistanData.map(item => ({
    date: formatDate(item.date),
    value: item.new_deaths_smoothed_per_million,
  }));

// Map data for Saudi Arabia
const saudiCases = saudiData.map(item => ({
  date: formatDate(item.date),
  value: item.new_deaths_smoothed_per_million,
}));

// Returning separate data objects for each country
return { pakistanCases, saudiCases };
};

const getTotalDeathsByCountryOnDate = (countryCode) => {
  const targetDate = '12/31/2021'; 
  const dataPoint = jsonData.find(
    (item) => item.iso_code === countryCode && item.date === targetDate
  );
  return dataPoint ? dataPoint.total_deaths : null;
};

const getTotalTestsByCountryOnDate = (countryCode) => {
  const targetDate = '12/31/2021'; 
  const dataPoint = jsonData.find(
    (item) => item.iso_code === countryCode && item.date === targetDate
  );
  return dataPoint ? dataPoint.total_tests : null;
};

export { parseDataCases, getTotalCases, getTotalTests, parseDataForTesting, parseTestsPerThousand, 
          parsePositiveRate, parseNewVaccinationsSmoothed, parseNewVaccinationsSmoothedPerMillion,
          parseStringencyIndex, NewPeopleVaccinatedSmoothedPerHundred, getTotalCasesByCountryOnDate,
          ParseNewCasesSmoothed, ParseNewCasesSmoothedPerMillion, ParseTotalDeathsPerMillion,
          ParseNewDeathsSmoothed, ParseNewDeathsSmoothedPerMillion, getTotalDeathsByCountryOnDate,
          getTotalTestsByCountryOnDate };
