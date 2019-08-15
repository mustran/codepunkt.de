import { css } from '@emotion/core'
import styled from '@emotion/styled'
import { graphql, Link } from 'gatsby'
import React from 'react'
import Meta from '../components/meta'
import PostMeta from '../components/post-meta'
import SiteLayout from '../components/site-layout'
import { formatPostDate } from '../utils'

const PaginationList = styled.ol`
  list-style-type: none;
  margin: 0;
  display: flex;
  justify-content: space-between;
`

const PaginationListItem = styled.li`
  padding: 0;
`

const Article = styled.article`
  margin-bottom: calc(1.72rem * 2);
`

const PM = styled(PostMeta)`
  margin-bottom: calc(1.72rem / 2);
`

const Content = styled.div`
  width: 100%;
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

  return (
    <SiteLayout small filePath="src/templates/blog-index.js">
      <Meta title="Blog — Codepunkt" />
      <Content>
        {nodes.map(
          ({
            frontmatter: { title, created, updated },
            id,
            timeToRead,
            excerpt,
            fields: { path },
          }) => {
            return (
              <Article key={id}>
                <header>
                  <Link to={path}>
                    <h2>
                      <span
                        css={css`
                          background: #d9e2ff;
                        `}
                      >
                        {title}
                      </span>
                    </h2>
                  </Link>
                  <PM>
                    {formatPostDate(updated)} • {timeToRead} min read
                  </PM>
                </header>
                <p>{excerpt}</p>
                <Link to={path}>View Article</Link>
              </Article>
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
      </Content>
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
