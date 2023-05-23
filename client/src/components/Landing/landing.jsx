import React from "react";
import { Link } from "react-router-dom";
import style from "./landing.module.css";

export default function LandingPage() {
  return (
    <div className={style.landingPage}>
      <div className={style.landing__container}>
        <div className={style.landing__box}>
          <h1 className={style.landing__title}>
            <span className={style.landing__title__highlight}>Countries</span>
          </h1>
          <p className={style.landing__description}>
            Welcome to Countries, the ultimate destination for travel
            enthusiasts! Our website provides you with a unique platform to
            discover and explore different countries around the world while
            planning exciting activities for your journey. With Countries, you
            can browse through an extensive collection of countries, each
            offering a rich tapestry of culture, history, and natural beauty.
            Immerse yourself in the diverse landscapes, vibrant cities, and
            hidden gems of each destination.
          </p>
          <Link to="/home">
            <button className={style.landing__button}>Start</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
