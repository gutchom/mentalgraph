import React, { useEffect, useRef, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import firebase, { db } from 'app/config'

export type CounterProps = {
  titleId: string
  title: string
  count: number
  timestamp: number
  date: string
}

export const Counter: React.FC<CounterProps> = props => {
  const { timestamp } = props
  const [user] = useAuthState(firebase.auth())
  const [count, setCount] = useState(props.count)
  const [title, setTitle] = useState(props.title)
  const [confirming, setConfirming] = useState(false)
  const [removed, setRemoved] = useState(false)
  const counterRef = useRef<HTMLDivElement>(null)
  const path = `conditions/${user?.uid}/counter`

  useEffect(() => {
    setCount(props.count)
    setTitle(props.title)
  }, [props.count, props.title])

  function handleIncrement() {
    const next = count + 1
    setCount(next)
    db.ref(`${path}/counts/${props.date}/${props.titleId}`)
      .update({ count: next, title, timestamp })
  }

  function handleDecrement() {
    const next = count > 0 ? count - 1 : 0
    setCount(next)
    db.ref(`${path}/counts/${props.date}/${props.titleId}`)
      .update({ count: next, title, timestamp })
  }

  function handleTitleSubmit(event: any) {
    event.preventDefault()
    db.ref().update({
      [`${path}/counts/${props.date}/${props.titleId}`]: { title, count, timestamp },
      [`${path}/titles/${props.titleId}`]: { title, timestamp }
    })
  }

  function handleTransitionEnd(e: React.TransitionEvent<HTMLDivElement>) {
    if (e.propertyName === 'transform') {
      db.ref().update({
        [`${path}/counts/${props.date}/${props.titleId}`]: null,
        [`${path}/titles/${props.titleId}`]: null,
      })
      counterRef.current?.style.setProperty("display", "none")
    }
  }

  return (
    <div
      ref={counterRef}
      className="question-count--wrapper"
      style={{ transform: removed ? 'scale(0)' : 'scale(1)' }}
      onTransitionEnd={handleTransitionEnd}
    >
      <div
        className="confirm-deletion"
        style={{
          opacity: confirming ? 1 : 0,
          visibility: confirming ? 'visible' : 'hidden',
        }}
        tabIndex={0}
        onClick={() => setConfirming(false)}
      >
        <button onClick={() => setRemoved(true)}>
          <i className="far fa-trash-alt"/>
        </button>
      </div>
      <fieldset className="question count">
        {props.title?.length ?? props.title?.length > 0 ? (
          <legend>{title}</legend>
        ) : (
          <form onSubmit={handleTitleSubmit}>
            <input
              type="text"
              value={title}
              placeholder="カウンターの名前"
              onChange={e => setTitle(e.target.value)}
              onBlur={handleTitleSubmit}
            />
          </form>
        )}
        <div className="container">
          <button onClick={handleDecrement}>
            <i className="fas fa-minus"/>
          </button>
          <span>{count}</span>
          <button onClick={handleIncrement}>
            <i className="fas fa-plus"/>
          </button>
          <button onClick={() => setConfirming(true)}>
            <i className="far fa-trash-alt"/>
          </button>
        </div>
      </fieldset>
    </div>
  )
}
