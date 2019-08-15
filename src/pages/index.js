import styled from '@emotion/styled'
import { Link } from 'gatsby'
import React, { useRef } from 'react'
import Meta from '../components/meta'
import SiteLayout from '../components/site-layout'
import fadeUpIn from '../style/animations/fade-up-in'
import useAnimation from '../utils/useAnimation'

const Hero = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1 0 auto;
  width: 100%;
  animation: ${fadeUpIn} 0.3s ease-out;
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
  opacity: 0;
  transition: opacity 1s linear;

  &.visible {
    opacity: 1;
  }
`

const HomePage = () => {
  const canvasRef = useRef(null)
  useAnimation(canvasRef)

  return (
    <SiteLayout small filePath="src/pages/index.js">
      <Meta title="Codepunkt" />
      <Hero>
        <BackgroundAnimation ref={canvasRef} />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <HeroTitle>
            <span>I build & explain web things.</span>
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
        </div>
      </Hero>
    </SiteLayout>
  )
}

export default HomePage
