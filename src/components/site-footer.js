import { Link } from 'gatsby'
import { css, cx } from 'linaria'
import React from 'react'
import TwitterIcon from '../images/twitter.svg'

const footer = css`
  height: 3.5rem;
  margin-top: 2.5rem;

  a {
    color: #999 !important;

    &:hover {
      color: #4b4237 !important;
    }
    .dark-mode & {
      color: #7f8ea3 !important;
    }
    .dark-mode &:hover {
      color: #aaa !important;
    }
  }
`

const footerAnimate = css`
  @keyframes animateHeader {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  opacity: 0;
  animation: animateHeader 0.4s ease-out forwards;
  animation-delay: 1.8s;
`

const container = css`
  max-width: 768px;
  margin: 0 auto;
  width: 90%;
  height: 100%;
  display: flex;
  justify-content: space-between;
`

const copyright = css`
  display: flex;
  align-items: center;
`

const social = css`
  display: flex;
  align-items: center;
`

const socialLink = css`
  display: flex;
  align-items: center;

  svg {
    margin-right: 8px;
    stroke-width: 1.2;
  }
  &:hover svg {
    stroke: #1da1f2;
  }
`

const icon = css`
  width: 20px;
  stroke: #448fea;
  stroke-width: 1;
`

const SiteFooter = ({ path }) => {
  const isHomePage = path === '/animate'

  return (
    <footer className={cx(footer, isHomePage && footerAnimate)}>
      <div className={container}>
        <div className={copyright}>
          <Link to="/legal">Legal Notice</Link>
        </div>
        <div className={social}>
          <a
            href="https://twitter.com/code_punkt"
            className={`h-card ${socialLink}`}
            rel="me"
          >
            <TwitterIcon /> Follow me on Twitter
          </a>
        </div>
      </div>
    </footer>
  )
}

export default SiteFooter
