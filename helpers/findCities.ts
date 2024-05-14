import { Country, State, City } from "country-state-city";
import { getCode } from "country-list";
type isoCode = string;

const findCities = (countries: string[]) => {
  const country = Country.getCountryByCode(getCode(countries[0]) as isoCode);
  let cities: string[] = [];
  if (country) {
    const states = State.getStatesOfCountry(country.isoCode);
    states.forEach((state) => {
      const stateCities = City.getCitiesOfState(country.isoCode, state.isoCode);
      cities = cities.concat(stateCities.map((city) => city.name as string));
    });
  }
  return cities;
};

export default findCities;
