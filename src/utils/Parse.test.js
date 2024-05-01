import { getTotalDeathsByCountryOnDate } from './parseData';

// Mocking the module where jsonData is imported
// '../data/file' is the file path for the orignal JSON file
jest.mock('../data/file', () => {
  return {
    __esModule: true, 
    default: [
      { iso_code: 'PAK', date: '12/31/2021', total_deaths: 28905 },
      { iso_code: 'SAU', date: '12/31/2021', total_deaths: 1050 },
      { iso_code: 'USA', date: '12/31/2021', total_deaths: 33200 },
      { iso_code: 'IND', date: '12/31/2021', total_deaths: 44200 },
      { iso_code: 'PAK', date: '01/01/2022', total_deaths: 28950 },
      { iso_code: 'BRA', date: '12/31/2021', total_deaths: null },
    ]
  };
});

describe('getTotalDeathsByCountryOnDate', () => {
  it('returns the correct number of deaths for a country on a specific date', () => {
    const countryCode = 'PAK';
    const deaths = getTotalDeathsByCountryOnDate(countryCode);
    expect(deaths).toEqual(28905);
  });
});
