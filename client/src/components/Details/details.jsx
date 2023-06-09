import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getDetail, restartDetail } from '../../redux/actions';
import NavBar from '../NavBar/navbar.jsx';
import style from '../Details/details.module.css';

export default function Detail(props) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(restartDetail())
        dispatch(getDetail(props.match.params.id))
    }, [dispatch, props.match.params.id]) //No es necesario el dispatch.

    const countriesDetail = useSelector((state) => state.detail)

    return (

        <div key={countriesDetail.id} className={style.Detail}>
        <div>
            <NavBar />
        </div>
        
        <div className={style.Detail__Box}>{
            countriesDetail.length ?
            <div className={style.Detail__Country}>
                <div className={style.Detail__Img__Cont}>
                <img className={style.Detail__Img} src={countriesDetail[0].flag} alt={countriesDetail[0].name} width='250px' height='175px' />  
                </div>
                <div className={style.Detail_Info__Cont}>
                <h1 className={style.objDetail}>{countriesDetail[0].name}</h1>
                <div className={style.Detail__Info}>
                    <h2>ID: {countriesDetail[0].id}</h2>
                    <h2>Continent: {countriesDetail[0].continent}</h2>
                    <h2>Capital: {countriesDetail[0].capital}</h2>
                    <h2>Subregion: {countriesDetail[0].subregion}</h2>
                    <h2>Area: {countriesDetail[0].area} km2</h2>
                    <h2>Population: {countriesDetail[0].population}</h2>
                </div>
                </div>       

                <div className={style.Detail__Activities}>  {countriesDetail[0].activities.map(el => {
                return (
                    <div>
                    <Link className={style.Link__Detail} to='/activities'>
                        <h1>Activity</h1>
                    </Link>
                    <div>
                        <h3>{el.name}</h3>
                        <h3>Difficulty: {el.difficulty}</h3>
                        <h3>Duration: {el.duration}</h3>
                        <h3>Season: {el.season}</h3>
                        <h3>___________</h3>
                    </div>
                    </div>
                )
                })}
                </div>

            </div> : <div className={style.loading}>
                <h1> Loading... </h1>
            </div>

        }</div>
        </div>
    );
}