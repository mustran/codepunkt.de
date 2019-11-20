import { graphql, Link } from 'gatsby'
import { css } from 'linaria'
import React from 'react'
import Meta from '../components/meta'
import CoffeeIcon from '../images/coffee.svg'
import FeatherIcon from '../images/feather.svg'
import { formatPostDate } from '../utils'

const pagination = css`
  list-style-type: none;
  margin: 0;
  display: flex;
  justify-content: space-between;
`

const paginationItem = css`
  padding: 0;
`

const styles = {
  headline: css`
    transform: rotate(-1deg);
    margin-bottom: 2.58rem;
    span {
      background: #d8efd0;
      .dark-mode & {
        background: #b9d78e;
        color: #15202b;
      }
    }
  `,
  readMore: css``,
  post: css`
    margin: 3.44rem 0;
    &:first-of-type {
      margin-top: 1.72rem;
    }
  `,
  postTitle: css`
    color: #7285a3;
    display: block;
    font-size: 1.5rem;
    margin-bottom: 0.43rem;
    h2 {
      margin: 0;
    }
    .dark-mode & h2 {
      color: #a3c0f0;
    }
    &:hover,
    &:focus {
      box-shadow: none;
      h2 {
        color: #77a2e9;
      }
    }
    .dark-mode &:hover,
    .dark-mode &:focus {
      box-shadow: none;
    }
  `,
  postMeta: css`
    color: #757575;
    margin: 0 0 0.43rem;
    .dark-mode & {
      color: #7f8ea3;
    }
  `,
  postMetaItem: css`
    display: inline-flex;
    align-items: center;
    margin: 0 1.72rem 0 0;
  `,
  postMetaIcon: css`
    margin-right: 0.43rem;
    stroke: #aaa;
    stroke-width: 1;
    .dark-mode & {
      stroke: #3f576f;
    }
  `,
  postMetaLink: css`
    color: currentColor;
    box-shadow: none;
    .dark-mode & {
      color: currentColor;
      box-shadow: none;
    }
  `,
  postSummary: css`
    margin-bottom: 0.86rem;
    span {
      color: #757575;
      font-size: 1rem;
      .dark-mode & {
        color: #7f8ea3;
      }
    }
  `,
  date: css`
    font-family: Merriweather, 'Lucida Bright', 'Lucidabright', 'Lucida Serif',
      Lucida, 'DejaVu Serif', 'Bitstream Vera Serif', 'Liberation Serif',
      Georgia, serif;
  `,
  month: css`
    font-size: 75% !important;
  `,
}

const BlogIndex = (props) => {
  const {
    className,
    data: {
      allMdx: { nodes: articles },
    },
    pageContext: {
      pageInfo: { hasPreviousPage, hasNextPage, currentPage },
    },
  } = props

  return (
    <div className={className}>
      <Meta title="Articles — Codepunkt" />
      <h1 className={styles.headline}>
        <span>Articles</span>
      </h1>
      {articles.map(
        ({
          frontmatter: { draft, created, updated, title },
          id,
          excerpt,
          timeToRead,
          fields: { path },
        }) => {
          const commentCount = 2

          return (
            <article className={styles.post} key={id}>
              <Link to={path} className={styles.postTitle}>
                <h2>{title}</h2>
              </Link>
              <ul className={styles.postMeta}>
                <li className={styles.postMetaItem}>
                  <CoffeeIcon className={styles.postMetaIcon} />
                  {timeToRead} min read
                </li>
                <li className={styles.postMetaItem}>
                  <FeatherIcon className={styles.postMetaIcon} />
                  <Link to="#" className={styles.postMetaLink}>
                    {commentCount > 0
                      ? `${commentCount} comments`
                      : 'Leave a comment'}
                  </Link>
                </li>
              </ul>
              <p className={styles.postSummary}>
                <span
                  dangerouslySetInnerHTML={{
                    __html: formatPostDate(created)
                      .split(' ')
                      .map((part, i) => {
                        return i === 0
                          ? `<span class="${
                              styles.month
                            }">${part.toUpperCase()}</span>`
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
      )}
      <nav aria-label="pagination">
        <ol className={pagination}>
          {hasPreviousPage && (
            <li className={paginationItem}>
              <Link
                to={
                  currentPage === 2
                    ? '/articles'
                    : `/articles/${currentPage - 1}`
                }
              >
                Newer Posts
              </Link>
            </li>
          )}
          {hasNextPage && (
            <li className={paginationItem}>
              <Link to={`/articles/${currentPage + 1}`}>Older Posts</Link>
            </li>
          )}
        </ol>
      </nav>
    </div>
  )
}

export default BlogIndex

export const query = graphql`
  query mdxPostList($ids: [String]) {
    allMdx(filter: { id: { in: $ids } }) {
      nodes {
        excerpt(pruneLength: 288)
        fields {
          path
        }
        frontmatter {
          author
          created
          title
          updated
          draft
        }
        id
        timeToRead
      }
    }
  }
`
