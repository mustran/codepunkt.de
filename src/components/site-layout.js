import styled from '@emotion/styled'
import { MDXProvider } from '@mdx-js/react'
import { ThemeProvider } from 'emotion-theming'
import React from 'react'
import { GlobalStyle } from '../style'
import SiteFooter from './site-footer'
import SiteHeader from './site-header'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 70px - 2.5rem);
`

const Main = styled.main`
  max-width: ${(props) => (props.small ? 768 : 1200)}px;
  margin: 0 auto;
  width: 90%;
  /* ie9-11 hack, see https://stackoverflow.com/a/20095764 */
  display: flex;
  flex: 1 0 auto;
`

const theme = {
  colors: {
    logo: '#eaa944',
    link: '#1669f3',
  },
}

function Foo() {
  return <span>Foo!</span>
}

const SiteLayout = ({ children, small, filePath }) => {
  // MDXProvider provides components that are usable in mdx files
  // without importing them
  return (
    <ThemeProvider theme={theme}>
      <MDXProvider components={{ Foo }}>
        <GlobalStyle />
        <Container>
          <SiteHeader small={small} />
          <Main small={small}>{children}</Main>
          <SiteFooter small={small} filePath={filePath} />
        </Container>
      </MDXProvider>
    </ThemeProvider>
  )
}

export default SiteLayout
