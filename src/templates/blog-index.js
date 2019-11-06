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

const preview = css`
  &:not(:last-child) {
    margin-bottom: 3.44rem;
  }
  p {
    margin-bottom: 0.86rem;
  }
  h3 {
    margin-bottom: 0.86rem;
  }
`

const isProduction = process.env.NODE_ENV === 'production'

const BlogIndex = (props) => {
  const {
    className,
    data: {
      allMdx: { nodes },
    },
    pageContext: {
      pageInfo: { hasPreviousPage, hasNextPage, currentPage },
    },
  } = props

  const articles = nodes.filter((node) =>
    isProduction ? !node.frontmatter.draft : true
  )

  return (
    <div className={className}>
      <Meta title="Articles — Codepunkt" />
      {articles.map((article) => {
        const {
          frontmatter: { draft, created, updated, title },
          id,
          excerpt,
          timeToRead,
          fields: { path },
        } = article
        return (
          <article className={preview} key={id}>
            <Link to={path}>
              <h3>{title}</h3>
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
      })}
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
