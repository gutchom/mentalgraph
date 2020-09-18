import React, { useEffect } from 'react'
import { useLocation } from "react-router-dom";
import { useAuthState } from 'react-firebase-hooks/auth'
import firebase from 'app/config'
import { Header, HeaderProps } from 'app/components/modules/Header'
import { Navigation } from 'app/components/modules/Navigation'

export const BasicLayout: React.FC<HeaderProps> = ({ title, children }) => {
  const { pathname } = useLocation()
  const [user] = useAuthState(firebase.auth())

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <>
      <Header title={title}/>
      <main className="main-content">
        {children}
      </main>
      {user && <Navigation/>}
    </>
  )
}
