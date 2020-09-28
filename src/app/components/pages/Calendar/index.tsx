import React, { useState } from 'react'
import { DateTime } from 'luxon'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useList } from 'react-firebase-hooks/database';
import firebase, { db } from 'app/config'
import { BasicLayout } from 'app/components/layouts/BasicLayout'
import { Detail } from './Details'
import { Edit } from './Edit'

function range(length: number): number[] {
  return [...Array(length)].map((_, n) => n)
}

const weekdays = ['日', '月', '火', '水', '木', '金', '土']

export const emoticons = [
  'far fa-edit',
  'fas fa-dizzy',
  'fas fa-frown',
  'fas fa-meh',
  'fas fa-smile',
  'fas fa-grin-stars',
]

export const Calendar: React.FC = () => {
  const now = DateTime.local()
  const [year, setYear] = useState(now.year)
  const [month, setMonth] = useState(now.month)
  const [selected, setSelected] = useState(now.toISODate())
  const [isEditOpen, setIsEditOpen] = useState(false)
  const firstDate = DateTime.local(year, month, 1)
  const firstDateOfPage = firstDate.minus({ days: firstDate.weekday - 1} )
  const startDate = firstDateOfPage.toISODate()
  const endDate = firstDateOfPage.plus({ days: 41 }).toISODate()
  const [user] = useAuthState(firebase.auth())
  const moods = useList(db.ref(`conditions/${user?.uid}/moods`)
    .orderByKey()
    .startAt(startDate)
    .endAt(endDate))[0]
    ?.map(item => ({ date: item.key, mood: item.val() as number }))
  const weathers = useList(db.ref(`conditions/${user?.uid}/weather`)
    .orderByKey()
    .startAt(startDate)
    .endAt(endDate))[0]
    ?.map(item => ({ date: item.key, condition: item.val() }))
  const sleeping = useList(db.ref(`conditions/${user?.uid}/sleeping`)
    .orderByKey()
    .startAt(startDate)
    .endAt(endDate))[0]
    ?.map(item => ({ date: item.key, time: item.val() }))
  const counters = useList(db.ref(`conditions/${user?.uid}/counter/counts`)
    .orderByKey()
    .startAt(startDate)
    .endAt(endDate))[0]
    ?.map(item => {
      const count = item.val()
      const counts = Object.keys(count)
        .map(id => ({ id, ...count[id] }))
        .sort((a, b) => a.timestamp - b.timestamp)
      return {
        date: item.key,
        counts,
      }})

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

  function handleOpenEdit(date: string) {
    setSelected(date)
    setIsEditOpen(true)
  }

  return (
    <BasicLayout title="カレンダー">
      <header>
        <h2 style={{ textAlign: 'right', marginBottom: '4px' }}>
          {`${year}年${month}月`}
        </h2>
      </header>
      <table className="calendar">
        <thead>
          <tr>
            {weekdays.map(day => (<th key={day} className="calendar--day">{day}</th>))}
          </tr>
        </thead>
        <tbody>
          {range(6).map(week => (<tr key={week} className="calendar--week">
            {range(7).map(index => {
              const thisDate = firstDateOfPage.plus({ days: week * 7 + index })
              const isoDate = thisDate.toISODate()
              const thisDay = thisDate.day
              const mood = moods?.find(({ date }) => date === isoDate)?.mood ?? 0
              const thisMonth = (week === 0)
                ? (thisDay > 7)
                  ? (month - 1 < 1) ? 12 : month - 1
                  : month
                : (week > 3 && thisDay < 15)
                  ? (month + 1 > 12) ? 1 : month + 1
                  : month
              const displayDate = (thisDay === 1) ? `${thisMonth}/${thisDay}` : thisDay

              return (<td key={isoDate} className="calendar--date">
                <label>
                  <input className="radio"
                         type="radio"
                         name="select-date"
                         checked={selected === isoDate}
                         onChange={() => setSelected(isoDate)}
                  />
                  <div className="container">
                    <span className="date">{displayDate}</span>
                    {mood > 0
                      ? (<i className={emoticons[mood]}/>)
                      : thisDate <= now && (
                        <button onClick={() => handleOpenEdit(isoDate)}>
                          <i className={emoticons[mood]}/>
                        </button>
                    )}
                  </div>
                </label>
              </td>)
            })}
          </tr>))}
        </tbody>
      </table>

      <Detail
        date={selected}
        mood={moods?.find(({ date }) => date === selected)?.mood ?? 0}
        weather={weathers?.find(({ date }) => date === selected)?.condition}
        sleeping={sleeping?.find(({ date }) => date === selected)?.time}
        counts={counters?.find(({ date }) => date === selected)?.counts ?? []}
        handleOpenEdit={() => handleOpenEdit(selected)}
      />

      <footer className="calendar--page-button">
        <button onClick={handlePrevMonthClick}><i className="fas fa-arrow-left"/></button>
        <button onClick={handleNextMonthClick}><i className="fas fa-arrow-right"/></button>
      </footer>

      <Edit
        date={selected}
        visible={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onSave={() => setIsEditOpen(false)}
      />
    </BasicLayout>
  )
}
