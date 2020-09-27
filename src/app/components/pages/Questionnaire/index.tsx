import React, { useState } from 'react'
import { Condition } from './Condition'
import { Mood } from './Mood'
import { Weather } from './Weather'
import { Counter } from './Counter'
import { Time } from './Time'
import { CounterEditor } from './CounterEditor'
import { BasicLayout } from 'app/components/layouts/BasicLayout'

// todo: remove mock data
const titles = ['食事', 'お薬', 'ストレッチ']

export const Questionnaire: React.FC = () => {
  const [isEditOpen, setIsEditOpen] = useState(false)

  function handleOpenEdit() {
    setIsEditOpen(true)
  }

  return (
    <BasicLayout title="今日の体調">
      <Condition/>
      <Weather/>
      {titles.map((title, i) => (
        <Counter title={title} onOpenEdit={handleOpenEdit} showConfigButton={i === titles.length - 1}/>
      ))}
      <Time title="起床" defaultHour="8"/>
      <Time title="就寝" defaultHour="23"/>
      <CounterEditor visible={isEditOpen} onSave={() => {}} onClose={() => setIsEditOpen(false)}/>
    </BasicLayout>
  )
}
