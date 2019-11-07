import loadable from '@loadable/component'
import { Link } from 'gatsby'
import { css, cx } from 'linaria'
import React from 'react'
import Meta from '../components/meta'

/**
 * TODOS
 *
 * - useBreakpoint hook to stop transition animation when hamburger menu exists
 */

const hero = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1 0 auto;
`

const title = css`
  margin-bottom: 0.86rem;
  font-size: 10vw;

  span {
    background: #efe0fb;
  }

  @media only screen and (min-width: 668px) {
    font-size: 66.7px;
  }
`

const greeting = css`
  order: -1;
  margin-bottom: 0.86rem;
  font-size: 5.3vw;
  font-weight: 300;

  span {
    font-weight: 400;
  }

  @media only screen and (min-width: 668px) {
    font-size: 35.351px;
  }
`

const body = css`
  margin-bottom: 0;
  font-weight: 400;
  font-size: 4.6vw;

  @media only screen and (min-width: 500px) {
    font-weight: 300;
  }

  @media only screen and (min-width: 668px) {
    font-size: 30.682px;
  }

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
      transition: transform 0.3s cubic-bezier(0.86, 0, 0.07, 1);
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
`

const content = css`
  display: flex;
  flex-direction: column;
`

const BackgroundAnimation = loadable(() =>
  import('../components/background-animation')
)

const HomePage = ({ className }) => {
  return (
    <article className={cx(className, hero)}>
      <Meta title="Codepunkt" />
      <BackgroundAnimation />
      <div className={content}>
        <h1 className={title}>
          <span>I build & teach web technology.</span>
        </h1>
        <p className={greeting}>
          Hello, my name is <span>Christoph</span>
        </p>
        <p className={body}>
          I'm a software architect at{' '}
          <a
            href="https://dspace.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            dSPACE
          </a>
          , where i coach and mentor teams that build web applications. I also
          write about web development on my <Link to="/articles">Blog</Link> and
          on{' '}
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
    </article>
  )
}

export default HomePage
