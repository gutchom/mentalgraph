import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export const Navigation: React.FC = _ => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  return (
    <div className="navigation-container">
      <button className="navigation-toggle" onClick={_ => setIsOpen(!isOpen)}>
        <i className="fas fa-layer-group"/>
      </button>

      <nav>
        <ul>
          {location.pathname === '/' || (
            <li className={isOpen ? '--open' : ''}>
              <Link to="/"><i className="fas fa-home"/></Link>
            </li>
          )}
          {!!location.pathname.match(/^\/calendar/) || (
            <li className={isOpen ? '--open' : ''}>
              <Link to="/calendar"><i className="far fa-calendar-alt"/></Link>
            </li>
          )}
          {!!location.pathname.match(/^\/chart/) || (
            <li className={isOpen ? '--open' : ''}>
              <Link to="/chart"><i className="fas fa-chart-bar"/></Link>
            </li>
          )}
          {!!location.pathname.match(/^\/config/) || (
            <li className={isOpen ? '--open' : ''}>
              <Link to="/config"><i className="fas fa-cog"/></Link>
            </li>
          )}
        </ul>
      </nav>
    </div>
  )
}
