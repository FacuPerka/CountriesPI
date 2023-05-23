import React from "react";
import style from '../Card/card.module.css';

export default function Card ({ name, flag, continent, capital, population, id }) {
    return (
        <div className={style.Card_Box}>
        <h2 className={style.Card__Name}>{name}</h2>
        <img className={style.Card__Img} src={flag} alt={name}/>
            <h5 className={style.Card__Continent}>Continent: {continent}</h5>
        </div>
    )
};