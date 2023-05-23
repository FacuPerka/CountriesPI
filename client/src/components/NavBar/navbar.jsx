import React from "react";
import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar/searchbar';
import style from './navbar.module.css';

export default function NavBar() {
  return (
    <nav className={style.navbar}>
      <div className={style.logoContainer}>
        <Link to="/Home">
          <img src="https://cdn-icons-png.flaticon.com/512/25/25694.png" alt='Logo' className={style.logo} />
        </Link>
      </div>
      <div className={style.navbarOptions}>
        <SearchBar />
        <Link className={style.navbarLink} to='/Activity'>
          Create Activity
        </Link>
        <Link className={style.navbarLink} to='/Activities'>
          Activities List
        </Link>
      </div>
    </nav>
  );
}
