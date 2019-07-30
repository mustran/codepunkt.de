import styled from '@emotion/styled'
import { Link } from 'gatsby'
import React from 'react'
import SiteLayout from '../components/site-layout'
import Meta from '../components/meta'

const PaginationList = styled.ol`
  list-style-type: none;
  margin: 0;
  display: flex;
  justify-content: space-between;
`

const PaginationListItem = styled.li`
  padding: 0;
`

const BlogIndex = ({ pageContext }) => {
  const {
    nodes,
    pageInfo: { hasPreviousPage, hasNextPage, currentPage },
  } = pageContext

  return (
    <SiteLayout>
      <Meta title="Blog" />

      {nodes.map(
        ({ frontmatter: { title, author }, id, excerpt, fields: { path } }) => {
          return (
            <div key={id}>
              <header>
                <div>{title}</div>
                <div>Posting By {author}</div>
              </header>
              <p>{excerpt}</p>
              <Link to={path}>View Article</Link>
              <hr />
            </div>
          )
        }
      )}
      <nav aria-label="pagination">
        <PaginationList>
          {hasPreviousPage && (
            <PaginationListItem>
              <Link
                to={currentPage === 2 ? '/blog' : `/blog/${currentPage - 1}`}
              >
                Newer Posts
              </Link>
            </PaginationListItem>
          )}
          {hasNextPage && (
            <PaginationListItem>
              <Link to={`/blog/${currentPage + 1}`}>Older Posts</Link>
            </PaginationListItem>
          )}
        </PaginationList>
      </nav>
    </SiteLayout>
  )
}

export default BlogIndex
