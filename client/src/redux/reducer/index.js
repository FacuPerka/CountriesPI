import {
  RESET,
  ORDER_BY_POPULATION,
  FILTER_BY_ACTIVITIES,
  FILTER_BY_CONTINENT,
  GET_COUNTRIES,
  ORDER_BY_NAME,
  SEARCH_COUNTRIES,
  ASC,
  GET_ACTIVITIES,
  POST_ACTIVITIES,
  DETAIL,
  HIGHER_POPULATION,
} from "../../types/const";

const initialState = {
  countries: [],
  allCountries: [],
  activities: [],
  detail: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COUNTRIES:
      return {
        ...state,
        countries: action.payload,
        allCountries: action.payload,
      };

    case FILTER_BY_CONTINENT:
      const filterByContinent = state.allCountries;
      const filteredCont =
        action.payload === "All"
          ? filterByContinent
          : filterByContinent.filter((e) => e.continent === action.payload);
      return {
        ...state,
        countries: filteredCont,
      };

    case FILTER_BY_ACTIVITIES:
      const filterByActivities = state.allCountries;
      const filteredAct = filterByActivities.filter((c) => {
        return c.activities.find((c) => {
          return c.name === action.payload;
        });
      });

      if (action.payload === "All") {
        return {
          ...state,
          countries: filterByActivities,
        };
      } else {
        return {
          ...state,
          countries: filteredAct,
        };
      }

    case POST_ACTIVITIES:
      return {
        ...state,
      };

    case GET_ACTIVITIES:
      return {
        ...state,
        activities: action.payload,
      };

    case DETAIL:
      return {
        ...state,
        detail: action.payload,
      };

    case RESET:
      return {
        ...state,
        detail: [],
      };

    case SEARCH_COUNTRIES:
      return {
        ...state,
        countries: action.payload,
      };

    case ORDER_BY_NAME:
      let orderCountriesByName = [...state.countries];
      orderCountriesByName.sort((a, b) => {
        if (action.payload === ASC) {
          return a.name.localeCompare(b.name);
        } else {
          return b.name.localeCompare(a.name);
        }
      });

      return {
        ...state,
        countries: orderCountriesByName,
      };

    case ORDER_BY_POPULATION:
      let orderCountriesByPopulation = [...state.countries];
      orderCountriesByPopulation.sort((a, b) => {
        if (action.payload === HIGHER_POPULATION) {
          return b.population - a.population;
        } else {
          return a.population - b.population;
        }
      });

      return {
        ...state,
        countries: orderCountriesByPopulation,
      };

    default:
      return state;
  }
}
