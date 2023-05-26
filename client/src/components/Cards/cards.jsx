import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getCountries,
  filterByContinent,
  filterByActivity,
  orderByName,
  orderByPopulation,
  getActivities,
  searchCountries,
} from "../../redux/actions/index";
import {
  LESS_POPULATION,
  HIGHER_POPULATION,
  ALL,
  ALL_AFRICA,
  ALL_ASIA,
  ALL_EUROPE,
  ALL_OCEANIA,
  ASC,
  DESC,
} from "../../types/const";
import Card from "../Card/card";
import Paginado from "../Paginated/paginated";
import style from "./cards.module.css";

export default function Cards() {
  const dispatch = useDispatch();
  const activities = useSelector((state) => state.activities);
  const countries = useSelector((state) => state.countries);
  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage] = useState(10);
  const [currentCountry, setCurrentCountry] = useState([]);
  const [, setOrden] = useState("");
  const [search, setSearch] = useState("");
  const [searchError, setSearchError] = useState(false);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const reloadCountries = () => {
    dispatch(getCountries());
    setSearch("");
  };

  const handleFilterContinent = (event) => {
    dispatch(filterByContinent(event.target.value));
    setCurrentPage(1);
    setSearch("");
  };

  const handleFilterActivity = (event) => {
    const selectedActivity = event.target.value;
    if (selectedActivity === "todos") {
      dispatch(getCountries()); // Obtener la lista completa de países
    } else {
      dispatch(filterByActivity(selectedActivity));
    }
    setCurrentPage(1);
    setSearch("");
    if (currentCountry.length === 0) {
      window.location.reload();
    }
  };

  const handleSort = (event) => {
    event.preventDefault();
    dispatch(orderByName(event.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${event.target.value}`);
    setSearch("");
  };

  const handleSort2 = (event) => {
    event.preventDefault();
    dispatch(orderByPopulation(event.target.value));
    setCurrentPage(1);
    setOrden(`Ordenador ${event.target.value}`);
    setSearch("");
  };

  const handleSearch = (event) => {
    event.preventDefault();
    if (search.trim() === "") {
      // Mostrar el error si la búsqueda está vacía
      setSearchError(true);
    } else {
      dispatch(searchCountries(search));
      setCurrentPage(1);
      setSearchError(false);
    }
  };

  useEffect(() => {
    dispatch(getCountries());
    dispatch(getActivities());
  }, [dispatch]);

  useEffect(() => {
    const lastCountry = currentPage * countriesPerPage;
    const firstCountry = lastCountry - countriesPerPage;
    setCurrentCountry(countries.slice(firstCountry, lastCountry));
  }, [currentPage, countries, countriesPerPage]);

  return (
    <div className={style.cardsContainer}>
      <div className={style.filterContainer}>
        <button
          id="reloadButton"
          className={style.filterOption}
          onClick={reloadCountries}
        >
          Reload
        </button>
        <select
          className={style.filterOption}
          onChange={handleSort}
          defaultValue=""
        >
          <option disabled value="">
            Filter By Alphabetic Order
          </option>
          <option value={ASC}>A - Z</option>
          <option value={DESC}>Z - A</option>
        </select>

        <select
          className={style.filterOption}
          onChange={handleSort2}
          defaultValue=""
        >
          <option disabled value="">
            Filter By Population
          </option>
          <option value={HIGHER_POPULATION}>HIGHER POPULATION</option>
          <option value={LESS_POPULATION}>LOWER POPULATION</option>
        </select>

        <select className={style.filterOption} onChange={handleFilterActivity}>
          <option value="todos">Activities</option>
          {activities.map((val) => (
            <option key={val.name} value={val.name}>
              {val.name}
            </option>
          ))}
        </select>

        <select className={style.filterOption} onChange={handleFilterContinent}>
          <option value={ALL}>All Continents</option>
          <option value={ALL_AFRICA}>Africa</option>
          <option value="Americas">America</option>
          <option value={ALL_ASIA}>Asia</option>
          <option value={ALL_EUROPE}>Europe</option>
          <option value={ALL_OCEANIA}>Oceania</option>
        </select>

        <form className={style.form} onSubmit={handleSearch}>
          <input
            className={style.form__input}
            type="text"
            placeholder="Search countries..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {searchError && <p>Error: Please enter a search query.</p>}
          <button className={style.form__button} type="submit">
            Search
          </button>
        </form>
      </div>
      <div className={style.cardsBox}>
        {currentCountry?.map((country) => (
          <div className={style.card} key={country.id}>
            <Link className={style.cardLink} to={`/home/${country.id}`}>
              <Card
                name={country.name}
                flag={country.flag}
                continent={country.continent}
                capital={country.capital}
                population={country.population}
              />
            </Link>
          </div>
        ))}
      </div>

      <Paginado
        countriesPerPage={countriesPerPage}
        countries={countries.length}
        paginado={paginado}
        currentPage={currentPage}
      />
    </div>
  );
}
