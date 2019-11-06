import { Link } from 'gatsby'
import { css, cx } from 'linaria'
import React, { useState } from 'react'
import Helmet from 'react-helmet'
import Media from 'react-media'
import { useWindowScroll } from 'react-use'
import MoonIcon from '../images/moon.svg'
import SunIcon from '../images/sun.svg'
import SiteLogo from './site-logo'

const headerHeight = 70

const header = css`
  width: 100%;
  height: ${headerHeight}px;
  z-index: 3;
  display: flex;
  align-items: center;
  position: absolute;
  background: transparent;
  border-bottom: 1px solid #fff;
  top: 0;
  margin-top: 4px;

  @media only screen and (min-width: 668px) {
    margin-top: 16px;
  }
`

const headerFixed = css`
  @keyframes headerIn {
    from {
      transform: translateY(-100%);
    }
    to {
      transform: translateY(0);
    }
  }

  position: fixed;
  background: #fff;
  border-bottom-color: #d6dce3;
  animation: headerIn 0.4s ease-out forwards;
  margin-top: 0;
`

const headerStatic = css`
  @keyframes headerOut {
    from {
      transform: translateY(25px);
    }
    to {
      transform: translateY(0);
    }
  }

  border-bottom-color: #fff;
  animation: headerOut 0.2s ease-out forwards;
`

const container = css`
  max-width: 768px;
  margin: 0 auto;
  width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const menu = css`
  font-size: 18px;
  display: flex;
  align-items: center;
`

const menuItem = css`
  counter-increment: menu;
  margin: 0;
`

const menuItemOpen = css`
  display: block;
  width: 100%;
`

const menuItemList = css`
  display: flex;
  counter-reset: menu;
  list-style-type: none;
  margin: 0;
  height: 100%;
  align-items: center;

  @media only screen and (max-width: 667px) {
    display: none;
  }
`

const menuItemListOpen = css`
  display: flex;
  height: auto;
  justify-content: center;
  flex-direction: column;
`

const link = css`
  box-shadow: none;
  color: #4b4237;
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

  @keyframes fadeUpIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`

const linkOpen = css`
  @keyframes fadeUpIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  transition: none;
  padding: 0;
  animation: fadeUpIn 0.2s ease-out 0.25s forwards;
`
/* 
  ${Menu}.open li:nth-of-type(1) & {
    animation-delay: 0.25s;
  }
  ${Menu}.open li:nth-of-type(2) & {
    animation-delay: 0.27s;
  }
  ${Menu}.open li:nth-of-type(3) & {
    animation-delay: 0.29s;
  } */

const menuIcon = css`
  border: 0 none;
  width: 36px;
  height: 36px;
  position: absolute;
  right: calc(5% - 5px);
  background: transparent;
  padding: 0;
  cursor: pointer;
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
    height: 1px;
    left: 7px;
    border-radius: 5px;
    transition: all 150ms ease;
  }

  &::before {
    top: 10px;
  }
  &::after {
    top: 24px;
  }
`

const menuIconOpen = css`
  position: fixed;

  &::before,
  &::after {
    top: 50%;
  }

  &::before {
    transform: translate3d(0, -50%, 0) rotate(45deg);
  }
  &::after {
    transform: translate3d(0, -50%, 0) rotate(135deg);
  }
`

const menuIconBar = css`
  width: 36px;
  height: 1px;
  position: absolute;
  top: 17px;
  text-indent: -9999px;

  &::before,
  &::after {
    transition: all 150ms ease;
    position: absolute;
    content: '';
    width: 11px;
    height: 1px;
    background: #4b4237;
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

const menuIconBarOpen = css`
  &::before,
  &::after {
    width: 0;
  }
`

const menuContent = css`
  display: flex;
  visibility: visible;
  margin-right: 1.72rem;

  h1 {
    display: none;
  }

  @media only screen and (max-width: 667px) {
    visibility: hidden;
    margin-top: 0;
    margin-right: 0;
    width: 0;
    height: 0;
  }
`

const menuContentOpen = css`
  h1 {
    display: block;
  }

  @media only screen and (max-width: 667px) {
    visibility: visible;
    position: fixed;
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 2;
    flex-direction: column;
    padding: 120px 5% 0;
  }
`

const menuBackground = css`
  position: fixed;
  right: calc(12px + 5%);
  top: 34px;
  border-radius: 50%;
  width: 0px;
  height: 0px;
  transition: none;
  z-index: 1;
  background: #fff;
  box-shadow: 0 0 0 10px #aaaacc22;
  visibility: hidden;
`

const menuBackgroundOpen = css`
  visibility: visible;
  transition: width 0.3s cubic-bezier(0.755, 0.05, 0.855, 0.06),
    height 0.3s cubic-bezier(0.755, 0.05, 0.855, 0.06),
    top 0.3s cubic-bezier(0.755, 0.05, 0.855, 0.06),
    right 0.3s cubic-bezier(0.755, 0.05, 0.855, 0.06);
  width: 400vmax;
  height: 400vmax;
  top: calc(26px + 2.5rem - 200vmax);
  right: calc(15px + 5% - 200vmax);
`

const modeButton = css`
  border: 0;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 36px;
  width: 36px;
  z-index: 99;

  @media only screen and (max-width: 667px) {
    position: absolute;
    right: calc(5% + 40px);
  }
`

const overflowHidden = css`
  overflow: hidden;
`

const SiteHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const handleMenuItemClick = () => isMenuOpen && setIsMenuOpen(false)
  const handleModeToggleClick = () => setIsDarkMode((isDarkMode) => !isDarkMode)

  const { y } = useWindowScroll()
  const [headerState, setHeaderState] = useState('initial')

  React.useEffect(() => {
    if (headerState !== 'fixed' && y > 250) {
      setHeaderState('fixed')
    }
    if (headerState === 'fixed' && y < 40) {
      setHeaderState('static')
    }
  }, [headerState, y])

  return (
    <header
      className={cx(
        header,
        headerState === 'fixed' && headerFixed,
        headerState === 'static' && headerStatic
      )}
    >
      <Helmet>
        <html className={cx(isMenuOpen && overflowHidden)} />
      </Helmet>
      <div className={container}>
        <SiteLogo />
        <Media
          query={{ minWidth: 668 }}
          onChange={() => setIsMenuOpen(false)}
        />
        <nav className={`${menu}${isMenuOpen ? ' open' : ' '}`}>
          <button
            className={cx(menuIcon, isMenuOpen && menuIconOpen)}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <div className={cx(menuIconBar, isMenuOpen && menuIconBarOpen)}>
              {isMenuOpen ? 'Open menu' : 'Close menu'}
            </div>
          </button>
          <div
            className={cx(menuBackground, isMenuOpen && menuBackgroundOpen)}
          ></div>
          <div className={cx(menuContent, isMenuOpen && menuContentOpen)}>
            <h1>
              <span>Menu</span>
            </h1>
            <ul className={cx(menuItemList, isMenuOpen && menuItemListOpen)}>
              <li className={cx(menuItem, isMenuOpen && menuItemOpen)}>
                <Link
                  to="/"
                  activeClassName="active"
                  onClick={handleMenuItemClick}
                  className={cx(link, isMenuOpen && linkOpen)}
                >
                  Home
                </Link>
              </li>
              <li className={cx(menuItem, isMenuOpen && menuItemOpen)}>
                <Link
                  to="/articles"
                  activeClassName="active"
                  partiallyActive={true}
                  onClick={handleMenuItemClick}
                  className={cx(link, isMenuOpen && linkOpen)}
                >
                  Articles
                </Link>
              </li>
              <li className={cx(menuItem, isMenuOpen && menuItemOpen)}>
                <Link
                  to="/about"
                  activeClassName="active"
                  onClick={handleMenuItemClick}
                  className={cx(link, isMenuOpen && linkOpen)}
                >
                  About
                </Link>
              </li>
            </ul>
          </div>
          <button className={modeButton} onClick={handleModeToggleClick}>
            {isDarkMode ? <MoonIcon /> : <SunIcon />}
          </button>
        </nav>
      </div>
    </header>
  )
}

export default SiteHeader
