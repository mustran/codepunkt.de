import { Link } from 'gatsby'
import { css } from 'linaria'
import React from 'react'
import BookmarkIcon from '../images/bookmark.svg'

const footer = css`
  padding: 1rem 0;
  margin-top: 2.5rem;
  border-top: 1px solid #ddd;
  background: #fbfbfb;

  a {
    color: #999 !important;
    box-shadow: none !important;

    &:hover {
      color: #4b4237 !important;
    }
  }

  @media only screen and (max-width: 450px) {
    margin-top: calc(1.72rem * 1.5);
  }
`

const container = css`
  max-width: 768px;
  margin: 0 auto;
  width: 90%;
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

  @media only screen and (max-width: 450px) {
    span {
      display: none;
    }
  }
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
