import styled from '@emotion/styled'
import { Link } from 'gatsby'
import React from 'react'
import { linkStyle } from '../style'

const Footer = styled.footer`
  ${linkStyle}
  padding: 2em 0;
  font-size: 16px;
  color: #888;
  font-family: Lato, sans-serif;
  border-top: 1px solid #eaeaea;
`

const Container = styled.div`
  max-width: ${(props) => (props.small ? 768 : 1200)}px;
  margin: 0 auto;
  width: 90%;
`

const SiteFooter = ({ small }) => {
  return (
    <Footer>
      <Container small={small}>
        <div>
          <b>© 2019</b>
        </div>
        <div>
          <Link to="/">Christoph Werner</Link>
        </div>
        <div>
          <b>Contact</b>
        </div>
        <div>
          <a
            href="mailto:christoph@codepunkt.de"
            target="_blank"
            rel="noopener noreferrer"
          >
            christoph@codepunkt.de
          </a>
        </div>
        <div>
          <b>Social</b>
        </div>
        <div>
          <a
            href="https://twitter.com/code_punkt"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </a>{' '}
          /{' '}
          <a
            href="https://github.com/codepunkt"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </a>
        </div>
      </Container>
    </Footer>
  )
}

export default SiteFooter
