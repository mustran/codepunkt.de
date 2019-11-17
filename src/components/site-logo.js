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
    fill: #000;
    stroke: none;
  }

  .dark-mode & path {
    fill: #fff;
  }
`

const SiteLogo = () => {
  return (
    <Link to="/" tabindex="-1" className={link}>
      <LogoSvg className={logo} role="presentation" focusable="false" />
    </Link>
  )
}

export default SiteLogo
