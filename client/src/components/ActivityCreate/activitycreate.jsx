import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { postActivities, getActivities } from "../../redux/actions";
import { WINTER, SUMMER, AUTUM, SPRING } from "../../types/const";
import NavBar from "../NavBar/navbar";
import style from "../ActivityCreate/activitycreate.module.css";

function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = "You must fill this field above";
  } else if (!input.duration) {
    errors.duration = "You must fill this field";
  } else if (!input.difficulty) {
    errors.difficulty = "You must choose the difficulty";
  } else if (!input.season) {
    errors.difficulty = "You must choose the season";
  } else if (!input.countryId === []) {
    errors.countryId = "You must select a country";
  }
  return errors;
}

export default function ActivityCreate() {
  const dispatch = useDispatch();
  const history = useHistory();
  const countries = useSelector((state) => state.allCountries);
  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    name: "",
    duration: "",
    difficulty: "",
    season: "",
    countryId: [],
  });

  useEffect(() => {
    dispatch(getActivities());
  }, [dispatch]);

  function handleChange(ele) {
    setInput({
      ...input,
      [ele.target.name]: ele.target.value,
    });
    setErrors(
      validate({
        ...input,
        [ele.target.name]: ele.target.value,
      })
    );
  }

  function handleDelete(i) {
    setInput({
      ...input,
      countryId: input.countryId.filter((ele) => ele !== i),
    });
  }

  function handleSelect(ele) {
    setInput({
      ...input,
      countryId: [...input.countryId, ele.target.value],
    });
  }

  function handleSubmit(ele) {
    ele.preventDefault();
    if (
      input.name === "" ||
      input.duration === "" ||
      input.difficulty === "" ||
      input.season === "" ||
      input.countryId.length === 0
    )
      return alert("You must complete the fields");
    dispatch(postActivities(input));
    alert("Activity Created");
    setInput({
      name: "",
      duration: "",
      difficulty: "",
      season: "",
      countryId: [],
    });
    history.push("/home");
  }

  return (
    <div className={style.Activity__Container}>
      <div>
        <NavBar />
      </div>

      <div className={style.Activity__Box}>
        <form className={style.Activity__Form} onSubmit={handleSubmit}>
          <h3 className={style.Form__Title}>Plan your activity</h3>
          <div className={style.Form__Input}>
            <label className={style.LabelActivity}>Activity</label>
            <input
              className={style.Form__Field}
              type="text"
              placeholder="Write an activity"
              value={input.name}
              name="name"
              onChange={handleChange}
            />
          </div>
          {errors.name && <p className={style.error}>{errors.name}</p>}
          <div className={style.Form__Input}>
            <label> Duration </label>
            <input
              className={style.Form__Field}
              type="text"
              value={input.duration}
              name="duration"
              placeholder="Write the duration"
              onChange={handleChange}
            />
          </div>
          {errors.duration && <p className={style.error}>{errors.duration}</p>}
          <div className={style.Form__Input}>
            <label> Difficulty </label>
            <input
              className={style.Form__Range}
              type="range"
              name="difficulty"
              min="1"
              max="5"
              value={input.difficulty}
              onChange={(e) => handleChange(e)}
            />
          </div>
          {errors.difficulty && (
            <p className={style.error}>{errors.difficulty}</p>
          )}
          <div className={style.Form__Input}>
            <select
              className={style.Form__Select}
              name="season"
              value={input.season}
              onChange={(e) => handleChange(e)}
            >
              <option>Season</option>
              <option value={WINTER}>Winter</option>
              <option value={SUMMER}>Summer</option>
              <option value={AUTUM}>Autum</option>
              <option value={SPRING}>Spring</option>
            </select>
            {errors.season && <p className={style.error}>{errors.season}</p>}
          </div>
          {errors.countryId && (
            <p className={style.error}>{errors.countryId}</p>
          )}

          <div className={style.Form__Input}>
            <select
              className={style.Form__Select}
              onChange={(e) => handleSelect(e)}
            >
              <option className={style.op}> Countries </option>
              {countries.map((v) => (
                <option className={style.op} value={v.id}>
                  {v.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            {input.countryId.map((country) => (
              <div>
                <input
                  className={style.Form__Button}
                  type="button"
                  value="X"
                  onClick={() => handleDelete(country)}
                />
                <p>{country}</p>
              </div>
            ))}
          </div>
          <div>
            <button className={style.Form__Button} type="submit">
              Create Activity
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
