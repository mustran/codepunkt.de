import { css, cx } from 'linaria'
import React from 'react'
import Meta from '../components/meta'
import NotFoundIllustration from '../images/notfound.svg'

const headline = css`
  transform: rotate(-1deg);

  span {
    background: #fbe0e0;
    .dark-mode & {
      background: #902c2c;
    }
  }
`

const illustration = css`
  width: 100%;
  height: auto;
  margin: 16px 0;

  .page {
    fill: #fbe0e0;
  }
  .floor {
    fill: #d8d8d8;
  }
  .tree {
    fill: #bcd4c2;
  }
  .wood {
    fill: #672807;
  }
  .bush {
    fill: #5a7962;
  }
  .helmet {
    fill: #696f6a;
  }
`

const hero = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1 0 auto;
`

const introduction = css`
  margin-bottom: 0;
  font-size: 4.6vmin;

  @media only screen and (min-width: 500px) {
    font-weight: 300;
  }

  @media only screen and (min-width: 668px) {
    font-size: 30.682px;
  }

  .dark-mode & {
    color: #9aa2ab;
  }
`

const NotFoundPage = ({ className }) => (
  <article className={cx(className, hero)}>
    <Meta title="Not found — Codepunkt" />
    <h1 className={headline}>
      <span>Not found</span>
    </h1>
    <NotFoundIllustration className={illustration} />
    <p className={introduction}>
      We couldn't find the page you requested. Maybe it is just scared and
      keeping a low profile!
    </p>
  </article>
)

export default NotFoundPage
