import { css, Global } from '@emotion/core'
import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'
import Header from './header'

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Global
        styles={css`
          html {
            -ms-text-size-adjust: 100%;
            -webkit-text-size-adjust: 100%;
            box-sizing: border-box;
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
            box-sizing: inherit;
          }
        `}
      />
      <Header siteTitle={data.site.siteMetadata.title} />
      <main>{children}</main>
      <footer>
        built with{' '}
        <span role="img" aria-label="love">
          💖
        </span>{' '}
        in Paderborn
      </footer>
    </>
  )
}

export default Layout
