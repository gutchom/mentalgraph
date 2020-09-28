import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import firebase from 'app/config'
import { BasicLayout } from 'app/components/layouts/BasicLayout'

export const Landing: React.FC = () => {
  const [, loading] = useAuthState(firebase.auth())

  return (
    <BasicLayout title="メンタルグラフ">
    {loading ? (
      <h2>現在ログイン中です</h2>
      ) : (
      <span>ログイン前のトップページ。サービスの紹介とかをするランディングページっぽいのを作る。</span>
    )}
    </BasicLayout>
  )
}
