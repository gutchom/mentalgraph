import React, { useEffect, useState } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import firebase from 'app/config'

export type HeaderProps = {
  title: string;
}

export const Header: React.FC<HeaderProps> = props => {
  const history = useHistory()
  const { pathname } = useLocation()
  const [user] = useAuthState(firebase.auth())
  const [isOpen, setIsOpen] = useState(false)
  const [iconUrl, setIconUrl] = useState("")

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  useEffect(() => {
    firebase.auth().getRedirectResult()
      .then(result => {
        console.log((result.additionalUserInfo?.profile as any).id_str)
        console.log((result.additionalUserInfo?.profile as any).screen_name)
        console.log((result.credential  as any).oauthAccessToken)
        console.log((result.credential as any).oauthTokenSecret)

        const iconUrl = (result.additionalUserInfo?.profile as any).profile_image_url_https
        console.log(iconUrl)
        setIconUrl(iconUrl.replace('normal', '400x400'))
      })
  }, [])

  function handleLogin() {
    const provider = new firebase.auth.TwitterAuthProvider()
    firebase.auth().signInWithRedirect(provider)
  }

  function handleLogout() {
    firebase.auth().signOut().then(() => {
      history.push("/")
    }).catch(error => {
      throw error
    })
  }

  return (
    <header className="global-header">
      <h1>{props.title}</h1>
      {!user ? (
        <button onClick={handleLogin}>ログイン</button>
      ) : (
        <>
          <button className="user--icon" type="button" onClick={() => setIsOpen(!isOpen)}>
            {iconUrl.length === 0
              ? (<i className="fas fa-user"/>)
              : (<img className="user--icon" src={iconUrl} alt="icon" loading="lazy"/>)
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
        </>
      )}
    </header>
  )
}
