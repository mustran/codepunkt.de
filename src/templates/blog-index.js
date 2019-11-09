import { graphql, Link } from 'gatsby'
import { css } from 'linaria'
import React from 'react'
import Meta from '../components/meta'
import PostMeta from '../components/post-meta'

const pagination = css`
  list-style-type: none;
  margin: 0;
  display: flex;
  justify-content: space-between;
`

const paginationItem = css`
  padding: 0;
`

const article = css`
  &:not(:last-child) {
    margin: 3.44rem 0;
  }
  a {
    display: inline-block;
  }
  p {
    margin: 0.86rem 0;
  }
  h3 {
    margin-bottom: 0;
    .dark-mode & {
      color: #90baff;
    }
  }
`

const headline = css`
  transform: rotate(-1deg);

  span {
    background: #e0f0fb;
    .dark-mode & {
      background: #44568c;
    }
  }
`

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
      <h1 className={headline}>
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
          return (
            <article className={article} key={id}>
              <Link to={path}>
                <h3>
                  <span className={css``}>{title}</span>
                </h3>
              </Link>
              <p>{excerpt}</p>
              <PostMeta
                draft={draft}
                created={created}
                updated={updated}
                timeToRead={timeToRead}
              />
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
                  currentPage === 2 ? '/article' : `/article/${currentPage - 1}`
                }
              >
                Newer Posts
              </Link>
            </li>
          )}
          {hasNextPage && (
            <li className={paginationItem}>
              <Link to={`/article/${currentPage + 1}`}>Older Posts</Link>
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
        excerpt(pruneLength: 144)
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
