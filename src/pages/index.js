import loadable from '@loadable/component'
import { Link } from 'gatsby'
import { css, cx } from 'linaria'
import React from 'react'
import Meta from '../components/meta'

/**
 * TODOS
 *
 * - fix animations when scrolled down
 * - work with article tags
 * - https://brettstevenson.io/
 * - remove IE from browserslist
 * - write gatsby plugin that adds browserslist regex
 * - actually make webmentions work
 */

const hero = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1 0 auto;
`

const title = css`
  margin-bottom: 0.86rem;
  font-size: 10vmin;
  transform: rotate(0.6deg);
  @media only screen and (min-width: 668px) {
    font-size: 66.7px;
  }

  span {
    background: #efe0fb;
  }

  .dark-mode & span {
    background: #f8caff;
    color: #15202b;
  }
`

const greeting = css`
  order: -1;
  margin-bottom: 0.86rem;
  font-size: 4.2vmin;
  font-weight: 400;
  color: #757575;

  @media only screen and (min-width: 500px) {
    font-weight: 300;
  }

  .dark-mode & {
    color: #7f8ea3;
    span {
      color: #c8d5e0;
    }
  }

  span {
    font-weight: 400;
    color: #000;
  }

  @media only screen and (min-width: 668px) {
    font-size: 27.94px;
  }
`

const body = css`
  margin-bottom: 0;
  font-weight: 400;
  font-size: 4.6vmin;

  @media only screen and (min-width: 500px) {
    font-weight: 300;
  }

  @media only screen and (min-width: 668px) {
    font-size: 30.682px;
  }

  a {
    position: relative;
    box-shadow: none;
    display: inline-block;
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
      background-image: linear-gradient(
        transparent 55%,
        #f0f0f0 55%,
        #f0f0f0 85%,
        transparent 85%
      );
    }
    &::after {
      transform-origin: 0 50%;
      transform: scaleX(0);
      transition: transform 0.3s cubic-bezier(0.86, 0, 0.07, 1);
    }
    &:nth-of-type(1)::after {
      background-image: linear-gradient(
        transparent 55%,
        #ffd2d2 55%,
        #ffd2d2 85%,
        transparent 85%,
        transparent 100%
      );
    }
    &:nth-of-type(2)::after {
      background-image: linear-gradient(
        transparent 55%,
        #b4fccd 55%,
        #b4fccd 85%,
        transparent 85%,
        transparent 100%
      );
    }
    &:nth-of-type(3)::after {
      background-image: linear-gradient(
        transparent 55%,
        #a6ddff 55%,
        #a6ddff 85%,
        transparent 85%,
        transparent 100%
      );
    }
    &:nth-of-type(4)::after {
      background-image: linear-gradient(
        transparent 55%,
        #a6ddff 55%,
        #a6ddff 85%,
        transparent 85%,
        transparent 100%
      );
    }
    &:hover::after,
    &:focus::after {
      transform: scaleX(1);
    }
    &:hover {
      box-shadow: none !important;
    }
  }

  .dark-mode & {
    color: #cbd5e0;
  }
  .dark-mode & a {
    &::before {
      background-image: linear-gradient(
        transparent 55%,
        #2f3f50 55%,
        #2f3f50 85%,
        transparent 85%,
        transparent 100%
      );
    }
    &:nth-of-type(1)::after {
      background-image: linear-gradient(
        transparent 55%,
        #582c2c 55%,
        #582c2c 85%,
        transparent 85%,
        transparent 100%
      );
    }
    &:nth-of-type(2)::after {
      background-image: linear-gradient(
        transparent 55%,
        #316537 55%,
        #316537 85%,
        transparent 85%,
        transparent 100%
      );
    }
    &:nth-of-type(3)::after {
      background-image: linear-gradient(
        transparent 55%,
        #154a6b 55%,
        #154a6b 85%,
        transparent 85%,
        transparent 100%
      );
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
          </a>{' '}
          and the founder of{' '}
          <a
            href="https://paderbornjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Paderborn.js
          </a>
          . I also write about software development, cloud technology and the
          open web on my <Link to="/articles">Blog</Link> and on{' '}
          <a
            href="https://twitter.com/code_punkt"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </a>
          .
          {/* I'm a software architect at{' '}
          <a
            href="https://dspace.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            dSPACE
          </a>
          , where i coach and empower teams that build web and cloud-native
          applications. I also write about development on my{' '}
          <Link to="/articles">Blog</Link> and on{' '}
          <a
            href="https://twitter.com/code_punkt"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </a>
          . */}
        </p>
      </div>
    </article>
  )
}

export default HomePage
