import React, { ReactElement, useEffect } from 'react'
import { useLocation } from "react-router-dom";
import { Header, HeaderProps } from 'app/components/modules/Header'
import { Navigation } from 'app/components/modules/Navigation'

export type BasicLayoutProps = HeaderProps & {
  children: ReactElement
}

export const BasicLayout: React.FC<BasicLayoutProps> = props => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <>
      <Header title={props.title}/>
        <main className="main-content">
          {props.children}
        </main>
      <Navigation/>
    </>
  )
}
