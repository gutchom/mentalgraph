import React, { useEffect, useReducer } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useList } from 'react-firebase-hooks/database'
import firebase, { db } from 'app/config'

type WeatherChoiceProps = {
  weather: Weathers
  isChecked: boolean
  onSelect: (action: ActionType) => void
}

const WeatherChoice: React.FC<WeatherChoiceProps> = (props) => {
  return (
    <li>
      <label>
        <input
          className="checkbox"
          type="checkbox"
          checked={props.isChecked}
          onChange={() => props.onSelect({ type: props.weather, flag: !props.isChecked })}
        />
        <div>{props.children}</div>
      </label>
    </li>
  )
}

export type Weathers = 'cloudy' | 'sunny' | 'rainy' | 'snowy' | 'storm'

export type WeatherState = {
  [key in Weathers]: boolean
}

const initialWhether: WeatherState = {
  cloudy: false,
  sunny: false,
  rainy: false,
  snowy: false,
  storm: false,
}

type ActionType = {
  type: Weathers
  flag: boolean
}

function reducer(state: WeatherState, action: ActionType): WeatherState {
  return { ...state, [action.type]: action.flag }
}

export const Weather: React.FC<{ date: string }> = ({ date }) => {
  const [user] = useAuthState(firebase.auth())
  const [weather, dispatch] = useReducer(reducer, initialWhether)
  const [init, loading] = useList(db.ref(`conditions/${user?.uid}/weather/${date}`))

  useEffect(() => {
    Object.keys(weather).forEach((type: Weathers) => dispatch({ type, flag: false}))
  }, [date])

  useEffect(() => {
    init?.forEach(item => {
      dispatch({ type: item.key as Weathers, flag: item.val() })
    })
  }, [loading])

  function handleSelect(action: ActionType) {
    dispatch(action)
    db.ref(`conditions/${user?.uid}/weather/${date}`)
      .set({ ...weather, [action.type]: action.flag })
  }
  return (
    <fieldset className="question weather">
      <legend>天気</legend>
      <ul>
        <WeatherChoice weather="sunny" isChecked={weather.sunny} onSelect={handleSelect}>
          <i className="fas fa-sun"/>
        </WeatherChoice>
        <WeatherChoice weather="cloudy" isChecked={weather.cloudy} onSelect={handleSelect}>
          <i className="fas fa-cloud"/>
        </WeatherChoice>
        <WeatherChoice weather="rainy" isChecked={weather.rainy} onSelect={handleSelect}>
          <i className="fas fa-umbrella"/>
        </WeatherChoice>
        <WeatherChoice weather="storm" isChecked={weather.storm} onSelect={handleSelect}>
          <i className="fas fa-bolt"/>
        </WeatherChoice>
        <WeatherChoice weather="snowy" isChecked={weather.snowy} onSelect={handleSelect}>
          <i className="fas fa-snowflake"/>
        </WeatherChoice>
      </ul>
    </fieldset>
  )
}
