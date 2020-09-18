import React from 'react'
import {
  Route,
  RouteProps,
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import firebase from 'app/config'
import { Landing } from 'app/components/pages/Landing'
import { Questionnaire } from 'app/components/pages/Questionnaire'
import { Calendar } from 'app/components/pages/Calendar'
import { Chart } from 'app/components/pages/Chart'
import { Config } from 'app/components/pages/Config'

function PrivateRoute(props: RouteProps) {
  const [user] = useAuthState(firebase.auth())

  return user ? <Route {...props} /> : <Route path="/" exact children={<Landing />} />
}

export function App() {
  return (
    <Router>
      <Switch>
        <PrivateRoute path="/" exact children={<Questionnaire />} />
        <PrivateRoute path="/calendar" children={<Calendar />} />
        <PrivateRoute path="/chart" children={<Chart />} />
        <PrivateRoute path="/config" children={<Config />} />
      </Switch>
    </Router>
  );
}
