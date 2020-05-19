import firebase from 'app/config'
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export type HeaderProps = {
  title: string;
}

export const Header: React.FC<HeaderProps> = props => {
  const [isOpen, setIsOpen] = useState(false)
  const { pathname } = useLocation()
  const { photoURL } = (window as any)

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  function handleLogout() {
    firebase.auth().signOut().then(_ => {
      const app = document.getElementById('app')  as HTMLDivElement
      const page = document.getElementById('page')　as HTMLDivElement
      app.style.display = 'none'
      page.style.display = 'block'
    }).catch(function(error) {
      throw error
    })
  }
  return (
    <header className="global-header">
      <h1>{props.title}</h1>
      <button className="user--icon" type="button" onClick={_ => setIsOpen(!isOpen)}>
        {photoURL
          ? (<img className="user--icon" src={photoURL} alt="icon" loading="lazy"/>)
          : (<i className="fas fa-user"/>)
        }
      </button>

      <ul className="user--icon--menu">
        <li className={isOpen ? '--open' : ''}>
          <button className="logout" onClick={handleLogout}><i className="fas fa-sign-out-alt"/></button>
        </li>
        <li className={isOpen ? '--open' : ''}>
          <Link to="/about"><i className="fas fa-question"/></Link>
        </li>
      </ul>
    </header>
  )
}
