import React, { useState } from 'react'
import { DateTime } from 'luxon'
import { Weather } from 'app/components/pages/Questionnaire/Weather'

export type Date = {
  year: number
  month: number
  date: number
  condition: 0|1|2|3|4|5
  weathers: Weather[]
}

export type Calendar = {
  calendar: Date[]
}

function range(length: number): number[] {
  return [...Array(length)].map((_, n) => n)
}

// todo: replace mock data
const calendar: Date[] = range(31).map(n => {
  const year = 2020
  const month = 5
  const date = n+1
  const condition = Math.floor(Math.random() * 5) as 0|1|2|3|4|5
  const weathers = ['rainy', 'sunny', 'cloudy', 'storm', 'snowy']
    .sort(() => Math.random() - 0.5)
    .slice(Math.abs(Math.random() * 5)) as Weather[]

  return { year, month, date, condition, weathers }
})
const json: Calendar = { calendar }

const weekdays = ['日', '月', '火', '水', '木', '金', '土']
const faces = [
  '',
  'fas fa-dizzy',
  'fas fa-frown',
  'fas fa-meh',
  'fas fa-smile',
  'fas fa-grin-stars',
]
const weather = {
  sunny: 'fas fa-sun',
  cloudy: 'fas fa-cloud',
  rainy: 'fas fa-umbrella',
  storm: 'fas fa-bolt',
  snowy: 'fas fa-snowflake',
}

export const Calendar: React.FC = _ => {
  const { calendar } = json
  const now = DateTime.local()
  const [year, setYear] = useState(now.year)
  const [month, setMonth] = useState(now.month)
  const firstDate = DateTime.local(year, month, 1)
  const firstDateOfCalendar = firstDate.minus({days: firstDate.weekday - 1})

  function handlePrevMonthClick() {
    if (month === 1) {
      setYear(year - 1)
      setMonth(12)
    } else {
      setMonth(month - 1)
    }
  }
  function handleNextMonthClick() {
    if (month === 12) {
      setYear(year + 1)
      setMonth(1)
    } else {
      setMonth(month + 1)
    }
  }

  return (
    <>
      <header>
        <h2 style={{textAlign: 'right', marginBottom: '4px',}}>
          {`${year}年${month}月`}
        </h2>
      </header>
      <table className="calendar">
        <thead>
        <tr>
          {range(7).map(n => (<th key={n} className="calendar--day">{weekdays[n]}</th>))}
        </tr>
        </thead>
        <tbody>
          {range(6).map(week => (<tr key={week} className="calendar--week">
            {range(7).map(day => {
              const date = firstDateOfCalendar.plus({days: week * 7 + day }).day
              const displayDate = (date !== 1)
                ? date
                : (week === 0)
                  ? `${month}/${date}`
                  : `${(month + 1 > 12) ? 1 : month + 1}/${date}`

              return (<td key={day} className="calendar--date">
                <div className="container">
                  <div className="top">
                    <span className="date">{displayDate}</span>
                    <i className={faces[calendar[date - 1].condition]}/>
                  </div>
                  <div className="bottom">
                    {calendar[date - 1].weathers.map(key => {
                      return (
                        <div key={key} className="calendar--weather">
                          <i className={weather[key]}/>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </td>)
            })}
          </tr>))}
        </tbody>
      </table>
      <div className="calendar--detail">
        ここに選択した日の詳細を表示する予定
      </div>
      <footer className="calendar--page-button">
        <button onClick={handlePrevMonthClick}><i className="fas fa-arrow-left"/></button>
        <button onClick={handleNextMonthClick}><i className="fas fa-arrow-right"/></button>
      </footer>
    </>
  )
}
