import { Link } from 'gatsby'
import { styled } from 'linaria/react'
import React from 'react'
import BookmarkIcon from '../images/bookmark.svg'

const Footer = styled.footer`
  padding: 1rem 0;
  margin-top: 2.5rem;
  border-top: 1px solid #ddd;
  background: #fbfbfb;

  a {
    color: #999 !important;
    box-shadow: none !important;

    &:hover {
      color: #4b4237 !important;
    }
  }

  @media only screen and (max-width: 450px) {
    margin-top: calc(1.72rem * 1.5);
  }
`

const Container = styled.div`
  max-width: 768px;
  margin: 0 auto;
  width: 90%;
  display: flex;
  justify-content: space-between;
`

const Copyright = styled.div`
  display: flex;
  align-items: center;
`

const Social = styled.div`
  display: flex;
  margin-right: -8px;
  align-items: center;
`

const IconText = styled.span`
  margin-left: 4px;

  @media only screen and (max-width: 450px) {
    span {
      display: none;
    }
  }
`

const ExternalLink = styled.a`
  display: flex;
  align-items: center;
  box-shadow: none;
  margin: 0 8px;
`

const Icon = styled.svg`
  width: 20px;
  stroke: #448fea;
  stroke-width: 1;

  ${ExternalLink}:hover & {
    stroke: #ff8009;
  }
`

const SiteFooter = ({ small }) => {
  return (
    <Footer>
      <Container>
        <Copyright>
          <Link to="/legal">Legal Notice</Link>
        </Copyright>
        <Social>
          <ExternalLink
            href="https://github.com/codepunkt"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon as={BookmarkIcon} />
            <IconText>RSS</IconText>
          </ExternalLink>
        </Social>
      </Container>
    </Footer>
  )
}

export default SiteFooter
