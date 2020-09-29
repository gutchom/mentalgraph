import React, { useEffect, useState } from 'react'
import { useObjectVal } from 'react-firebase-hooks/database'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import firebase, { db } from 'app/config'

export type HeaderProps = {
  title: string;
}

export const Header: React.FC<HeaderProps> = props => {
  const history = useHistory()
  const { pathname } = useLocation()
  const [user] = useAuthState(firebase.auth())
  const [isOpen, setIsOpen] = useState(false)
  const [iconUrl, loading] = useObjectVal(db.ref(`users/${user?.uid}/iconUrl`))

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  useEffect(() => {
    firebase.auth().getRedirectResult()
      .then(result => {
        if (result.user && result.credential && result.additionalUserInfo) {
          db.ref(`users/${result.user.uid}`).set({
            twitterId: (result.additionalUserInfo.profile as any).id_str,
            screenName: (result.additionalUserInfo?.profile as any).screen_name,
            username: (result.additionalUserInfo?.profile as any).name,
            iconUrl: (result.additionalUserInfo?.profile as any).profile_image_url_https.replace('normal', '400x400'),
          })
        }})
  }, [])

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
      {user && (
        <>
          <button className="user--icon" type="button" onClick={() => setIsOpen(!isOpen)}>
            {loading
              ? (<i className="fas fa-user"/>)
              : (<img src={(iconUrl as string)} alt="icon" loading="lazy"/>)
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
