import styled from '@emotion/styled'
import { graphql, Link } from 'gatsby'
import React from 'react'
import Meta from '../components/meta'
import SiteLayout from '../components/site-layout'
import CalendarIcon from '../images/calendar.svg'
import CoffeeIcon from '../images/coffee.svg'
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

const Card = styled.article`
  margin-bottom: calc(1.72rem * 2);
`

const CardFooter = styled.footer`
  ul {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    margin: 0;
    font-size: 14px;
  }
  li {
    margin: 0;
    display: flex;
    align-items: center;
    white-space: nowrap;
    &:not(:last-child) {
      margin-right: 16px;
    }
  }
  svg {
    margin-right: 4px;
  }
`

const Content = styled.div`
  width: 100%;
`

const Icon = styled.svg`
  width: 20px;
  stroke: #448fea;
  stroke-width: 1;
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
              <Card key={id}>
                <Link to={path}>
                  <h2>{title}</h2>
                </Link>
                <p>{excerpt}</p>
                <CardFooter>
                  <ul>
                    <li>
                      <Icon as={CalendarIcon} />
                      {formatPostDate(updated)}
                    </li>
                    <li>
                      <Icon as={CoffeeIcon} />
                      {timeToRead} min read
                    </li>
                  </ul>
                </CardFooter>
              </Card>
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
        excerpt(pruneLength: 288)
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
