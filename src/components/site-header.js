import { css, cx } from 'linaria'
import React, { useState } from 'react'
import { useWindowScroll } from 'react-use'
import useDarkMode from 'use-dark-mode'
import MoonIcon from '../images/moon.svg'
import SunIcon from '../images/sun.svg'
import SiteLogo from './site-logo'
import Menu from './site-menu'

const headerHeight = 70

const header = css`
  width: 100%;
  height: ${headerHeight}px;
  z-index: 3;
  display: flex;
  align-items: center;
  position: absolute;
  background: transparent;
  border-bottom: 1px solid transparent;
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
  border-bottom-color: #f2f2f2;
  animation: headerIn 0.4s ease-out forwards;
  margin-top: 0;

  .dark-mode & {
    background: #15202b;
    border-bottom-color: #1e2e3e;
  }
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

const rightSide = css`
  display: flex;
`

const sunIcon = css`
  stroke-width: 1.3;
  width: 24px;
  height: 24px;
  display: block;
`
const moonIcon = css`
  stroke-width: 0.8;
  width: 24px;
  height: 24px;
  display: block;
`

const modeButton = css`
  border: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 36px;
  width: 36px;
  background: transparent;
  padding: 0;
  margin: 0 4px 0 0;
  order: -1;

  @media only screen and (min-width: 668px) {
    margin: 0 -4px 0 32px;
    order: 1;
  }

  .dark-mode & {
    color: #fff;
  }

  svg {
    width: 24px;
  }
`

const SiteHeader = ({ sneakPeakColor, path }) => {
  const { value: isDarkMode, toggle: toggleDarkMode } = useDarkMode(false)

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
      <div className={container}>
        <SiteLogo />
        <div className={rightSide}>
          <Menu path={path} />
          <button
            className={`modeButton ${modeButton}`}
            onClick={toggleDarkMode}
            aria-label="Dark mode"
            aria-pressed={isDarkMode}
          >
            {isDarkMode ? (
              <SunIcon
                className={sunIcon}
                role="presentation"
                focusable="false"
              />
            ) : (
              <MoonIcon
                className={moonIcon}
                role="presentation"
                focusable="false"
              />
            )}
          </button>
        </div>
      </div>
    </header>
  )
}

export default SiteHeader
