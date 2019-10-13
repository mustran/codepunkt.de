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
  margin-bottom: 0.86rem;
  font-size: 3.5rem;

  span {
    background: #efe0fb;
  }

  @media only screen and (max-width: 600px) {
    font-size: 2.6rem;
  }

  @media only screen and (max-width: 400px) {
    font-size: 2rem;
  }
`

const HeroGreeting = styled.p`
  order: -1;
  margin-bottom: 0.86rem;
  font-size: 1.5rem;
  text-transform: uppercase;

  @media only screen and (max-width: 600px) {
    font-size: 1.3rem;
  }

  @media only screen and (max-width: 400px) {
    font-size: 1rem;
  }
`

const HeroBody = styled.p`
  font-size: 1.7rem;
  margin-bottom: 0;
  font-weight: 300;

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
      right: 0;
      height: 100%;
      z-index: -1;
    }
    &::before {
      width: 100%;
      background-image: linear-gradient(transparent calc(65%), #eceeef 35%);
    }
    &::after {
      transform-origin: 0 50%;
      transform: scaleX(0);
      transition: transform .3s cubic-bezier(.86,0,.07,1);
    }
    &:nth-of-type(1)::after {
      background-image: linear-gradient(transparent calc(65%), #ffd2d2 35%);
    }
    &:nth-of-type(2)::after {
      background-image: linear-gradient(transparent calc(65%), #b4fccd 35%);
    }
    &:nth-of-type(3)::after {
      background-image: linear-gradient(transparent calc(65%), #a6ddff 35%);
    }
    &:hover::after {
      transform: scaleX(1);
    }
  }

  @media only screen and (max-width: 600px) {
    font-size: 1.2rem;
  }

  @media only screen and (max-width: 400px) {
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
            I'm a software architect at{' '}
            <a
              href="https://dspace.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              dSPACE
            </a>
            , where i coach and mentor teams that build web
            applications. I also write about web development on my{' '}
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
