import { css } from '@emotion/core'
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
import { formatPostDate } from '../utils'

const Article = styled.article`
  ${codeStyle}
  ${headingStyle}
  ${linkStyle}
  ${quoteStyle}
  ${twitterStyle}
  width: 100%;
`

const BlogPost = (props) => {
  const {
    path,
    data: {
      mdx: {
        body,
        frontmatter: { author, created, updated, title },
        timeToRead,
      },
    },
  } = props

  const discussLink = `https://mobile.twitter.com/search?q=${encodeURIComponent(
    `https://codepunkt.de${path}`
  )}`

  return (
    <SiteLayout small filePath={`src/content${path}index.mdx`}>
      <Meta title={title} />
      <Article>
        <header>
          <h1>
            <span
              css={css`
                /* background: #d9e2ff; */
                background-image: linear-gradient(
                  transparent calc(100% - 16px),
                  #d9e2ff 16px
                );
              `}
            >
              {title}
            </span>
          </h1>
          <PostMeta>
            {formatPostDate(updated)} • {timeToRead} min read
          </PostMeta>
        </header>
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
  query mdxPostDetails($id: String) {
    mdx(id: { eq: $id }) {
      body
      frontmatter {
        title
        author
        created
        updated
      }
      timeToRead
    }
  }
`
