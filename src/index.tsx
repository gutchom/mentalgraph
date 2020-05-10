import React from 'react'
import ReactDOM from 'react-dom'
import { App } from 'app/App.tsx'

(window as any).loginCompleted = () => {
  ReactDOM.render(
    <App/>,
    document.getElementById('app')
  )
}
