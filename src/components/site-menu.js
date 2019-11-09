import { Link } from 'gatsby'
import { css, cx } from 'linaria'
import React, { useEffect, useState } from 'react'
import { useOrientation, useWindowScroll } from 'react-use'
import MoonIcon from '../images/moon.svg'
import SunIcon from '../images/sun.svg'

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
      margin-top: -70px;
    }
    to {
      margin-top: 0;
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
      margin-top: 25px;
    }
    to {
      margin-top: 0;
    }
  }

  border-bottom-color: #fff;
  animation: headerOut 0.2s ease-out forwards;
`

const headerOpen = css`
  position: fixed;

  .menuBackground {
    visibility: visible;
    transition: transform 300ms cubic-bezier(0.755, 0.05, 0.855, 0.06);
    transform: scale(50);
  }

  .menuButton::before,
  .menuButton::after {
    top: 50%;
  }

  .menuButton::before {
    transform: translate3d(0, -50%, 0) rotate(45deg);
  }
  .menuButton::after {
    transform: translate3d(0, -50%, 0) rotate(135deg);
  }

  .menuButton > div::before,
  .menuButton > div::after {
    width: 0;
  }

  .menuItems {
    display: flex;
    flex-direction: column;
    position: fixed;
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    padding: 20vh 5% 0;
    align-items: center;
  }

  .menuItem {
    display: block;
    width: 100%;
    padding: 0 15%;
    margin: 1vh 0;

    &:nth-of-type(1) a {
      animation-delay: 0.25s;
    }
    &:nth-of-type(1) a.active::before {
      background: #efe0fb;
    }
    &:nth-of-type(2) a {
      animation-delay: 0.27s;
    }
    &:nth-of-type(2) a.active::before {
      background: #e0f0fb;
    }
    &:nth-of-type(3) a {
      animation-delay: 0.29s;
    }
    &:nth-of-type(3) a.active::before {
      background: #d8efd0;
    }
  }
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
  margin: 0;
`

const menuItems = css`
  display: flex;
  list-style-type: none;
  margin: 0;
  height: 100%;
  align-items: center;

  @media only screen and (max-width: 667px) {
    display: none;
  }
`

const link = css`
  box-shadow: none;
  color: #4b4237;
  position: relative;
  padding: 6px 12px;
  box-shadow: 0 none;

  @media only screen and (min-width: 668px) {
    &.active {
      background: #fff;
      border: 1px solid #dfe3e8;
    }
  }

  @media only screen and (max-width: 667px) {
    opacity: 0;
    display: flex;
    align-items: center;
    padding: 1rem 20%;
    font-size: 2rem;
    font-weight: 300;
    font-family: Merriweather, 'Lucida Bright', Lucidabright, 'Lucida Serif',
      Lucida, 'DejaVu Serif', 'Bitstream Vera Serif', 'Liberation Serif',
      Georgia, serif;

    &::before {
      content: '';
      display: block;
      background: #fbfbfb;
      left: 0;
      width: 200%;
      height: 5px;
      bottom: 0;
      position: absolute;
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
  padding: 0 12px;
`

const menuButton = css`
  border: 0 none;
  width: 36px;
  height: 36px;
  background: transparent;
  padding: 0;
  cursor: pointer;
  z-index: 99;
  margin-right: -4px;
  position: relative;

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

  > div {
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
  }
`

const modeButton = css`
  border: 0;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 36px;
  width: 36px;
  margin: 0 4px 0 0;

  @media only screen and (min-width: 668px) {
    margin: 0 -4px 0 32px;
    order: 1;
  }
`

const overflowHidden = css`
  overflow: hidden;
`

const menuBackground = css`
  width: 100%;
  height: 100%;
  top: calc(-50% + 39px);
  right: calc(-45% + 13px);
  visibility: hidden;
  position: fixed;
  transform: scale(1);
  transform-origin: 50% 50%;
  transition-duration: 0s;

  > circle:not(:last-child) {
    opacity: 0.5;
  }
`

const SiteHeader = ({ sneakPeakColor, path }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const handleMenuItemClick = () => isMenuOpen && setIsMenuOpen(false)
  const handleModeToggleClick = () => setIsDarkMode((isDarkMode) => !isDarkMode)
  useEffect(() => setIsMenuOpen(false), [path])
  const { y } = useWindowScroll()
  const [headerState, setHeaderState] = useState('initial')
  const { angle } = useOrientation()
  const isLandscape = angle === 90 || angle === 270

  React.useEffect(() => {
    if (headerState !== 'fixed' && y > 250) {
      setHeaderState('fixed')
    }
    if (headerState === 'fixed' && y < 40) {
      setHeaderState('static')
    }
  }, [headerState, y])

  return (
    <nav className={`${menu}${isMenuOpen ? ' open' : ' '}`}>
      <button
        className={`modeButton ${modeButton}`}
        onClick={handleModeToggleClick}
      >
        {isDarkMode ? <MoonIcon /> : <SunIcon />}
      </button>
      <button
        className={`menuButton ${menuButton}`}
        onClick={() => setIsMenuOpen((open) => !open)}
      >
        <div>{isMenuOpen ? 'Open menu' : 'Close menu'}</div>
      </button>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
        className={`menuBackground ${menuBackground}`}
      >
        <mask id="m">
          <circle cx="50" cy="50" r="6" fill="white" />
          <circle
            cx="50"
            cy="50"
            r="3"
            transform="translate(0.15 0)"
            fill="black"
          />
          <circle cx="50" cy="50" r="2.6" fill="white" />
        </mask>
        <circle cx="50" cy="50" r="4.5" fill="#f3f3f3" />
        <circle cx="50" cy="50" r="5" fill="#fff" mask="url(#m)" />
      </svg>
      <ul
        className={`menuItems ${isLandscape ? 'landscape ' : ''}${menuItems}`}
      >
        <li className={`menuItem ${menuItem}`}>
          <Link
            to="/"
            activeClassName="active"
            onClick={handleMenuItemClick}
            className={cx(link, isMenuOpen && linkOpen)}
          >
            <span>Home</span>
          </Link>
        </li>
        <li className={`menuItem ${menuItem}`}>
          <Link
            to="/articles"
            activeClassName="active"
            partiallyActive={true}
            onClick={handleMenuItemClick}
            className={cx(link, isMenuOpen && linkOpen)}
          >
            <span>Articles</span>
          </Link>
        </li>
        <li className={`menuItem ${menuItem}`}>
          <Link
            to="/about"
            activeClassName="active"
            onClick={handleMenuItemClick}
            className={cx(link, isMenuOpen && linkOpen)}
          >
            <span>About</span>
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default SiteHeader
