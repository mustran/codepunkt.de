import { Link } from 'gatsby'
import { css, cx } from 'linaria'
import React from 'react'
import Meta from '../components/meta'

/**
 * TODOS
 *
 * - use tags
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
    background: #e7ceff;
    color: #15202b;
  }
`

const greeting = css`
  order: -1;
  margin-bottom: 0.86rem;
  font-size: 4.2vmin;
  font-weight: 400;
  color: #595959;

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
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 100%;
      z-index: -1;
      background-image: linear-gradient(
        transparent 0%,
        transparent 55%,
        #f0f0f0 55%,
        #f0f0f0 85%,
        transparent 85%,
        transparent 100%
      );
      transform-origin: center right;
      transform: scaleX(1);
      transition: transform 0.3s cubic-bezier(0.86, 0, 0.07, 1);
    }

    &:hover::before,
    &:focus::before {
      transform: scaleX(0);
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
        transparent 0%,
        transparent 55%,
        #2f3f50 55%,
        #2f3f50 85%,
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

const HomePage = ({ className }) => {
  return (
    <article className={cx(className, hero)}>
      <Meta title="Codepunkt" />
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
          open web on my <Link to="/writing">Blog</Link> and on{' '}
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
          <Link to="/writing">Blog</Link> and on{' '}
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
