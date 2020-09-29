import React from 'react'
import { DateTime } from 'luxon'
import { useAuthState } from 'react-firebase-hooks/auth'
import firebase, { db } from 'app/config'
import { Time, TimeInputType } from './Time'

export type SleepingTimeProps = {
  date: string
}

export const SleepingTime: React.FC<SleepingTimeProps> = props => {
  const [user] = useAuthState(firebase.auth())
  const date = DateTime.fromISO(props.date)

  function handleChange(type: TimeInputType, hour: number, minute: number) {
    const timestamp = date.set({ hour, minute }).toMillis()
    db.ref(`conditions/${user?.uid}/sleeping/${date.toISODate()}/${type}`).set(timestamp)
  }

  return (
    <>
      <Time
        type="awake"
        title="起床時刻"
        date={props.date}
        onChange={handleChange}
      />
      <Time
        type="asleep"
        title="就寝時刻"
        date={props.date}
        onChange={handleChange}
      />
    </>
  )
}
