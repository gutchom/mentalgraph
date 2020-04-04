import React, { useState } from 'react'

export const Condition: React.FC = () => {

  const [condition, setCondition] = useState(0)

  return (
    <fieldset className="question condition">
      <legend>体調</legend>
      <ul>
        <li>
          <label>
            <input
              className="checkbox"
              type="radio"
              checked={condition === 1}
              onChange={() => setCondition(1)}
            />
            <div><i className="fas fa-dizzy"/></div>
          </label>
        </li>
        <li>
          <label>
            <input
              className="checkbox"
              type="radio"
              checked={condition === 2}
              onChange={() => setCondition(2)}
            />
            <div><i className="fas fa-frown"/></div>
          </label>
        </li>
        <li>
          <label>
            <input
              className="checkbox"
              type="radio"
              checked={condition === 3}
              onChange={() => setCondition(3)}
            />
            <div><i className="fas fa-meh"/></div>
          </label>
        </li>
        <li>
          <label>
            <input
              className="checkbox"
              type="radio"
              checked={condition === 4}
              onChange={() => setCondition(4)}
            />
            <div><i className="fas fa-smile"/></div>
          </label>
        </li>
        <li>
          <label>
            <input
              className="checkbox"
              type="radio"
              checked={condition === 5}
              onChange={() => setCondition(5)}
            />
            <div><i className="fas fa-grin-stars"/></div>
          </label>
        </li>
      </ul>
    </fieldset>
  )
}
