import React from 'react'

export type TimeProps = {
  title: string;
  defaultHour: string;
}

export const Time: React.FC<TimeProps> = props => {
  return (
    <fieldset className="question time">
      <legend>{props.title}</legend>
      <div className="container">
        <input
          type="number"
          placeholder={props.defaultHour ?? '8'}/>
        <span>時</span>

        <input
          type="number"
          placeholder="30"/>
        <span>分</span>
      </div>
    </fieldset>
  )
}
