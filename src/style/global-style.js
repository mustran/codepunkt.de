import { css, Global } from '@emotion/core'
import { withTheme } from 'emotion-theming'
import React from 'react'

export const GlobalStyle = withTheme(({ theme: { colors } }) => {
  const styles = css`
    /* Box sizing rules */
    *,
    *::before,
    *::after {
      box-sizing: border-box;
    }

    /* Set core body defaults */
    body {
      min-height: 100%;
      scroll-behavior: smooth;
      text-rendering: optimizeSpeed;
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
    }

    noscript {
      background: #ffff83;
      max-width: 768px;
      margin: 0 auto;
      padding: 10px 20px;
      display: block;
      margin-top: 1rem;
      border-radius: 4px;
      color: #963e08;
    }

    a {
      color: ${colors.link};
      text-decoration: none;
      box-shadow: 0 1px 0 0 #ccc;

      &:hover {
        box-shadow: 0 1px 0 0 transparent;
      }
    }
  `
  return <Global styles={styles} />
})
