import React, { useState } from 'react'
import {
  CartesianGrid,
  Legend,
  LegendPayload,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { DateTime } from 'luxon'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useList } from 'react-firebase-hooks/database'
import firebase, { db } from 'app/config'
import { BasicLayout } from 'app/components/layouts/BasicLayout'

const moods = ['', '絶不調', '不調', '普通', '元気', '超元気']

export const Chart: React.FC = () => {
  const now = DateTime.local()
  const [year, setYear] = useState(now.year)
  const [month, setMonth] = useState(now.month)
  const firstDate = DateTime.local(year, month, 1)
  const firstDateOfPage = firstDate.minus({ days: firstDate.weekday - 1} )
  const startDate = firstDateOfPage.toISODate()
  const endDate = firstDateOfPage.plus({ days: 41 }).toISODate()
  const [user] = useAuthState(firebase.auth())
  const data = useList(db.ref(`conditions/${user?.uid}/moods`)
    .orderByKey()
    .startAt(startDate)
    .endAt(endDate))[0]
    ?.map(item => ({
      date: month + '/' + DateTime.fromISO(item.key as string).day,
      mood: item.val() as number,
    }))

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

  function formatLegendText(value: string, entry: LegendPayload) {
    const { color } = entry
    const dict: { [key: string]: string } = {
      mood: '気分',
    }

    return <span style={{ color }}>{dict[value]}</span>
  }

  function formatYAxis(value: number) {
    return moods[value]
  }

  function formatTooltips(value: number) {
    return [moods[value], '気分']
  }

  return (
    <BasicLayout title="グラフ">
      <header>
        <h2 style={{ textAlign: 'right', marginBottom: '4px' }}>
          {`${year}年${month}月`}
        </h2>
      </header>
      <LineChart
        width={window.innerWidth}
        height={300}
        data={data}
        margin={{
          top: 5, right: 5, left: 5, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis
          type="number"
          domain={[0, 5]}
          ticks={[0, 1, 2, 3, 4, 5]}
          tickFormatter={formatYAxis}
        />
        <Tooltip formatter={formatTooltips}/>
        <Legend formatter={formatLegendText}/>
        <Line type="monotone" dataKey="mood" stroke="#daa566" activeDot={{ r: 8 }} />
      </LineChart>

      <footer className="calendar--page-button">
        <button onClick={handlePrevMonthClick}><i className="fas fa-arrow-left"/></button>
        <button onClick={handleNextMonthClick}><i className="fas fa-arrow-right"/></button>
      </footer>
    </BasicLayout>
  )
}
