import { css, keyframes } from '@emotion/core'
import styled from '@emotion/styled'
import { Link } from 'gatsby'
import React from 'react'
import LogoSvg from './site-logo.svg'

const animationCharacterOffsetMsec = 60
const animationDelayMsec = 100
const animationDurationMsec = 1000

const charAnimation = (index, pathLength) => ({ theme: { colors } }) => {
  const animationDelay =
    animationDelayMsec + animationCharacterOffsetMsec * index
  const animation = keyframes`
    0% { stroke-dashoffset: ${pathLength}; }
    50% { stroke-dashoffset: 0; fill: transparent; }
    100% { stroke-dashoffset: 0; stroke-width: 0; fill: ${colors.logo}; }
  `

  // because we can't remove the "anim" class from the html element when
  // javascript is disabled, we don't animate without javascript.
  return css`
    html.anim.visible:not(.no-js) & path:nth-of-type(${index}) {
      stroke-dasharray: ${pathLength};
      stroke-dashoffset: ${pathLength};
      animation: ${animation} ${animationDurationMsec}ms linear
        ${animationDelay}ms forwards;
      @media (prefers-reduced-motion: reduce) {
        animation: none;
        stroke: none;
        fill: ${colors.logo};
      }
    }
  `
}

const LogoLink = styled(Link)`
  display: inline-block;
  box-shadow: none !important;
  height: 45px;
`

const Logo = styled(LogoSvg)`
  font-size: 18px;
  margin-top: 2px;
  width: 160px;
  height: 45px;

  path {
    fill: ${(props) => props.theme.colors.logo};
    stroke: none;
  }

  html.anim.visible:not(.no-js) & path {
    fill: none;
    stroke: ${(props) => props.theme.colors.logo};
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

const SiteLogo = () => {
  return (
    <LogoLink to="/">
      <Logo
        role="img"
        onAnimationEnd={(e) => {
          // animation is done when animation of last character is done
          if (e.nativeEvent.target.classList.contains('t')) {
            document.documentElement.classList.remove('anim')
            sessionStorage.setItem('didAnimationRun', true)
          }
        }}
      />
    </LogoLink>
  )
}

export default SiteLogo
