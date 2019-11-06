import { MDXProvider } from '@mdx-js/react'
import { css, cx } from 'linaria'
import React from 'react'
import {
  Transition as ReactTransition,
  TransitionGroup,
} from 'react-transition-group'
import SiteFooter from './site-footer'
import SiteHeader from './site-header'

const global = css`
  :global() {
    /* Box sizing rules */
    *,
    *::before,
    *::after {
      box-sizing: border-box;
    }

    /* Remove list styles on ul, ol elements with a class attribute */
    ul[class],
    ol[class] {
      list-style: none;
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
    }

    body {
      margin: 0;
      overflow-x: hidden;
      font-kerning: normal;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      -moz-font-feature-settings: 'kern', 'liga', 'clig', 'calt';
      -ms-font-feature-settings: 'kern', 'liga', 'clig', 'calt';
      -webkit-font-feature-settings: 'kern', 'liga', 'clig', 'calt';
      font-feature-settings: 'kern', 'liga', 'clig', 'calt';
      background: #fff;
      min-height: 100%;
      scroll-behavior: smooth;
      text-rendering: optimizeSpeed;
    }

    a {
      color: ##1669f3;
      text-decoration: none;
      box-shadow: 0 1px 0 0 #ccc;

      &:hover {
        box-shadow: 0 1px 0 0 transparent;
      }
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
  margin: 110px auto 0;
  width: 90%;
  /* ie9-11 hack, see https://stackoverflow.com/a/20095764 */
  display: block;
`

function Foo() {
  return <span>Foo!</span>
}

const timeout = 150
const getTransitionStyles = {
  entering: {
    position: 'absolute',
    opacity: 0,
    transform: 'translateY(20px)',
  },
  entered: {
    transition: `all ${timeout}ms ease-in-out`,
    opacity: 1,
    transform: 'translateY(0)',
  },
  exiting: {
    transition: `all ${timeout}ms ease-in-out`,
    opacity: 0,
  },
}

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
            {children}
          </div>
        )}
      </ReactTransition>
    </TransitionGroup>
  )
}

const SiteLayout = ({ children, location }) => {
  // MDXProvider provides components that are usable in mdx files
  // without importing them
  return (
    <MDXProvider components={{ Foo }}>
      <div className={cx(global, container)}>
        <SiteHeader />
        <main id="main" className={main}>
          <Transition location={location}>{children}</Transition>
        </main>
        <SiteFooter />
      </div>
    </MDXProvider>
  )
}

export default SiteLayout
