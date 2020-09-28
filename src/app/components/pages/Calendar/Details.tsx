import React, { MouseEvent } from 'react'
import { DateTime } from 'luxon'
import { emoticons } from 'app/components/pages/Calendar'
import { WeatherState, Weathers } from 'app/components/pages/Questionnaire/Weather'

export type DetailProps = {
  date: string
  mood: number
  weather: WeatherState
  sleeping?: {
    awake: number
    asleep: number
  }
  counts: {
    id: string
    title: string
    count: number
  }[]
  handleOpenEdit(e: MouseEvent<HTMLButtonElement>): void
}

const weather: { [key in Weathers]: string } = {
  sunny: 'fas fa-sun',
  cloudy: 'fas fa-cloud',
  rainy: 'fas fa-umbrella',
  storm: 'fas fa-bolt',
  snowy: 'fas fa-snowflake',
}

export const Detail: React.FC<DetailProps> = props => {
  if (!props.date) {return <></>}
  const date = DateTime.fromISO(props.date)
  const awake = props.sleeping?.awake ? DateTime.fromMillis(props.sleeping?.awake) : null
  const asleep = props.sleeping?.asleep ? DateTime.fromMillis(props.sleeping?.asleep) : null

  return (
    <div className="calendar--detail">
      <header>
        <h3>{date.month}/{date.day}</h3>
        {date <= DateTime.local() && (
          <button onClick={props.handleOpenEdit}><i className="far fa-edit"/></button>
        )}
      </header>

      <div className="topic icon">
        {props.mood > 0 && <i className={emoticons[props.mood]}/>}
        {props.weather && Object.keys(props.weather).map((condition: Weathers) => (
          props.weather[condition] && <i key={condition} className={weather[condition]}/>
        ))}
      </div>

      {props.counts.length > 0 && (
        <div className="topic count">
          {props.counts?.map(count => (
            <span key={count.id}>{count.title}: {count.count ?? 0}回</span>
          ))}
        </div>
      )}

      {(awake || asleep) &&(
        <div className="topic time">
          {awake && <span>{awake.hour}時{awake.minute === 0 ? '' : `${awake.minute}分`}頃起床</span>}
          {asleep && <span>{asleep.hour}時{asleep.minute === 0 ? '' : `${asleep.minute}分`}頃就寝</span>}
        </div>
      )}
    </div>
  )
}
