import styled from '@emotion/styled'
import { MDXProvider } from '@mdx-js/react'
import { ThemeProvider } from 'emotion-theming'
import React from 'react'
import { useWindowScroll } from 'react-use'
import { GlobalStyle } from '../style'
import fadeUpIn from '../style/animations/fade-up-in'
import SiteFooter from './site-footer'
import SiteHeader from './site-header'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

const Main = styled.main`
  max-width: ${(props) => (props.small ? 768 : 1200)}px;
  margin: ${(props) => (props.isHeaderFixed ? '140px auto 0' : '0 auto')};
  width: 90%;
  /* ie9-11 hack, see https://stackoverflow.com/a/20095764 */
  display: flex;
  flex: 1 0 auto;
  animation: ${fadeUpIn} 0.2s ease-out;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

const theme = {
  colors: {
    logo: '#5185c5',
    link: '#1669f3',
  },
}

function Foo() {
  return <span>Foo!</span>
}

const SiteLayout = ({ children, small }) => {
  const { y } = useWindowScroll()
  const isHeaderFixed = y >= 250

  // MDXProvider provides components that are usable in mdx files
  // without importing them
  return (
    <ThemeProvider theme={theme}>
      <MDXProvider components={{ Foo }}>
        <GlobalStyle />
        <Container>
          <SiteHeader small={small} isHeaderFixed={isHeaderFixed} />
          <Main small={small} isHeaderFixed={isHeaderFixed}>
            {children}
          </Main>
          <SiteFooter small={small} />
        </Container>
      </MDXProvider>
    </ThemeProvider>
  )
}

export default SiteLayout
