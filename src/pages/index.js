import styled from '@emotion/styled'
import { Link } from 'gatsby'
import React, { useEffect, useRef } from 'react'
import SiteLayout from '../components/site-layout'
import startAnimation from '../utils/startAnimation'

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
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: -1;
  top: 0;
  left: 0;
`

const HomePage = () => {
  const canvasEl = useRef(null)

  useEffect(() => {
    startAnimation(canvasEl.current)
    return () => {}
  }, [])

  return (
    <SiteLayout small>
      <BackgroundAnimation ref={canvasEl}></BackgroundAnimation>
      <Hero>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <HeroTitle>
            <span>I build & explain web things.</span>
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
