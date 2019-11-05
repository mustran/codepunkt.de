import styled from '@emotion/styled'
import { graphql } from 'gatsby'
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer'
import React from 'react'
import Meta from '../components/meta'
import PostMeta from '../components/post-meta'
import SiteLayout from '../components/site-layout'
import {
  codeStyle,
  headingStyle,
  linkStyle,
  quoteStyle,
  twitterStyle,
} from '../style'

const Article = styled.article`
  ${codeStyle}
  ${headingStyle}
  ${linkStyle}
  ${quoteStyle}
  ${twitterStyle}
  width: 100%;
  /* make heading links on small screens fit next to the
     heading content without wrapping */
  @media only screen and (max-width: 879px) {
    h1, h2, h3, h4, h5, h6 {
      margin-right: 40px;
    }
  }
`

const Header = styled.header`
  display: flex;
  flex-direction: column;
`

const Headline = styled.h1`
  margin-bottom: 0.43rem;
`

const baseUrl = 'https://github.com/codepunkt/codepunkt.de/edit/master'

const BlogPost = (props) => {
  const {
    path,
    pageContext: { permaLink },
    data: {
      mdx: {
        body,
        frontmatter: { draft, created, updated, title },
        timeToRead,
      },
      allWebMentionEntry: { edges: webmentions },
    },
  } = props

  console.log(webmentions)

  const discussLink = `https://mobile.twitter.com/search?q=${encodeURIComponent(
    permaLink
  )}`

  return (
    <SiteLayout small>
      <Meta title={title} />
      <Article>
        <Header>
          <Headline>
            {title}
            {/* eslint-disable-next-line jsx-a11y/anchor-has-content */}
            <a
              aria-label="Edit this page on GitHub"
              aria-hidden="true"
              title="Edit this page on GitHub"
              href={`${baseUrl}/src/content${path}index.mdx`}
            ></a>
          </Headline>
          <PostMeta
            as="p"
            draft={draft}
            created={created}
            updated={updated}
            timeToRead={timeToRead}
          />
        </Header>
        <MDXRenderer>{body}</MDXRenderer>
        <footer>
          <p>
            <a href={discussLink} rel="noopener noreferrer" target="_blank">
              Discuss on Twitter
            </a>
          </p>
        </footer>
      </Article>
    </SiteLayout>
  )
}

export default BlogPost

export const query = graphql`
  query mdxPostDetails($permaLink: String, $id: String) {
    mdx(id: { eq: $id }) {
      body
      frontmatter {
        title
        author
        created
        updated
        draft
      }
      timeToRead
    }
    allWebMentionEntry(filter: { wmTarget: { eq: $permaLink } }) {
      edges {
        node {
          wmTarget
          wmSource
          wmProperty
          wmId
          type
          url
          likeOf
          author {
            url
            type
            photo
            name
          }
          content {
            text
          }
        }
      }
    }
  }
`
