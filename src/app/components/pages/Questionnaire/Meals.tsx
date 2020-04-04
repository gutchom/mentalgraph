import React, { useState, useEffect } from 'react'

export const Meals: React.FC = () => {
  const [times, setTimes] = useState(0)

  useEffect(() => {
    if (times < 0) {
      setTimes(0)
    }
  })

  return (
    <fieldset className="question meals">
      <legend>食事</legend>
      <div className="container">
        <button onClick={() => setTimes(times - 1)}>
          <i className="fas fa-minus"/>
        </button>
        <span>{times}</span>
        <button onClick={() => setTimes(times + 1)}>
          <i className="fas fa-plus"/>
        </button>
      </div>
    </fieldset>
  )
}
