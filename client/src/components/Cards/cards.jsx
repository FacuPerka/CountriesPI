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
  const lastCountry = currentPage * countriesPerPage;
  const firstCountry = lastCountry - countriesPerPage;
  const currentCountry = countries.slice(firstCountry, lastCountry);
  const [, setOrden] = useState("");

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const reloadCountries = () => {
    dispatch(getCountries());
  };

  const handleFilterContinent = (event) => {
    dispatch(filterByContinent(event.target.value));
    setCurrentPage(1);
  };

  const handleFilterActivity = (event) => {
    dispatch(filterByActivity(event.target.value));
    setCurrentPage(1);
  };

  const handleSort = (event) => {
    event.preventDefault();
    dispatch(orderByName(event.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${event.target.value}`);
  };

  const handleSort2 = (event) => {
    event.preventDefault();
    dispatch(orderByPopulation(event.target.value));
    setCurrentPage(1);
    setOrden(`Ordenador ${event.target.value}`);
  };

  useEffect(() => {
    dispatch(getCountries());
    dispatch(getActivities());
  }, [dispatch]);

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

        <select
          className={style.filterOption}
          onChange={handleFilterActivity}
        >
          <option value="todos">Activities</option>
          {activities.map((val) => (
            <option key={val.name} value={val.name}>
              {val.name}
            </option>
          ))}
        </select>

        <select
          className={style.filterOption}
          onChange={handleFilterContinent}
        >
          <option value={ALL}>All Continents</option>
          <option value={ALL_AFRICA}>Africa</option>
          <option value="Americas">America</option>
          <option value={ALL_ASIA}>Asia</option>
          <option value={ALL_EUROPE}>Europe</option>
          <option value={ALL_OCEANIA}>Oceania</option>
        </select>
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
      />
    </div>
  );
}
