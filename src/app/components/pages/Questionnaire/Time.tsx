import React, { useState } from 'react'

export type TimeProps = {
  title: string;
  defaultHour: string;
}

function range(length: number): number[] {
  return [...Array(length)].map((_, n) => n)
}

export const Time: React.FC<TimeProps> = props => {
  const [hour, setHour] = useState('')
  const [minute, setMinute] = useState('')

  return (
    <fieldset className="question time">
      <legend>{props.title}</legend>
      <div className="container">
        <select dir="rtl" value={hour} onChange={e => setHour(e.target.value)}>
          {['', ...range(24)].map(hour => (<option key={hour} value={hour}>{hour}</option>))}
        </select>
        <span>時</span>

        <select dir="rtl" value={minute} onChange={e => setMinute(e.target.value)}>
          {['', ...range(60)].map(minute => (<option key={minute} value={minute}>{minute}</option>))}
        </select>
        <span>分</span>
      </div>
    </fieldset>
  )
}
