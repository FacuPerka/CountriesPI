import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchCountries } from '../../redux/actions/index';
import { useLocation } from 'react-router-dom';
import style from '../SearchBar/searchbar.module.css';

export default function SearchBar() {
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const location = useLocation();

  function onSubmit(event) {
    event.preventDefault();
    if (search.length === 0) {
      setError('You should introduce a country');
      return;
    }
    dispatch(searchCountries(search));
    setSearch('');
  }

  function onInputChange(event) {
    setSearch(event.target.value);
    setError('');
  }

  if (location.pathname.toLowerCase() !== '/home') {
    return null;
  }
  
  return (
    <div>
      <form className={style.form} onSubmit={onSubmit}>
        <input className={style.form__input} type='text' placeholder='Write a country' onChange={onInputChange} value={search} />
        <input className={style.form__button} type='submit' value='Submit' />
        {error && <p className={style.error}>{error}</p>}
      </form>
    </div>
  );
}
