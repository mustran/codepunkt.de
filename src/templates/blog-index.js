import styled from '@emotion/styled'
import { graphql, Link } from 'gatsby'
import React from 'react'
import Meta from '../components/meta'
import SiteLayout from '../components/site-layout'

const PaginationList = styled.ol`
  list-style-type: none;
  margin: 0;
  display: flex;
  justify-content: space-between;
`

const PaginationListItem = styled.li`
  padding: 0;
`

const BlogIndex = (props) => {
  const {
    data: {
      allMdx: { nodes },
    },
    pageContext: {
      pageInfo: { hasPreviousPage, hasNextPage, currentPage },
    },
  } = props

  console.log(props)

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

export const query = graphql`
  query mdxPostList($ids: [String]) {
    allMdx(filter: { id: { in: $ids } }) {
      nodes {
        body
        excerpt
        fields {
          path
        }
        frontmatter {
          author
          created
          title
          updated
        }
        id
        timeToRead
      }
    }
  }
`
