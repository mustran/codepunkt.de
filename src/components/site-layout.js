import { MDXProvider } from '@mdx-js/react'
import { styled } from 'linaria/react'
import React from 'react'
import { globalStyle } from '../style'
import SiteFooter from './site-footer'
import SiteHeader from './site-header'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

const Main = styled.main`
  max-width: 768px;
  margin: 110px auto 0;
  width: 90%;
  /* ie9-11 hack, see https://stackoverflow.com/a/20095764 */
  display: flex;
  flex: 1 0 auto;
  animation: fadeUpIn 0.2s ease-out;

  @keyframes fadeUpIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

function Foo() {
  return <span>Foo!</span>
}

const SiteLayout = ({ children, small }) => {
  // MDXProvider provides components that are usable in mdx files
  // without importing them
  return (
    <MDXProvider components={{ Foo }}>
      <Container className={globalStyle}>
        <SiteHeader small={small} />
        <Main small={small}>{children}</Main>
        <SiteFooter small={small} />
      </Container>
    </MDXProvider>
  )
}

export default SiteLayout
