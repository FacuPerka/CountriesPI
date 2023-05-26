import React from "react";
import { Link } from 'react-router-dom';
import style from '../NotFound/notfound.module.css'

export default function NotFound() {
  return (
    <div className={style.NotFound}>
      <h1 className={style.title}>404</h1>
      <p className={style.description}>Oops! The page you're looking for does not exist.</p>
      <Link to="/" className={style.link}>Go back to start</Link>
    </div>
  );
}
