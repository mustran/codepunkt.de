import styled from '@emotion/styled'
import { MDXProvider } from '@mdx-js/react'
import { ThemeProvider } from 'emotion-theming'
import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'
import { GlobalStyle } from '../style'
import SiteFooter from './site-footer'
import SiteHeader from './site-header'

const Main = styled.main`
  max-width: 768px;
  margin: 0 auto;
  padding: 0 20px;
  /* ie9-11 hack, see https://stackoverflow.com/a/20095764 */
  display: block;
`

const theme = {
  colors: {
    logo: '#4483ea',
    // contrast ratio on current background: 4.67 AA
    link: '#1669f3',
  },
}

function Foo() {
  return <span>Foo!</span>
}

const SiteLayout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          description
        }
      }
    }
  `)

  // MDXProvider provides components that are usable in mdx files
  // without importing them
  return (
    <ThemeProvider theme={theme}>
      <MDXProvider components={{ Foo }}>
        <GlobalStyle />
        {/* <GlobalStyles styles={globalStyle} /> */}
        <SiteHeader description={data.site.siteMetadata.description} />
        <Main>{children}</Main>
        <SiteFooter />
      </MDXProvider>
    </ThemeProvider>
  )
}

export default SiteLayout
