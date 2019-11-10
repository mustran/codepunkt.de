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
    font-family: 'Open Sans', '-apple-system', BlinkMacSystemFont, 'Segoe UI',
      Roboto, 'Oxygen-Sans', Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
    margin-bottom: 0;
    .dark-mode & {
      color: #90baff;
    }
  }
`

const headline = css`
  transform: rotate(-1deg);

  span {
    background: #d8efd0;
    .dark-mode & {
      background: #39612c;
    }
  }
`

const introduction = css`
  color: #666;
  font-size: 1.2rem;

  .dark-mode & {
    color: #9aa2ab;
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
      <article className={introduction}>
        <p>
          Welcome to my Blog! I'm excited to share insights about software
          development, cloud technology and the open web.
        </p>
        <p>
          You can keep track of new articles by subscribing to my blog's{' '}
          <a href="rss.xml">RSS feed</a>.
        </p>
      </article>
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
                  <span>{title}</span>
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
