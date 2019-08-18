import styled from '@emotion/styled'
import loadable from '@loadable/component'
import { Link } from 'gatsby'
import React from 'react'
import Meta from '../components/meta'
import SiteLayout from '../components/site-layout'

const Hero = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1 0 auto;
  width: 100%;
`

const HeroTitle = styled.h1`
  margin-bottom: 1rem;
  font-size: 3.5rem;

  span {
    background: #efe0fb;
  }

  @media only screen and (max-width: 450px) {
    font-size: 2.3rem;
  }
`

const HeroGreeting = styled.p`
  order: -1;
  margin-bottom: 1rem;
  font-size: 1.2rem;

  @media only screen and (max-width: 450px) {
    font-size: 1rem;
  }
`

const HeroBody = styled.p`
  font-size: 1.2rem;
  margin-bottom: 0;

  a {
    position: relative;
    box-shadow: none;
    color: #333;
    &::before,
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      z-index: -1;
    }
    &::before {
      width: 100%;
      background-image: linear-gradient(transparent calc(50%), #ddd 50%);
    }
    &::after {
      width: 0%;
      transition: width 0.1s ease-in;
      background-image: linear-gradient(transparent calc(50%), #d7f0d0 50%);
    }
    &:hover::after {
      width: 100%;
    }
  }

  @media only screen and (max-width: 450px) {
    font-size: 1rem;
  }
`

const HeroContent = styled.div`
  display: flex;
  flex-direction: column;
`

const BackgroundAnimation = loadable(() =>
  import('../components/background-animation')
)

const HomePage = () => {
  return (
    <SiteLayout small filePath="src/pages/index.js">
      <Meta title="Codepunkt" />
      <Hero>
        <BackgroundAnimation />
        <HeroContent>
          <HeroTitle>
            <span>I build & teach web technology.</span>
          </HeroTitle>
          <HeroGreeting>
            <span>Hello, my name is Christoph</span>
          </HeroGreeting>
          <HeroBody>
            I'm a software architect and team lead at{' '}
            <a
              href="https://dspace.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              dSPACE
            </a>
            , where i coach and mentor product teams to build web applications.
            I also write about web development on my{' '}
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
        </HeroContent>
      </Hero>
    </SiteLayout>
  )
}

export default HomePage
