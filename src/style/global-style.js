import { css, Global } from '@emotion/core'
import React from 'react'
import { withTheme } from 'emotion-theming'

export const GlobalStyle = withTheme(({ theme: { colors } }) => {
  const styles = css`
    html {
      -ms-text-size-adjust: 100%;
      -webkit-text-size-adjust: 100%;
    }

    body {
      margin: 0;
      font-kerning: normal;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      -moz-font-feature-settings: 'kern', 'liga', 'clig', 'calt';
      -ms-font-feature-settings: 'kern', 'liga', 'clig', 'calt';
      -webkit-font-feature-settings: 'kern', 'liga', 'clig', 'calt';
      font-feature-settings: 'kern', 'liga', 'clig', 'calt';
      background: #fbfbfb;
    }

    *,
    *::before,
    *::after {
      box-sizing: border-box;
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

    a,
    a:link,
    a:visited,
    a:focus,
    a:hover,
    a:active {
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
