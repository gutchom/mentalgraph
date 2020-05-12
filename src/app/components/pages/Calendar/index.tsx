import React from 'react'
import moment from 'moment'
import { Weather } from 'app/components/pages/Questionnaire/Weather'

export type Date = {
  date: string
  condition: 1|2|3|4|5
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
  const date = `2020-05-${('0' + (n+1)).slice(-2)}`
  const condition = (Math.floor(Math.random() * (5 - 1)) + 1) as 1|2|3|4|5
  const weathers = (['snow', 'storm', 'rainy', 'cloudy', 'sunny'].sort(() => Math.random() - 0.5).slice(-3)) as Weather[]
  const result: Date = { date, condition, weathers }
  return result
})
const json: Calendar = { calendar }

const days = ['日', '月', '火', '水', '木', '金', '土']

export const Calendar: React.FC = _ => {
  console.log(calendar)
  const year = parseInt(json.calendar[0].date.split('-')[0], 10)
  const month = parseInt(json.calendar[0].date.split('-')[1], 10)
  const firstDayOfWeek = moment(json.calendar[0].date).day()
  const firstDate = moment(json.calendar[0].date).subtract(firstDayOfWeek, 'days').format('YYYY-MM-DD')


  return (
    <>
      <h2>
        {`${year}年${month}月`}
      </h2>
      <table className="calendar">
        <thead>
        <tr>
          {range(7).map(n => (<th key={n} className="calendar--day">{days[n]}</th>))}
        </tr>
        </thead>
        <tbody>
          {range(6).map(week => (<tr key={week} className="calendar--week">
            {range(7).map(day => {
              const date = moment(firstDate).add(week * 7 + day, 'days').date()

              let displayDate = `${date}`
              if (week === 0 && day === 0) {
                displayDate = `${month - 1}/${date}`
              }
              if (date === 1) {
                if (week == 0) {
                  displayDate = `${month}/${date}`
                } else {
                  displayDate = `${month + 1}/${date}`
                }
              }

              return (<td key={day} className="calendar--date">{displayDate}</td>)
            })}
          </tr>))}
        </tbody>
      </table>
    </>
  )
}
