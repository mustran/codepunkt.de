import { graphql, Link } from 'gatsby'
import { css } from 'linaria'
import React from 'react'
import ArticleSummary from '../components/article-summary'
import Meta from '../components/meta'
import colors from '../style/colors'

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
    margin-bottom: 2.58rem;
    span {
      color: ${colors.light.headlineGreen};
      .dark-mode & {
        color: ${colors.dark.headlineGreen};
      }
    }
  `,
  subheadline: css`
    margin-bottom: -12px;
    font-weight: 400;
    text-transform: uppercase;
    color: #595959;
    .dark-mode & {
      color: #9babc1;
    }
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
      <h4 className={styles.subheadline}>The amazing</h4>
      <h1 className={styles.headline}>
        <span>Recent articles</span>
      </h1>
      {articles.map(
        ({
          frontmatter: { draft, created, updated, title },
          id,
          excerpt,
          timeToRead,
          fields: { path },
        }) => {
          return (
            <ArticleSummary
              key={id}
              path={path}
              title={title}
              excerpt={excerpt}
              timeToRead={timeToRead}
              created={created}
              commentCount={2}
            />
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
