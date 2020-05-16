import React, { MouseEvent, useState, useEffect } from 'react'

export type CountProps = {
  title: string
  showConfigButton?: boolean
  onOpenEdit(e: MouseEvent<HTMLButtonElement>): void
}

export const Counter: React.FC<CountProps> = props => {
  const [times, setTimes] = useState(0)

  useEffect(() => {
    if (times < 0) {
      setTimes(0)
    }
  })

  return (
    <div className="question-count--wrapper">
      <fieldset className="question count">
        <legend>{props.title}</legend>
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
      {props.showConfigButton &&
        (
          <button className="question--config" onClick={props.onOpenEdit}>
            <i className="fas fa-wrench"/>
          </button>
        )
      }
    </div>
  )
}
