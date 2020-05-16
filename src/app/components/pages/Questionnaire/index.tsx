import React, { useState } from 'react'
import { Condition } from './Condition'
import { Weather } from './Weather'
import { Counter } from './Counter'
import { Time } from './Time'
import { CounterEditor } from './CounterEditor'

// todo: remove mock data
const titles = ['食事', 'お薬', 'ストレッチ']

export const Questionnaire: React.FC = () => {
  const [isEditOpen, setIsEditOpen] = useState(false)

  function handleOpenEdit() {
    setIsEditOpen(true)
  }

  return (
    <>
      <Condition/>
      <Weather/>
      {titles.map((title, i) => (
        <Counter title={title} onOpenEdit={handleOpenEdit} showConfigButton={i === titles.length - 1}/>
      ))}
      <Time title="起床" defaultHour="8"/>
      <Time title="就寝" defaultHour="23"/>
      <CounterEditor visible={isEditOpen} onSave={() => {}} onClose={() => setIsEditOpen(false)}/>
    </>
  )
}
