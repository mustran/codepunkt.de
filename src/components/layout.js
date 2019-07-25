import { Global } from '@emotion/core'
import styled from '@emotion/styled'
import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'
import globalStyles from '../style/global'
import Header from './header'

const Main = styled.main`
  max-width: 768px;
  margin: 0 auto;
  padding: 0 20px;
`

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
      <Global styles={globalStyles} />
      <Header siteTitle={data.site.siteMetadata.title} />
      <Main>{children}</Main>
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
