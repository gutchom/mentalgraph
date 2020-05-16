import React, { MouseEvent } from 'react'
import { Modal, ModalProps } from 'app/components/modules/Modal'
import { Questionnaire } from 'app/components/pages/Questionnaire'

export type EditProps = ModalProps & {
  onSave(e: MouseEvent<HTMLButtonElement>): void
}

export const Edit: React.FC<EditProps> = props => {
  return (
    <Modal
      className="edit--condition"
      visible={props.visible}
      onClose={props.onClose}
      header={<h1>5/23の再編集</h1>}
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
      <Questionnaire/>
    </Modal>
  )
}
