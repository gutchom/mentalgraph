import React from 'react'
import { v4 as uuid } from 'uuid'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useList } from 'react-firebase-hooks/database'
import firebase, { db } from 'app/config'
import { Counter } from './Counter'

export type CountersProps = {
  date: string
}

export const Counters: React.FC<CountersProps> = props => {
  const [user] = useAuthState(firebase.auth())
  const path = `conditions/${user?.uid}/counter`
  const counts = useList(db.ref(`${path}/counts/${props.date}`))[0]
    ?.map(item => ({
      titleId: item.key,
      title: item.val().title,
      count: item.val().count,
    }))
  const counters = useList(
    db.ref(`${path}/titles`))[0]
    ?.map(item => ({
      id: item.key,
      title: item.val().title,
      timestamp: item.val().timestamp,
    }))
    ?.map(({ id, title, timestamp }) => ({
      title,
      timestamp,
      titleId: id,
      count: counts?.find(({ titleId }) => titleId === id)?.count
    }))
    .sort((a, b) => a.timestamp - b.timestamp)

  function handleCounterAdd(title = '') {
    const titleId = uuid()
    const timestamp = Date.now()
    db.ref().update({
      [`${path}/titles/${titleId}`]: { title, timestamp },
      [`${path}/counts/${props.date}/${titleId}`]: { count: 0, title, timestamp },
    })
  }

  return (
    <>
      {counters?.length === 0 ? (
        <fieldset className="question count">
          <legend>カウンター</legend>
        </fieldset>
      ) : counters?.map(({ titleId, title, count, timestamp }) => (
        <Counter
          key={titleId as string}
          titleId={titleId as string}
          title={title as string }
          count={count as number ?? 0}
          timestamp={timestamp as number}
          date={props.date}
        />
      ))}
      <button className="question--config" onClick={() => handleCounterAdd()}>
        <i className="fas fa-plus"/>
      </button>
    </>
  )
}
