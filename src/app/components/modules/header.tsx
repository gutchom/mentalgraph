import React from 'react'

export type HeaderProps = {
  title: string;
}

export const Header: React.FC<HeaderProps> = props => {
  return (
    <header>
      <h1>{props.title}</h1>
    </header>
  )
}
