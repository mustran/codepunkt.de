import styled from '@emotion/styled'
import React from 'react'
import { linkStyle } from '../style'

const Footer = styled.footer`
  ${linkStyle}
  padding: 2em 0;
  font-size: 16px;
  color: #888;
`

const Container = styled.div`
  max-width: 768px;
  margin: 0 auto;
  padding: 0 20px;
`

const SiteFooter = () => {
  return (
    <Footer>
      <Container></Container>
    </Footer>
  )
}

export default SiteFooter
