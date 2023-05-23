import React from "react";
import { useSelector } from "react-redux";
import Activity from "../Activity/activity.jsx";
import NavBar from "../NavBar/navbar";
import style from "../ActivityList/activitylist.module.css";

export default function ActivityList() {
    const activities = useSelector((state) => state.activities);
    return (
    <div className={style.activityList__Container}>
        <div>
        <NavBar/>
        </div>

        <div className={style.Activity__Cards__List}>{
        activities?.map((acc) => {
            return (
            <div className={style.Activity__Card}>
                <Activity
                name={acc.name}
                duration={acc.duration}
                season={acc.season}
                difficulty={acc.difficulty}
                /> 
            </div>
            )
        })}
        </div>
    </div>
    )
}