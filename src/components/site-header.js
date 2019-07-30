import styled from '@emotion/styled'
import { Link } from 'gatsby'
import React from 'react'
import SiteLogo from './site-logo.svg'

const Header = styled.header`
  max-width: 768px;
  margin: 0 auto;
  padding: 0 20px;
`

const Logo = styled(SiteLogo)`
  margin: 50px 0;
  width: 140px;

  @media only screen and (min-width: 440px) {
    width: 160px;
  }
  @media only screen and (min-width: 668px) {
    width: 200px;
  }
  @media only screen and (min-width: 880px) {
    width: 230px;
  }

  path {
    fill: ${(props) => props.theme.colors.logo};
  }
`

const SiteHeader = ({ siteTitle }) => {
  return (
    <Header>
      <Link to="/">
        <Logo role="img" />
      </Link>
    </Header>
  )
}

export default SiteHeader
