import { Link } from 'gatsby'
import { css } from 'linaria'
import React from 'react'
import LogoSvg from './site-logo.svg'

const link = css`
  display: inline-block;
  box-shadow: none !important;
  height: 45px;
`

const logo = css`
  font-size: 18px;
  margin-top: 4px;
  width: 140px;
  height: 45px;

  path {
    fill: #4b4237;
    stroke: none;
  }

  .dark-mode & path {
    fill: #fff;
  }
`

const SiteLogo = () => {
  return (
    <Link to="/" className={link}>
      <LogoSvg role="img" className={logo} />
    </Link>
  )
}

export default SiteLogo
