import styled from '@emotion/styled'
import { graphql, Link } from 'gatsby'
import React from 'react'
import Meta from '../components/meta'
import PostMeta from '../components/post-meta'
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

const ArticlePreview = styled.article`
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

const Content = styled.div`
  width: 100%;
`

const isProduction = process.env.NODE_ENV === 'production'

const BlogIndex = (props) => {
  const {
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
    <SiteLayout small>
      <Meta title="Articles — Codepunkt" />
      <Content>
        {articles.map((article) => {
          const {
            frontmatter: { draft, created, updated, title },
            id,
            excerpt,
            timeToRead,
            fields: { path },
          } = article
          return (
            <ArticlePreview key={id}>
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
            </ArticlePreview>
          )
        })}
        <nav aria-label="pagination">
          <PaginationList>
            {hasPreviousPage && (
              <PaginationListItem>
                <Link
                  to={
                    currentPage === 2
                      ? '/article'
                      : `/article/${currentPage - 1}`
                  }
                >
                  Newer Posts
                </Link>
              </PaginationListItem>
            )}
            {hasNextPage && (
              <PaginationListItem>
                <Link to={`/article/${currentPage + 1}`}>Older Posts</Link>
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
