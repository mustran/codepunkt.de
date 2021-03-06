import styled from '@emotion/styled'
import { Link } from 'gatsby'
import React, { useState } from 'react'
import Media from 'react-media'
import fadeUpIn from '../style/animations/fade-up-in'
import SiteLogo from './site-logo'
import MoonIcon from '../images/moon.svg'
import SunIcon from '../images/sun.svg'

const Header = styled.header`
  position: fixed;
  width: 100%;
  background: #fcfdff;
  border-bottom: 1px solid #e5e8eb;
  height: 70px;
  z-index: 3;
  top: 0;
  display: flex;
  align-items: center;
`

const Container = styled.div`
  max-width: ${(props) => (props.small ? 768 : 1200)}px;
  margin: 1em auto 1rem auto;
  width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Menu = styled.nav`
  font-size: 18px;
  display: flex;
  align-items: center;
`

const MenuItem = styled.li`
  counter-increment: menu;
  margin: 0;

  ${Menu}.open & {
    display: block;
    width: 100%;
  }
`

const MenuItemList = styled.ol`
  counter-reset: menu;
  list-style-type: none;
  display: flex;
  margin: 0;
  height: 100%;
  align-items: center;

  @media only screen and (max-width: 667px) {
    ${Menu}.open & {
      flex: 1 0 auto;
      justify-content: center;
      flex-direction: column;
    }
  }
`

const MenuItemLink = styled(Link)`
  box-shadow: none;
  color: #333;
  position: relative;
  padding: 6px 12px;
  box-shadow: 0 none;

  &.active {
    background: #fff;
    border: 1px solid #dfe3e8;
  }

  @media only screen and (max-width: 667px) {
    opacity: 0;
    display: flex;
    align-items: center;
    padding: 1rem 20%;
    font-size: 2rem;
    font-family: Merriweather, serif;

    &::before {
      display: none;
    }

    &.active::before {
      display: block;
      left: 0;
      right: auto;
      width: calc(20% - 12px);
      height: 12px;
      bottom: calc(50% - 6px);
    }
  }

  ${Menu}.open & {
    transition: none;
    animation: ${fadeUpIn} 0.2s ease-out 0.25s forwards;
  }

  ${Menu}.open li:nth-of-type(1) & {
    animation-delay: 0.25s;
  }
  ${Menu}.open li:nth-of-type(2) & {
    animation-delay: 0.27s;
  }
  ${Menu}.open li:nth-of-type(3) & {
    animation-delay: 0.29s;
  }
`

const MenuIcon = styled.button`
  border: 0 none;
  width: 32px;
  height: 32px;
  position: absolute;
  right: calc(5% - 5px);
  top: 20px;
  background: transparent;
  padding: 0;
  cursor: pointer;
  outline: none;
  z-index: 99;

  @media only screen and (min-width: 668px) {
    display: none;
  }

  &::before,
  &::after {
    position: absolute;
    content: '';
    background: #4b4237;
    width: 22px;
    height: 3px;
    left: 4px;
    border-radius: 5px;
    transition: all 150ms ease;
    ${Menu}.open & {
      top: 50%;
    }
  }

  ${Menu}.open & {
    position: fixed;
  }

  &::before {
    top: 7px;
    ${Menu}.open & {
      transform: translate3d(0, -50%, 0) rotate(45deg);
    }
  }
  &::after {
    top: 21px;
    ${Menu}.open & {
      transform: translate3d(0, -50%, 0) rotate(135deg);
    }
  }
`

const MenuIconBar = styled.div`
  width: 30px;
  height: 3px;
  position: absolute;
  top: 14px;
  text-indent: -9999px;

  &::before,
  &::after {
    transition: all 150ms ease;
    position: absolute;
    content: '';
    width: 11px;
    height: 3px;
    background: #4b4237;
    ${Menu}.open & {
      width: 0;
    }
  }
  &::before {
    right: 50%;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }
  &::after {
    left: 50%;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }
`

const MenuContent = styled.div`
  display: flex;
  visibility: visible;
  margin-right: 1.72rem;

  @media only screen and (max-width: 667px) {
    visibility: hidden;
    margin-top: 0;
    margin-right: 0;
    width: 0;
    height: 0;

    ${Menu}.open & {
      visibility: visible;
      position: fixed;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      z-index: 2;
    }
  }
`

const MenuBackground = styled.div`
  position: fixed;
  right: calc(9px + 5%);
  top: 33px;
  border-radius: 50%;
  width: 0px;
  height: 0px;
  transition: none;
  z-index: 1;
  background: #eee;
  visibility: hidden;

  ${Menu}.open & {
    visibility: visible;
    transition: width 0.3s cubic-bezier(0.755, 0.05, 0.855, 0.06),
      height 0.3s cubic-bezier(0.755, 0.05, 0.855, 0.06),
      top 0.3s cubic-bezier(0.755, 0.05, 0.855, 0.06),
      right 0.3s cubic-bezier(0.755, 0.05, 0.855, 0.06);
    width: 400vmax;
    height: 400vmax;
    top: calc(26px + 2.5rem - 200vmax);
    right: calc(15px + 5% - 200vmax);
  }
`

const SiteHeader = ({ small }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const handleMenuItemClick = () => isMenuOpen && setIsMenuOpen(false)
  const handleModeToggleClick = () => setIsDarkMode(isDarkMode => !isDarkMode)

  const ModeIcon = isDarkMode ? MoonIcon : SunIcon

  return (
    <Header>
      <Container small={small}>
        <SiteLogo />
        <Media
          query={{ minWidth: 668 }}
          onChange={() => setIsMenuOpen(false)}
        />
        <Menu className={isMenuOpen ? 'open' : ''}>
          <MenuIcon onClick={() => setIsMenuOpen((open) => !open)}>
            <MenuIconBar>{isMenuOpen ? 'Open menu' : 'Close menu'}</MenuIconBar>
          </MenuIcon>
          <MenuBackground></MenuBackground>
          <MenuContent>
            <MenuItemList>
              <MenuItem>
                <MenuItemLink
                  to="/"
                  activeClassName="active"
                  onClick={handleMenuItemClick}
                >
                  Home
                </MenuItemLink>
              </MenuItem>
              <MenuItem>
                <MenuItemLink
                  to="/blog"
                  activeClassName="active"
                  partiallyActive={true}
                  onClick={handleMenuItemClick}
                >
                  Articles
                </MenuItemLink>
              </MenuItem>
              <MenuItem>
                <MenuItemLink
                  to="/about"
                  activeClassName="active"
                  onClick={handleMenuItemClick}
                >
                  About
                </MenuItemLink>
              </MenuItem>
            </MenuItemList>
          </MenuContent>
          <ModeIcon onClick={handleModeToggleClick} />
        </Menu>
      </Container>
    </Header>
  )
}

export default SiteHeader
