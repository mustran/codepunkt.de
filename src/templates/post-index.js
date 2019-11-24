import { graphql, Link } from 'gatsby'
import { css } from 'linaria'
import React from 'react'
import Meta from '../components/meta'
import CoffeeIcon from '../images/coffee.svg'
import FeatherIcon from '../images/feather.svg'
import colors from '../style/colors'
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
  readMore: css``,
  post: css`
    margin: 3.44rem 0;
    &:first-of-type {
      margin-top: 1.72rem;
    }
  `,
  postTitle: css`
    display: block;
    font-size: 1.5rem;
    margin-bottom: 0.43rem;
    h2 {
      margin: 0;
      color: ${colors.light.linkDark};
      .dark-mode & {
        color: ${colors.dark.linkDark};
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
  postMeta: css`
    color: #595959;
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
    box-shadow: none;
    .dark-mode & {
      box-shadow: none;
    }
  `,
  postSummary: css`
    margin-bottom: 0.86rem;
    span {
      color: #595959;
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
    font-size: 85% !important;
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
        fields {
          path
        }
        excerpt(pruneLength: 200)
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
