import React from 'react'
import { DateTime } from 'luxon'
import { Modal, ModalProps } from 'app/components/modules/Modal'
import { Questionnaire } from 'app/components/pages/Questionnaire'

export type EditProps = ModalProps & {
  date: string
  onSave(): void
}

export const Edit: React.FC<EditProps> = props => {
  const { month, day } = DateTime.fromISO(props.date)

  return (
    <Modal
      className="edit--condition"
      visible={props.visible}
      onClose={props.onClose}
      header={<h1>{`${month}/${day}の再編集`}</h1>}
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
      <Questionnaire date={props.date}/>
    </Modal>
  )
}
