import { Link } from 'gatsby'
import { css, cx } from 'linaria'
import React, { useState } from 'react'
import Helmet from 'react-helmet'
import Media from 'react-media'
import { useWindowScroll } from 'react-use'
import FeatherIcon from '../images/feather.svg'
import HomeIcon from '../images/home.svg'
import MoonIcon from '../images/moon.svg'
import SunIcon from '../images/sun.svg'
import UserIcon from '../images/user.svg'
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

const headerOpen = css`
  position: static;
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

  &:nth-of-type(1) a {
    animation-delay: 0.25s;
  }
  &:nth-of-type(2) a {
    animation-delay: 0.27s;
  }
  &:nth-of-type(3) a {
    animation-delay: 0.29s;
  }
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
    font-size: 1.4rem;

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

  &.active {
    border: 0;
  }

  svg {
    margin-right: 8px;
    stroke-width: 1;
  }
`

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

  @media only screen and (max-width: 667px) {
    visibility: hidden;
    margin-top: 0;
    margin-right: 0;
    width: 0;
    height: 0;
  }
`

const menuContentOpen = css`
  visibility: visible;
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 2;
  flex-direction: column;
  padding: 120px 5% 0;
`

const menuBackground = css`
  position: fixed;
  right: calc(5% - 5px);
  top: 20px;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  transition: none;
  z-index: 1;
  background: #fff;
  visibility: hidden;
`

const menuBackgroundOpen = css`
  visibility: visible;
  transition: transform 300ms cubic-bezier(0.755, 0.05, 0.855, 0.06);
  transform: scale(100);
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

const background = css`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  visibility: hidden;
  z-index: 2;

  circle {
    transform: scale(1);
    transform-origin: 50% 50%;
    transition: transform 300ms cubic-bezier(0.755, 0.05, 0.855, 0.06);
  }
`

const backgroundOpen = css`
  visibility: visible;

  circle {
    transform: scale(20);
  }
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
        headerState === 'static' && headerStatic,
        isMenuOpen && headerOpen
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
          {/* <div
            className={cx(menuBackground, isMenuOpen && menuBackgroundOpen)}
            style={{ background: '#ddd' }}
          ></div>
          <div
            className={cx(menuBackground, isMenuOpen && menuBackgroundOpen)}
            style={{ transitionDelay: '2ms' }}
          ></div> */}
          <svg className={cx(background, isMenuOpen && backgroundOpen)}>
            <clipPath id="c">
              <circle cx="50%" cy="50%" r="5%" />
            </clipPath>
            <rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              fill="papayawhip"
              clipPath="url(#c)"
            />
          </svg>
          <div className={cx(menuContent, isMenuOpen && menuContentOpen)}>
            <ul className={cx(menuItemList, isMenuOpen && menuItemListOpen)}>
              <li className={cx(menuItem, isMenuOpen && menuItemOpen)}>
                <Link
                  to="/"
                  activeClassName="active"
                  onClick={handleMenuItemClick}
                  className={cx(link, isMenuOpen && linkOpen)}
                >
                  <HomeIcon />
                  <span>Home</span>
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
                  <FeatherIcon />
                  <span>Articles</span>
                </Link>
              </li>
              <li className={cx(menuItem, isMenuOpen && menuItemOpen)}>
                <Link
                  to="/about"
                  activeClassName="active"
                  onClick={handleMenuItemClick}
                  className={cx(link, isMenuOpen && linkOpen)}
                >
                  <UserIcon />
                  <span>About</span>
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
