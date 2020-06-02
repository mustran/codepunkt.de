import loadable from '@loadable/component'
import { Link } from 'gatsby'
import { css, cx } from 'linaria'
import React from 'react'
import Meta from '../components/meta'
import colors from '../style/colors'

const hero = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1 0 auto;
`

const body = css`
  @keyframes animateGreeting {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  animation: animateGreeting 0.4s linear forwards;
  animation-delay: 1.5s;

  opacity: 0;
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

const greeting = css`
  @keyframes animateGreeting {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  font-family: 'Josefin Sans';
  font-size: 5vw;
  margin: 0 0 -8px 0;
  opacity: 0;
  animation: animateGreeting 0.4s linear forwards;
  animation-delay: 1.4s;

  @media only screen and (min-width: 668px) {
    font-size: 33.35px;
  }

  color: ${colors.light.textSecondary};
  .dark-mode & {
    color: ${colors.dark.textSecondary};
  }
`

const name = css`
  @keyframes animateName {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(0.7);
    }
  }
  @keyframes animateNameDesktop {
    0% {
      font-size: 66.7px;
    }
    100% {
      font-size: 46.76px;
    }
  }

  font-size: 10vw;
  font-family: 'Josefin Sans';
  font-weight: 700;
  white-space: nowrap;
  display: inline;
  margin-bottom: 0.86rem;
  transform-origin: left center;

  animation: animateName 0.4s ease-out forwards;
  animation-delay: 1.2s;
  @media only screen and (min-width: 668px) {
    font-size: 60.12px;
    animation-name: animateNameDesktop;
  }

  @keyframes even {
    0% {
      opacity: 0;
      transform: translateY(-300px);
      transform: translateY(var(--animation-start-y));
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes odd {
    0% {
      opacity: 0;
      transform: translateY(300px);
      transform: translateY(var(--animation-start-y));
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  > span {
    display: inline-block;
    opacity: 0;
    animation: even 300ms ease-out forwards;

    &:nth-child(even) {
      animation-name: even;
    }
    &:nth-child(odd) {
      animation-name: odd;
    }
    &:nth-child(1) {
      animation-delay: 0ms;
    }
    &:nth-child(2) {
      animation-delay: 50ms;
    }
    &:nth-child(3) {
      animation-delay: 100ms;
    }
    &:nth-child(4) {
      animation-delay: 150ms;
    }
    &:nth-child(5) {
      animation-delay: 200ms;
    }
    &:nth-child(6) {
      animation-delay: 250ms;
    }
    &:nth-child(7) {
      animation-delay: 300ms;
    }
    &:nth-child(8) {
      animation-delay: 350ms;
    }
    &:nth-child(9) {
      animation-delay: 400ms;
    }
    &:nth-child(10) {
      animation-delay: 450ms;
    }
    &:nth-child(11) {
      animation-delay: 500ms;
    }
    &:nth-child(12) {
      animation-delay: 550ms;
    }
    &:nth-child(13) {
      animation-delay: 600ms;
    }
    &:nth-child(14) {
      animation-delay: 650ms;
    }
    &:nth-child(15) {
      animation-delay: 700ms;
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

const random = (min, max) => Math.floor(Math.random() * (max - min)) + min

const HomePage = ({ className }) => {
  return (
    <article className={cx(className, hero)}>
      <Meta title="Codepunkt" />
      <div className={content}>
        <p className={greeting}>Hey, my name is</p>
        <h2 aria-label="Christoph Werner" className={name}>
          <span
            aria-hidden="true"
            style={{ '--animation-start-y': `${random(150, 350)}px` }}
          >
            C
          </span>
          <span
            aria-hidden="true"
            style={{ '--animation-start-y': `${random(-300, 300)}px` }}
          >
            h
          </span>
          <span
            aria-hidden="true"
            style={{ '--animation-start-y': `${random(150, 350)}px` }}
          >
            r
          </span>
          <span
            aria-hidden="true"
            style={{ '--animation-start-y': `${random(-300, 300)}px` }}
          >
            i
          </span>
          <span
            aria-hidden="true"
            style={{ '--animation-start-y': `${random(150, 350)}px` }}
          >
            s
          </span>
          <span
            aria-hidden="true"
            style={{ '--animation-start-y': `${random(-300, 300)}px` }}
          >
            t
          </span>
          <span
            aria-hidden="true"
            style={{ '--animation-start-y': `${random(150, 350)}px` }}
          >
            o
          </span>
          <span
            aria-hidden="true"
            style={{ '--animation-start-y': `${random(-300, 300)}px` }}
          >
            p
          </span>
          <span
            aria-hidden="true"
            style={{ '--animation-start-y': `${random(150, 350)}px` }}
          >
            h
          </span>{' '}
          <span
            aria-hidden="true"
            style={{ '--animation-start-y': `${random(-300, 300)}px` }}
          >
            W
          </span>
          <span
            aria-hidden="true"
            style={{ '--animation-start-y': `${random(150, 350)}px` }}
          >
            e
          </span>
          <span
            aria-hidden="true"
            style={{ '--animation-start-y': `${random(-300, 300)}px` }}
          >
            r
          </span>
          <span
            aria-hidden="true"
            style={{ '--animation-start-y': `${random(150, 350)}px` }}
          >
            n
          </span>
          <span
            aria-hidden="true"
            style={{ '--animation-start-y': `${random(-300, 300)}px` }}
          >
            e
          </span>
          <span
            aria-hidden="true"
            style={{ '--animation-start-y': `${random(150, 350)}px` }}
          >
            r
          </span>
        </h2>
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
        </p>
      </div>
    </article>
  )
}

export default HomePage
