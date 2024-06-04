import { Country, State, City } from "country-state-city";
import { getCode } from "country-list";
type isoCode = string;

const cityCache: { [key: string]: string[] } = {};

const findCities = (countries: string[]): string[] => {
  const countryCode = getCode(countries[0]) as isoCode;
  if (cityCache[countryCode]) {
    return cityCache[countryCode];
  }

  const country = Country.getCountryByCode(countryCode);
  let cities: string[] = [];

  if (country) {
    const states = State.getStatesOfCountry(country.isoCode);
    states.forEach((state) => {
      const stateCities = City.getCitiesOfState(country.isoCode, state.isoCode);
      cities = cities.concat(stateCities.map((city) => city.name as string));
    });
  }

  cityCache[countryCode] = cities;
  return cities;
};

export default findCities;
