import { css, keyframes } from '@emotion/core'
import styled from '@emotion/styled'
import { Link } from 'gatsby'
import React, { useEffect, useState } from 'react'
import SiteLogo from './site-logo.svg'

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

const Header = styled.header`
  max-width: 768px;
  margin: 50px auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const LogoLink = styled(Link)`
  display: inline-block;
  box-shadow: none !important;
  height: 45px;
`

const Menu = styled.nav`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif,
    'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  font-size: 16px;
`

const MenuItem = styled.li`
  counter-increment: menu;
  margin: 0;
  text-transform: lowercase;
`

const MenuItemList = styled.ol`
  counter-reset: menu;
  list-style-type: none;
  display: flex;
  margin: 0;
  height: 100%;
  align-items: center;
`

const MenuLink = styled(Link)`
  &,
  &:link,
  &:visited,
  &:focus,
  &:hover,
  &:active {
    box-shadow: none;
    color: #333;
    position: relative;
    padding: 12px 20px;

    &.active::before {
      content: '';
        position: absolute;
        height: 5px;
        background: #bada55;
        bottom: -5px;
        left: 20px;
        right: 20px;
      }
    }
  }
`

const MenuNumber = styled.span`
  font-weight: 700;
  margin-right: 8px;
`

const Logo = styled(SiteLogo)`
  width: 160px;
  height: 45px;
  font-size: 18px;

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

const useVisibility = (initialVisibility = 'visible') => {
  const [visibility, setVisibility] = useState(initialVisibility)

  useEffect(() => {
    if (
      typeof document.visibilityState === 'undefined' ||
      typeof document.addEventListener === 'undefined'
    ) {
      return
    }

    const handleChange = () => setVisibility(document.visibilityState)
    document.addEventListener('visibilitychange', handleChange, false)
    return () => {
      document.removeEventListener('visibilitychange', handleChange, false)
    }
  }, [])

  return { visibility }
}

const SiteHeader = ({ siteTitle }) => {
  return (
    <Header>
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
      <Menu>
        <MenuItemList>
          <MenuItem>
            <MenuLink to="/" activeClassName="active">
              <MenuNumber aria-hidden={true}>01</MenuNumber>Home
            </MenuLink>
          </MenuItem>
          <MenuItem>
            <MenuLink
              to="/blog"
              activeClassName="active"
              partiallyActive={true}
            >
              <MenuNumber aria-hidden={true}>02</MenuNumber>Articles
            </MenuLink>
          </MenuItem>
          <MenuItem>
            <MenuLink to="/about" activeClassName="active">
              <MenuNumber aria-hidden={true}>03</MenuNumber>About
            </MenuLink>
          </MenuItem>
        </MenuItemList>
      </Menu>
    </Header>
  )
}

export default SiteHeader
