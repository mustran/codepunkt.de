import { keyframes } from '@emotion/core'
import styled from '@emotion/styled'
import { Link } from 'gatsby'
import React from 'react'
import SiteLayout from '../components/site-layout'

const animation = keyframes`
  0% {
    opacity: 0;
    -webkit-transform: translateY(20px);
    transform: translateY(20px)
  }
  100% {
    opacity: 1;
    -webkit-transform: translateY(0);
    transform: translateY(0)
  }`

const Hero = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1 0 auto;
  width: 100%;
  animation: ${animation} 0.3s ease-out;
`

const HeroTitle = styled.h1`
  margin-bottom: 1rem;
  font-size: 3.5rem;
  color: #eaa944;

  span {
    background: rgba(0, 0, 0, 0.03);
  }

  @media only screen and (max-width: 450px) {
    font-size: 2.3rem;
  }
`

const HeroGreeting = styled.p`
  order: -1;
  margin-bottom: 1rem;
  text-transform: uppercase;
  font-size: 1.3rem;
  font-weight: 700;
  font-family: Lato, sans-serif;

  @media only screen and (max-width: 450px) {
    font-size: 1rem;
  }
`

const HeroBody = styled.p`
  font-size: 1.2rem;
  margin-bottom: 0;

  @media only screen and (max-width: 450px) {
    font-size: 1rem;
  }
`

const BackgroundAnimation = styled.canvas`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
`

const HomePage = () => {
  return (
    <SiteLayout small filePath="src/pages/index.js">
      <Hero>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <HeroTitle>
            <span style={{ position: 'relative' }}>
              I build & explain web things.
            </span>
          </HeroTitle>
          <HeroGreeting>Hello, my name is Christoph</HeroGreeting>
          <HeroBody>
            I'm a software architect and team lead at{' '}
            <a
              href="https://dspace.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              dSPACE
            </a>
            , where i coach and mentor product teams to build web sites,
            applications and APIs. I also write about the web on my{' '}
            <Link to="/blog">Blog</Link> and on{' '}
            <a
              href="https://twitter.com/code_punkt"
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter
            </a>
            .
          </HeroBody>
        </div>
      </Hero>
    </SiteLayout>
  )
}

export default HomePage
