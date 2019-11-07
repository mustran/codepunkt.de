import { Link } from 'gatsby'
import { css } from 'linaria'
import React from 'react'
import BookmarkIcon from '../images/bookmark.svg'

const footer = css`
  height: 3.5rem;
  margin-top: 2.5rem;

  a {
    color: #999 !important;
    box-shadow: none !important;

    &:hover {
      color: #4b4237 !important;
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
  margin-right: -8px;
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
          <a
            className={externalLink}
            href="https://github.com/codepunkt"
            target="_blank"
            rel="noopener noreferrer"
          >
            <BookmarkIcon className={icon} />
            <span className={iconText}>RSS</span>
          </a>
        </div>
      </div>
    </footer>
  )
}

export default SiteFooter
