import React, { ChangeEvent, useState } from 'react'
import { DateTime } from 'luxon'
import { Detail } from './Details'
import { Edit } from './Edit'
import { Weathers } from 'app/components/pages/Questionnaire/Weather'

export type Date = {
  year: number
  month: number
  date: number
  condition: 0|1|2|3|4|5
  weathers: Weathers[]
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
  const condition = Math.floor(Math.random() * 6) as 0|1|2|3|4|5
  const weathers = ['rainy', 'sunny', 'cloudy', 'storm', 'snowy']
    .sort(() => Math.random() - 0.5)
    .slice(Math.abs(Math.random() * 5)) as Weathers[]

  return { year, month, date, condition, weathers }
})

// todo: replace mock data
const json: Calendar = { calendar }

const weekdays = ['日', '月', '火', '水', '木', '金', '土']

const faces = [
  'far fa-edit',
  'fas fa-dizzy',
  'fas fa-frown',
  'fas fa-meh',
  'fas fa-smile',
  'fas fa-grin-stars',
]

export const Calendar: React.FC = _ => {
  const { calendar } = json
  const now = DateTime.local()
  const [year, setYear] = useState(now.year)
  const [month, setMonth] = useState(now.month)
  const [selected, setSelected] = useState('')
  const [isEditOpen, setIsEditOpen] = useState(false)
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

  function handleChangeSelected(e: ChangeEvent<HTMLInputElement>) {
    setSelected(e.target.value)
  }

  function handleOpenEdit() {
    setIsEditOpen(true)
  }

  return (
    <BasicLayout title="カレンダー">
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
              const face = faces[calendar[date - 1].condition]
              const thisMonth = (week === 0)
                ? (date > 7)
                  ? (month - 1 < 1) ? 12 : month - 1
                  : month
                : (week > 3 && day < 15)
                  ? (month + 1 > 12) ? 1 : month + 1
                  : month
              const displayDate = (date === 1) ? `${thisMonth}/${date}` : date

              return (<td key={day} className="calendar--date">
                <label>
                  <input className="radio"
                         type="radio"
                         name="select-date"
                         value={`${thisMonth}/${date}`}
                         checked={selected === `${thisMonth}/${date}`}
                         onChange={handleChangeSelected}
                  />
                  <div className="container">
                    <span className="date">{displayDate}</span>
                    {calendar[date - 1].condition > 0
                      ? (<i className={face}/>)
                      : (<button onClick={handleOpenEdit}><i className={face}/></button>)
                    }
                  </div>
                </label>
              </td>)
            })}
          </tr>))}
        </tbody>
      </table>
      <Detail handleOpenEdit={handleOpenEdit}/>
      <footer className="calendar--page-button">
        <button onClick={handlePrevMonthClick}><i className="fas fa-arrow-left"/></button>
        <button onClick={handleNextMonthClick}><i className="fas fa-arrow-right"/></button>
      </footer>
      <Edit
        visible={isEditOpen}
        onClose={_ => setIsEditOpen(false)}
        onSave={_ => setIsEditOpen(false)}
      />
    </BasicLayout>
  )
}
