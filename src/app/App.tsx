import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
import { BasicLayout } from 'app/components/layouts/BasicLayout'
import { Questionnaire } from 'app/components/pages/Questionnaire'
import { Calendar } from 'app/components/pages/Calendar'
import { Chart } from 'app/components/pages/Chart'
import { Config } from 'app/components/pages/Config'

export function App() {
  return (
    <Router>
      <Switch>

        <Route exact path="/">
          <BasicLayout title="今日の体調">
            <Questionnaire />
          </BasicLayout>
        </Route>

        <Route path="/calendar">
          <BasicLayout title="カレンダー">
            <Calendar/>
          </BasicLayout>
        </Route>

        <Route path="/chart">
          <BasicLayout title="グラフ">
            <Chart/>
          </BasicLayout>
        </Route>

        <Route path="/config">
          <BasicLayout title="設定">
            <Config/>
          </BasicLayout>
        </Route>

      </Switch>
    </Router>
  );
}
