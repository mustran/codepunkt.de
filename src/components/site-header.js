import { css, keyframes } from '@emotion/core'
import styled from '@emotion/styled'
import { Link } from 'gatsby'
import React from 'react'
import SiteLogo from './site-logo.svg'

const storageKey = 'site-header-animation-run'
const animationCharacterOffsetMsec = 60
const animationDelayMsec = 500
const animationDurationMsec = 1000

const charAnimation = (index, pathLength) => ({
  runAnimation,
  theme: {
    colors: { logo },
  },
}) => {
  if (!runAnimation) {
    return css`
      path {
        animation: none;
        stroke: none;
        fill: ${logo};
      }
    `
  }

  sessionStorage.setItem(storageKey, 'true')

  const animationDelay =
    animationDelayMsec + animationCharacterOffsetMsec * index
  const animation = keyframes`
    0% { stroke-dashoffset: ${pathLength}; }
    50% { stroke-dashoffset: 0; fill: transparent; }
    100% { stroke-dashoffset: 0; stroke-width: 0; fill: ${logo}; }
  `

  return css`
    path:nth-of-type(${index}) {
      stroke-dasharray: ${pathLength};
      stroke-dashoffset: ${pathLength};
      animation: ${animation} ${animationDurationMsec}ms linear
        ${animationDelay}ms forwards;
      @media (prefers-reduced-motion: reduce) {
        animation: none;
        stroke: none;
        fill: ${logo};
      }
    }
  `
}

const Header = styled.header`
  max-width: 768px;
  margin: 50px auto;
  padding: 0 20px;
`

const LogoLink = styled(Link)`
  display: inline-block;
  box-shadow: none !important;
`

const Logo = styled(SiteLogo)`
  width: 140px;
  font-size: 18px;

  @media only screen and (min-width: 370px) {
    width: 160px;
  }
  @media only screen and (min-width: 668px) {
    width: 200px;
  }
  @media only screen and (min-width: 880px) {
    width: 230px;
  }

  path {
    fill: none;
    stroke: ${(props) => props.theme.colors.logo};
    stroke-width: 1;
  }

  ${charAnimation(1, 180)}
  ${charAnimation(2, 123)}
  ${charAnimation(3, 173)}
  ${charAnimation(4, 131)}
  ${charAnimation(5, 194)}
  ${charAnimation(6, 139)}
  ${charAnimation(7, 153)}
  ${charAnimation(8, 217)}
  ${charAnimation(9, 113)}
`

const SiteHeader = ({ siteTitle }) => {
  const runAnimation = sessionStorage.getItem(storageKey) === null

  return (
    <Header>
      <LogoLink to="/">
        <Logo role="img" runAnimation={runAnimation} />
      </LogoLink>
    </Header>
  )
}

export default SiteHeader
