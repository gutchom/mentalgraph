import React, { useEffect, useState } from 'react'
import { DateTime } from 'luxon'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useObjectVal } from 'react-firebase-hooks/database'
import firebase, { db } from 'app/config'

export type TimeInputType = 'awake' | 'asleep'

export type TimeProps = {
  type: TimeInputType
  date: string
  title: string
  onChange(type: TimeInputType, hour: number, minute: number): void
}

export const Time: React.FC<TimeProps> = props => {
  const [user] = useAuthState(firebase.auth())
  const path = `conditions/${user?.uid}/sleeping/${props.date}`
  const [timestamp, loading] = useObjectVal(db.ref(`${path}/${props.type}`))
  const [hour, setHour] = useState(0)
  const [minute, setMinute] = useState(0)

  useEffect(() => {
    if (!loading && timestamp) {
      const time = DateTime.fromMillis(timestamp as number)
      setHour(time.hour)
      setMinute(time.minute)
    }
  }, [loading])

  useEffect(() => {
    setHour(0)
    setMinute(0)
  }, [props.date])

  function handleHourChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const current = parseInt(e.target.value, 10)
    setHour(current)
    props.onChange(props.type, current, minute)
  }

  function handleMinuteChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const current = parseInt(e.target.value, 10)
    setMinute(current)
    props.onChange(props.type, hour, current)
  }

  return (
    <fieldset className="question time">
      <legend>{props.title}</legend>
      <div className="container">
        <select dir="rtl" value={hour} onChange={handleHourChange}>
          {[...Array(24)].map((_, hour) => (
            <option key={hour} value={hour}>{hour}</option>
          ))}
        </select>
        <span>時</span>

        <select dir="rtl" value={minute} onChange={handleMinuteChange}>
          {[...Array(12)].map((_, minute) => (
            <option key={minute} value={minute * 5}>{minute * 5}</option>
          ))}
        </select>
        <span>分</span>
      </div>
    </fieldset>
  )
}
