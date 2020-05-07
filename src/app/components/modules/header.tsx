import React from 'react'

export type HeaderProps = {
  title: string;
}

export const Header: React.FC<HeaderProps> = props => {
  return (
    <header className="global-header">
      <h1>{props.title}</h1>
    </header>
  )
}
