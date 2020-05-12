import React, { useReducer } from 'react'

export type Weather = 'cloudy' | 'sunny' | 'rainy' | 'snowy' | 'storm'

export type WeatherState = {
  cloudy: boolean;
  sunny: boolean;
  rainy: boolean;
  snowy: boolean;
  storm: boolean;
}

const initialWhether: WeatherState = {
  cloudy: false,
  sunny: false,
  rainy: false,
  snowy: false,
  storm: false,
}

function reducer(state: WeatherState, action: {type: Weather}): WeatherState {
  return { ...state, [action.type]: !state[action.type] }
}

export const Weather: React.FC = () => {

  const [whether, dispatch] = useReducer(reducer, initialWhether)

  return (
    <fieldset className="question weather">
      <legend>天気</legend>
      <ul>
        <li>
          <label>
            <input
              className="checkbox"
              type="checkbox"
              checked={whether.sunny}
              onChange={() => dispatch({type: 'sunny'})}
            />
            <div><i className="fas fa-sun"/></div>
          </label>
        </li>
        <li>
          <label>
            <input
              className="checkbox"
              type="checkbox"
              checked={whether.cloudy}
              onChange={() => dispatch({type: 'cloudy'})}
            />
            <div><i className="fas fa-cloud"/></div>
          </label>
        </li>
        <li>
          <label>
            <input
              className="checkbox"
              type="checkbox"
              checked={whether.rainy}
              onChange={() => dispatch({type: 'rainy'})}
            />
            <div><i className="fas fa-umbrella"/>️</div>
          </label>
        </li>
        <li>
          <label>
            <input
              className="checkbox"
              type="checkbox"
              checked={whether.storm}
              onChange={() => dispatch({type: 'storm'})}
            />
            <div><i className="fas fa-bolt"/></div>
          </label>
        </li>
        <li>
          <label>
            <input
              className="checkbox"
              type="checkbox"
              checked={whether.snowy}
              onChange={() => dispatch({type: 'snowy'})}
            />
            <div><i className="fas fa-snowflake"/></div>
          </label>
        </li>
      </ul>
    </fieldset>
  )
}
