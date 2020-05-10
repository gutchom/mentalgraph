import React from 'react'

export type HeaderProps = {
  title: string;
}

export const Header: React.FC<HeaderProps> = props => {
  return (
    <header className="global-header">
      <h1>{props.title}</h1>
      <button className="user--icon">
        <img className="user--icon" src={(window as any).photoURL} alt="Twitter icon" loading="lazy"/>
      </button>
    </header>
  )
}
