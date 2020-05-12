import { Header, HeaderProps } from 'app/components/modules/Header'
import { Navigation } from 'app/components/modules/Navigation'
import React, { ReactElement } from 'react'

export type BasicLayoutProps = HeaderProps & {
  children: ReactElement
}

export const BasicLayout: React.FC<BasicLayoutProps> = props => {
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
