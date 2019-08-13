import styled from '@emotion/styled'
import { Link } from 'gatsby'
import React from 'react'
import SiteLayout from '../components/site-layout'

const Hero = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1 0 auto;
  width: 100%;
`

const HeroTitle = styled.h1`
  font-size: 3.5rem;
`

const HeroGreeting = styled.p`
  font-family: Lato, sans-serif;
  order: -1;
  margin-bottom: 0px;
  text-transform: uppercase;
  font-weight: 500;
`

const HomePage = () => (
  <SiteLayout>
    <Hero>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <HeroTitle>I build and explain web.</HeroTitle>
        <HeroGreeting>Hello, my name is Christoph</HeroGreeting>
        <p>
          I'm a software architect and team lead at{' '}
          <a
            href="https://dspace.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            dSPACE
          </a>
          , where i teach building web sites, applications and APIs. I also
          write about the web on my <Link to="/blog">Blog</Link> and on{' '}
          <a
            href="https://twitter.com/code_punkt"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </a>
          .
        </p>
      </div>
    </Hero>
  </SiteLayout>
)

export default HomePage
