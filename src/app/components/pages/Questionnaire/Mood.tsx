import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useObjectVal } from 'react-firebase-hooks/database'
import firebase, { db } from 'app/config'

type MoodChoiceProps = {
  scale: number
  mood: number
  onSelect: (mood: number) => void
}

const MoodChoice: React.FC<MoodChoiceProps> = (props) => {
  return (
    <li>
      <label>
        <input
          className="checkbox"
          type="radio"
          checked={props.mood === props.scale}
          onChange={() => props.onSelect(props.scale)}
        />
        <div>{props.children}</div>
      </label>
    </li>
  )
}

export const Mood: React.FC<{ date: string }> = ({ date }) => {
  const [user] = useAuthState(firebase.auth())
  const [mood, setMood] = useState(0)
  const [init, loading] = useObjectVal(db.ref(`conditions/${user?.uid}/moods/${date}`))

  useEffect(() => {
    if (!loading) {setMood(init as number)}
  }, [loading])

  function handleSelect(mood: number) {
    setMood(mood)
    db.ref(`conditions/${user?.uid}/moods/${date}`).set(mood)
  }

  return (
    <fieldset className="question condition">
      <legend>調子</legend>
      <ul>
        <MoodChoice scale={1} mood={mood} onSelect={handleSelect}>
          <i className="fas fa-dizzy"/>
        </MoodChoice>
        <MoodChoice scale={2} mood={mood} onSelect={handleSelect}>
          <i className="fas fa-frown"/>
        </MoodChoice>
        <MoodChoice scale={3} mood={mood} onSelect={handleSelect}>
          <i className="fas fa-meh"/>
        </MoodChoice>
        <MoodChoice scale={4} mood={mood} onSelect={handleSelect}>
          <i className="fas fa-smile"/>
        </MoodChoice>
        <MoodChoice scale={5} mood={mood} onSelect={handleSelect}>
          <i className="fas fa-grin-stars"/>
        </MoodChoice>
      </ul>
    </fieldset>
  )
}
