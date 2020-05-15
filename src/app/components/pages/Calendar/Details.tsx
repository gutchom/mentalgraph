import React from 'react'

export type DetailsProps = {
  date: string
  condition: string
}
/*
const weather = {
  sunny: 'fas fa-sun',
  cloudy: 'fas fa-cloud',
  rainy: 'fas fa-umbrella',
  storm: 'fas fa-bolt',
  snowy: 'fas fa-snowflake',
}
*/
export const Details: React.FC = props => {
  return (
    <div className="calendar--detail">
      <header>
        <h3>5/23</h3>
        <button><i className="far fa-edit"/></button>
      </header>

      <div className="topic icon">
        <i className="fas fa-smile"/>
        <i className="fas fa-cloud"/>
        <i className="fas fa-umbrella"/>
        <i className="fas fa-snowflake"/>
      </div>

      <div className="topic count">
        <span>食事: 3回</span>
        <span>お薬: 2回</span>
        <span>筋トレ: 2回</span>
        <span>ストレッチ: 4回</span>
        <span>外食: 3回</span>
      </div>

      <div className="topic time">
        <span>起床: 7時30分</span>
        <span>就寝: 23時50分</span>
      </div>
    </div>
  )
}
