import { Link } from 'gatsby'
import { css } from 'linaria'
import React from 'react'

const footer = css`
  height: 3.5rem;
  margin-top: 2.5rem;

  a {
    color: #999 !important;
    box-shadow: none !important;

    &:hover {
      color: #4b4237 !important;
    }
    .dark-mode & {
      color: #777 !important;
    }
    .dark-mode &:hover {
      color: #aaa !important;
    }
  }
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

const iconText = css`
  margin-left: 4px;
`

const externalLink = css`
  display: flex;
  align-items: center;
  box-shadow: none;
  margin: 0 8px;

  &:hover svg {
    stroke: #ff8009;
  }
`

const icon = css`
  width: 20px;
  stroke: #448fea;
  stroke-width: 1;
`

const SiteFooter = () => {
  return (
    <footer className={footer}>
      <div className={container}>
        <div className={copyright}>
          <Link to="/legal">Legal Notice</Link>
        </div>
        <div className={social}>
          <a href="https://twitter.com/code_punkt" className="h-card" rel="me">
            Twitter
          </a>
        </div>
      </div>
    </footer>
  )
}

export default SiteFooter
