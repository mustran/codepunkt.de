import { MDXProvider } from '@mdx-js/react'
import { css, cx } from 'linaria'
import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import {
  Transition as ReactTransition,
  TransitionGroup,
} from 'react-transition-group'
import colors from '../../style/colors'
import SiteFooter from '../site-footer'
import { Header } from './header'
import { InitialAnimation } from './initialAnimation'

const global = css`
  :global() {
    /* Box sizing rules */
    *,
    *::before,
    *::after {
      box-sizing: border-box;
    }

    /* Remove list styles and margin/padding on ul, ol elements with a class attribute */
    ul[class],
    ol[class] {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    /* A elements that don't have a class get default styles */
    a:not([class]) {
      text-decoration-skip-ink: auto;
    }

    /* Make images easier to work with */
    img {
      max-width: 100%;
      display: block;
    }

    /* Inherit fonts for inputs and buttons */
    input,
    button,
    textarea,
    select {
      font: inherit;
    }

    /* Remove all animations and transitions for people that prefer not to see them */
    @media (prefers-reduced-motion: reduce) {
      * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
      }
    }

    html {
      -ms-text-size-adjust: 100%;
      -webkit-text-size-adjust: 100%;
      scroll-behavior: auto;
      overscroll-behavior-y: none;
    }

    body {
      position: relative;
      min-height: 100%;
      min-height: stretch;
      margin: 0;
      overflow-x: hidden;
      font-kerning: normal;
      font-size: min(max(18px, 2.5vmin), 24px);
      font-family: 'Open Sans', -apple-system, 'BlinkMacSystemFont', 'Segoe UI',
        'Roboto', 'Oxygen-Sans', 'Ubuntu', 'Cantarell', 'Helvetica Neue',
        sans-serif;
      line-height: 1.5;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      -moz-font-feature-settings: 'kern', 'liga', 'clig', 'calt';
      -ms-font-feature-settings: 'kern', 'liga', 'clig', 'calt';
      -webkit-font-feature-settings: 'kern', 'liga', 'clig', 'calt';
      font-feature-settings: 'kern', 'liga', 'clig', 'calt';
      min-height: 100%;
      scroll-behavior: smooth;
      text-rendering: optimizeSpeed;

      color: #28342b;
      background: #f0f7f2;
      transition: all 0.2s ease-out;
      will-change: color, background;
      .dark-mode & {
        color: #e8e8f0;
        background: #15202b;
      }

      padding: 18px 10px 10px;
      @media screen and (min-width: 521px) {
        padding: 28px 20px 20px;
      }
    }

    html[data-state='init'],
    html[data-state='menu'] {
      overflow: hidden;
      body {
        overflow: hidden;
      }
    }

    html::after,
    html::before {
      content: '';
      position: fixed;
      top: 0;
      height: 100%;
      width: 10px;
      z-index: 20000;
      background: #fff;
      transition: all 0.2s ease-out;
      @media screen and (min-width: 521px) {
        width: 20px;
      }
    }
    html.dark-mode::after,
    html.dark-mode::before {
      background: #3e4156;
    }
    html::before {
      left: 0;
    }
    html::after {
      right: 0;
    }
    body::after,
    body::before {
      content: '';
      position: fixed;
      left: 0;
      width: 100%;
      height: 10px;
      background: #fff;
      transition: all 0.2s ease-out;
      z-index: 21000;
      @media screen and (min-width: 521px) {
        height: 20px;
      }
      .dark-mode & {
        background: #3e4156;
      }
    }
    body::before {
      top: 0;
      height: 18px;
      border-top: 8px solid #9cc989;
      @media screen and (min-width: 521px) {
        height: 28px;
      }
      .dark-mode & {
        border-top-color: #e68fff;
      }
    }
    body::after {
      bottom: 0;
    }

    /* starting from here, i'm not so sure... */
    a {
      text-decoration: none;
      color: ${colors.light.link};
      &:hover {
        box-shadow: 0 1px 0 0 #aacaff;
      }
      .dark-mode & {
        color: ${colors.dark.link};
        &:hover {
          box-shadow: 0 1px 0 0 #2a6398;
        }
      }
    }

    a,
    button {
      -webkit-tap-highlight-color: transparent;
    }

    html:not([data-whatinput='keyboard']) * {
      outline: none;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      font-family: montserrat, Verdana, Arial, sans-serif;
      font-weight: 500;
    }
  }
`

const container = css`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

const main = css`
  max-width: 768px;
  width: 90%;
  /* ie9-11 hack, see https://stackoverflow.com/a/20095764 */
  display: block;
  margin: 120px auto 0;
  min-height: calc(100vh - 6rem - 160px);

  @media only screen and (min-width: 668px) {
    margin: 160px auto 0;
  }
`

function Foo() {
  return <span>Foo!</span>
}

const timeout = 150

/**
 * animating translateY would be better performance-wise, but since
 * transformed elements form their own stacking context, positioning inner
 * elements gets harder.
 *
 * this is why we animate margin-top instead. if we do that, we also need
 * to animate margin-bottom to prevent the footer from jumping.
 */
const getTransitionStyles = {
  entering: {
    position: 'absolute',
    opacity: 0,
    marginTop: -20,
    marginBottom: 20,
  },
  entered: {
    transition: `all ${timeout}ms ease-in-out`,
    opacity: 1,
    marginTop: 0,
    marginBottom: 0,
  },
  exiting: {
    transition: `all ${timeout}ms ease-in-out`,
    opacity: 0,
  },
}

const minHeight = css`
  min-height: calc(100vh - 120px - 6rem);

  @media only screen and (min-width: 668px) {
    min-height: calc(100vh - 160px - 6rem);
  }
`

const Transition = ({ children, location }) => {
  return (
    <TransitionGroup>
      <ReactTransition
        key={location.pathname}
        timeout={{
          enter: timeout,
          exit: timeout,
        }}
      >
        {(status) => (
          <div
            style={{
              ...getTransitionStyles[status],
            }}
          >
            {React.cloneElement(children, {
              className: minHeight,
            })}
          </div>
        )}
      </ReactTransition>
    </TransitionGroup>
  )
}

const SiteLayout = ({ children, location }) => {
  const [appState, setAppState] = useState('init')

  const runInitialAnimation =
    window.sessionStorage.getItem('initial-animation') !== 'done'
  console.log({ runInitialAnimation })

  return (
    // MDXProvider provides components that are usable in mdx files
    // without importing them
    <MDXProvider components={{ Foo }}>
      <Helmet>
        <html data-state={appState} />
      </Helmet>
      <div className={cx(global, container)}>
        {runInitialAnimation && <InitialAnimation setAppState={setAppState} />}
        <Header appState={appState} setAppState={setAppState} />
        <main className={main}>
          <Transition location={location}>{children}</Transition>
        </main>
        <SiteFooter path={location.pathname} />
      </div>
    </MDXProvider>
  )
}

export default SiteLayout
