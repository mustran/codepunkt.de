import { Global } from '@emotion/core'
import styled from '@emotion/styled'
import { MDXProvider } from '@mdx-js/react'
import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'
import { globalStyles } from '../style'
import Header from './header'

const Main = styled.main`
  max-width: 768px;
  margin: 0 auto;
  padding: 0 20px;
  /* ie9-11 hack */
  display: block;
`

function Foo() {
  return <span>Foo!</span>
}

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

  // MDXProvider provides components that are usable in mdx files
  // without importing them
  return (
    <MDXProvider components={{ Foo }}>
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
    </MDXProvider>
  )
}

export default Layout
