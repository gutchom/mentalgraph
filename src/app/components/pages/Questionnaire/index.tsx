import React from 'react'
import { Condition } from './Condition'
import { Weather } from './Weather'
import { Meals } from './Meals'
import { Time } from './Time'

export const Questionnaire: React.FC = () => {
  return (
    <>
      <Condition/>
      <Weather/>
      <Meals/>
      <Time title="起床" defaultHour="8"/>
      <Time title="就寝" defaultHour="23"/>
    </>
  )
}
