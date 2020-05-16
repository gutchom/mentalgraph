import { uuid } from 'uuidv4'
import React, { MouseEvent, useReducer } from 'react'
import { Modal, ModalProps } from 'app/components/modules/Modal'

export type EditProps = ModalProps & {
  onSave(e: MouseEvent<HTMLButtonElement>): void
}

export type CounterProperty = {
  id: string
  order: number
  title: string
}

export type CounterEditorActions = {
  id: string
  type: 'order' | 'title' | 'add' | 'remove'
  command: 'up' | 'down' | string
}

const initState: CounterProperty[] = [
  {
    id: uuid(),
    order: 0,
    title: '食事',
  },
  {
    id: uuid(),
    order: 1,
    title: 'お薬',
  },
  {
    id: uuid(),
    order: 2,
    title: '筋トレ',
  },
  {
    id: uuid(),
    order: 3,
    title: 'ストレッチ',
  },
]

// 昇順ソート
function sorter(a: CounterProperty, b: CounterProperty): number {
  return a.order < b.order ? -1 : a.order < b.order ? 1 : 0
}

function reducer(state: CounterProperty[], action: CounterEditorActions): CounterProperty[] {
  const [target] = state.filter(({ id }) => id === action.id)
  const others = state.filter(({ id }) => id !== action.id)

  switch (action.type) {
    case 'title':
      return others.concat({ ...target, title: action.command })
    case 'add':
      return [...state, { id: uuid(), order: state.length, title: uuid() }]
    case 'remove': {
      const before = state.filter(({ order }) => order < target.order)
      const after = state
        .filter(({ order }) => order > target.order)
        .map(after => {
          after.order--
          return after
        })
      return [...before, ...after]
    }
    case 'order':
      switch (action.command) {
        case 'up': {
          if (target.order === 0) return state
          const after = state.filter(({ order }) => order > target.order)
          const before = state
            .filter(({ order }) => order < target.order)
            .map(before => {
              before.order = before.order === target.order - 1 ? before.order + 1 : before.order
              return before
            })

          return [...before, ...after, { ...target, order: (target.order > 0) ? target.order - 1 : 0 }].sort(sorter)
        }
        case 'down': {
          if (target.order === state.length - 1) return state
          const before = state.filter(({ order }) => order < target.order)
          const after = state
            .filter(({ order }) => order > target.order)
            .map(after => {
              after.order = after.order === target.order + 1 ? after.order - 1 : after.order
              return after
            })
          return [...before, ...after, { ...target, order: (target.order < state.length - 1) ? target.order + 1 : state.length - 1 }].sort(sorter)
        }
      }
  }
  return state
}

export const CounterEditor: React.FC<EditProps> = props => {
  const [counters, dispatch] = useReducer(reducer, initState)

  return (
    <Modal
      className="edit--count"
      visible={props.visible}
      onClose={props.onClose}
      header={<h1>日課編集</h1>}
      footer={(
        <>
          <button className="cancel" onClick={props.onClose}>
            キャンセル
          </button>
          <button className="save" onClick={props.onSave}>
            保存
          </button>
        </>
      )}
    >
      <ul className="counter-list">
        {counters.map(({ id, title}) => (
          <li key={id}>
            <span>{title}</span>
            <button className="counter--edit" onClick={() => dispatch({id, type: 'title', command: 'up'})}>
              <i className="far fa-edit"/>
            </button>
            <button className="order--up" onClick={() => dispatch({id, type: 'order', command: 'up'})}>
              <i className="fas fa-arrow-up"/>
            </button>
            <button className="order--down" onClick={() => dispatch({id, type: 'order', command: 'down'})}>
              <i className="fas fa-arrow-down"/>
            </button>
            <button className="counter--remove" onClick={() => dispatch({id, type: 'remove', command: ''})}>
              <i className="far fa-trash-alt"/>
            </button>
          </li>
        ))}
      </ul>
      <div style={{textAlign: 'center', padding: '8px',}}>
        <button className="counter--add" onClick={() => dispatch({id: '', type: 'add', command: ''})}>
          <i className="fas fa-plus"/>
        </button>
      </div>
    </Modal>
  )
}
