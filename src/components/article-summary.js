import { Link } from 'gatsby'
import { css } from 'linaria'
import React from 'react'
import CoffeeIcon from '../images/coffee.svg'
import FeatherIcon from '../images/feather.svg'
import colors from '../style/colors'
import { formatPostDate } from '../utils'

const styles = {
  article: css`
    margin: 3.44rem 0;
    &:first-of-type {
      margin-top: 1.72rem;
    }
  `,
  title: css`
    display: inline-block;
    font-size: 1.5rem;
    margin-bottom: 0.3rem;
    h2 {
      margin: 0;
      font-weight: 400;
      color: ${colors.light.linkSecondary};
      .dark-mode & {
        color: ${colors.dark.linkSecondary};
      }
    }
    &:hover,
    &:focus {
      box-shadow: none;
      h2 {
        color: ${colors.dark.link};
      }
    }
    .dark-mode &:hover,
    .dark-mode &:focus {
      box-shadow: none;
    }
  `,
  meta: css`
    color: #595959;
    margin: 0 0 0.43rem;
    .dark-mode & {
      color: #7f8ea3;
    }
  `,
  metaItem: css`
    display: inline-flex;
    align-items: center;
    margin: 0;
    color: ${colors.light.textSecondary};
    .dark-mode & {
      color: ${colors.dark.textSecondary};
    }
    &:not(:last-child)::after {
      content: '•';
      margin: 0 1ex;
      color: ${colors.light.textSecondary};
      .dark-mode & {
        color: ${colors.dark.textSecondary};
      }
    }
  `,
  metaIcon: css`
    margin-right: 0.43rem;
    stroke-width: 1;
    stroke: ${colors.light.textTertiary};
    .dark-mode & {
      stroke: ${colors.dark.textTertiary};
    }
  `,
  metaLink: css`
    box-shadow: none;
    .dark-mode & {
      box-shadow: none;
    }
  `,
  summary: css`
    margin-bottom: 0.86rem;
    span {
      font-size: 1rem;
      color: ${colors.light.textSecondary};
      .dark-mode & {
        color: ${colors.dark.textSecondary};
      }
    }
  `,
  date: css`
    font-family: Merriweather, 'Lucida Bright', 'Lucidabright', 'Lucida Serif',
      Lucida, 'DejaVu Serif', 'Bitstream Vera Serif', 'Liberation Serif',
      Georgia, serif;
  `,
  month: css`
    font-size: 85% !important;
    font-family: 'Open Sans';
  `,
}

const ArticleSummary = ({
  path,
  title,
  created,
  excerpt,
  timeToRead,
  commentCount = 2,
}) => {
  return (
    <article className={styles.article}>
      <Link to={path} className={styles.title}>
        <h2>{title}</h2>
      </Link>
      <ul className={styles.meta}>
        <li className={styles.metaItem}>
          <CoffeeIcon className={styles.metaIcon} />
          {timeToRead} min read
        </li>
        <li className={styles.metaItem}>
          <FeatherIcon className={styles.metaIcon} />
          <Link to="#" className={styles.metaLink}>
            {commentCount > 0 ? `${commentCount} comments` : 'Leave a comment'}
          </Link>
        </li>
      </ul>
      <p className={styles.summary}>
        <span
          dangerouslySetInnerHTML={{
            __html: formatPostDate(created)
              .split(' ')
              .map((part, i) => {
                return i === 0
                  ? `<span class="${styles.month}">${part.toUpperCase()}</span>`
                  : part
              })
              .join(' '),
          }}
          className={styles.date}
        ></span>{' '}
        — {excerpt}
      </p>
      {/* <Link to={path} className={styles.readMore}>
                Read More...
              </Link> */}
    </article>
  )
}

export default ArticleSummary
