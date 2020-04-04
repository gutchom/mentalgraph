import React from 'react'
import { Condition } from './Condition'
import { Weather } from './Weather'
import { Meals } from './Meals'
import { Time } from './Time'

export const Questionnaire = () => {
  return (
    <div>
      <h1>今日の体調</h1>
      <h2>2020/2/14</h2>
      <Condition/>
      <Weather/>
      <Meals/>
      <Time title="起床時刻" defaultHour="8"/>
      <Time title="就寝時刻" defaultHour="23"/>
    </div>
  )
}
