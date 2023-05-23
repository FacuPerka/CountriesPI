import React from "react";
import '../ActivityList/activitylist'

export default function Activity ({ name, duration, season, difficulty, countryId }) {
    return (
    <div>
        <h1>{name}</h1>
        <h3>Duration: {duration}</h3>
        <h3>Season: {season}</h3>
        <h3>Difficulty: {difficulty}</h3>
        <h3>{countryId}</h3>
    </div>
    )
}