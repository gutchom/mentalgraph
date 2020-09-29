import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import firebase from 'app/config'
import { BasicLayout } from 'app/components/layouts/BasicLayout'

export const Landing: React.FC = () => {
  const [, loading] = useAuthState(firebase.auth())

  function handleLogin() {
    console.log('tapped')
    const provider = new firebase.auth.TwitterAuthProvider()
    firebase.auth().signInWithRedirect(provider)
  }


  if (loading) {
    return (
      <BasicLayout title="メンタルグラフ">
        <div className="fullscreen-loading">
          <h2>現在ログイン中です</h2>
          <img src="/img/ajax-loader.gif" alt="loading indicator"/>
        </div>
      </BasicLayout>
    )
  }

  return (
    <BasicLayout title="メンタルグラフ">
      <article className="landing-page">
        <section className="top">
          <h2>これは何？</h2>
          <span>
            日々の体調を記録し振り返るためのWebアプリです。
            体調・天気・就寝起床時刻・日課のカウンターを入力し、
            カレンダーやグラフで体調の推移を振り返ることができます。
          </span>
        </section>

        <div className="top-screenshot">
          <img src="/img/IMG_4043.PNG" alt="今日の体調画面" width={140.5} height={238.5}/>
          <img src="/img/IMG_4046.PNG" alt="カレンダー画面" width={140.5} height={238.5}/>
        </div>

        <div className="login">
          <button onClick={handleLogin}>
            <i className="fa fa-twitter"/>
            <span>ツイッターでログイン</span>
          </button>
        </div>
      </article>
    </BasicLayout>
  )
}
