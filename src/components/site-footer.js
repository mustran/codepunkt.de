import styled from '@emotion/styled'
import { Link } from 'gatsby'
import React from 'react'
import BookmarkIcon from '../images/bookmark.svg'
import EditIcon from '../images/edit.svg'

const Footer = styled.footer`
  padding: 1rem 0;
  margin-top: calc(1.72rem * 2);
  font-family: Lato, sans-serif;

  a {
    color: #777 !important;
    box-shadow: none !important;

    &:hover {
      color: #4b4237;
    }
  }

  @media only screen and (max-width: 450px) {
    margin-top: calc(1.72rem * 1.5);
  }
`

const Container = styled.div`
  max-width: ${(props) => (props.small ? 768 : 1200)}px;
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
  stroke: #777;
  stroke-width: 1;

  ${ExternalLink}:hover & {
    stroke: #eaa944;
  }
`

const baseUrl = 'https://github.com/codepunkt/codepunkt.de/edit/master'

const SiteFooter = ({ small, filePath }) => {
  return (
    <Footer>
      <Container small={small}>
        <Copyright>
          <Link to="/legal">Legal Notice</Link>
        </Copyright>
        <Social>
          <ExternalLink
            href={`${baseUrl}/${filePath}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon as={EditIcon} />
            <IconText>
              Edit <span>on GitHub</span>
            </IconText>
          </ExternalLink>
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
