import { Link } from 'gatsby'
import React from 'react'

const Header = ({ siteTitle }) => {
  return (
    <header>
      <Link to="/">{siteTitle}</Link>
    </header>
  )
}

export default Header
