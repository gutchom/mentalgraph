import React, { useEffect, useState } from 'react'
import { DateTime } from 'luxon'
import { Mood } from './Mood'
import { Weather } from './Weather'
import { Counters } from './Counters'
import { SleepingTime } from './SleepingTime'

export const Questionnaire: React.FC<{ date?: string }> = (props) => {
  const now = DateTime.local()
  const [date, setDate] = useState(now.toISODate())

  useEffect(() => {
    if (props.date) {setDate(props.date)}
  }, [props.date])

  return (
    <>
      <Mood date={date}/>
      <Weather date={date}/>
      <SleepingTime date={date}/>
      <Counters date={date}/>
    </>
  )
}
