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
  border-top: 5px solid #4b4237;
`

const Container = styled.div`
  max-width: ${(props) => (props.small ? 768 : 1200)}px;
  margin: 50px auto 70px auto;
  width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media only screen and (max-width: 450px) {
    margin: calc(1.72rem * 1.5) auto;
  }
`

const LogoLink = styled(Link)`
  display: inline-block;
  box-shadow: none !important;
  height: 57px;

  @media only screen and (max-width: 667px) {
    height: 45px;
  }
`

const Menu = styled.nav`
  font-family: Lato, sans-serif;
  font-size: 17px;

  @media only screen and (max-width: 667px) {
    display: none;
  }
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

    &::before {
      content: '';
      position: absolute;
      height: 4px;
      background: #ede7d9;
      bottom: 0;
      left: 16px;
      right: 16px;
      transform: scale3d(0, 3, 1);
      transform-origin: 0% 50%;
      transition: transform 0.3s;
      transition-timing-function: cubic-bezier(1, 0.68, 0.16, 0.9);
    }

    @media (prefers-reduced-motion: reduce) {
      &::before {
        transition: unset;
      }
    }

    &:hover::before,
    &.active::before {
      transform: scale3d(1, 1, 1);
    }

    &.active::before {
      background: #eaa944;
    }
  }
`

const MenuNumber = styled.span`
  font-weight: 700;
  margin-right: 8px;
`

const Logo = styled(SiteLogo)`
  width: 200px;
  height: 57px;
  font-size: 18px;

  @media only screen and (max-width: 450px) {
    width: 160px;
    height: 45px;
  }

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

const SiteHeader = ({ small }) => {
  return (
    <Header>
      <Container small={small}>
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
      </Container>
    </Header>
  )
}

export default SiteHeader
