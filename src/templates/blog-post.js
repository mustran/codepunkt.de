import styled from '@emotion/styled'
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer'
import React from 'react'
import Meta from '../components/meta'
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
`

const PostMeta = styled.p`
  color: #888;
  margin-top: -1.4rem;
  font-size: 16px;

  @media only screen and (max-width: 667px) {
    font-size: 14px;
  }
`

const formatPostDate = (date, lang = 'en') =>
  typeof Date.prototype.toLocaleDateString === 'function'
    ? new Date(date).toLocaleDateString(lang, {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : date

const BlogPost = (props) => {
  const {
    pageContext: {
      body,
      frontmatter: { author, created, edited, title },
      timeToRead,
    },
    path,
  } = props

  const editLink = `https://github.com/codepunkt/codepunkt.de/edit/master/src/content${path}index.mdx`
  const discussLink = `https://mobile.twitter.com/search?q=${encodeURIComponent(
    `https://codepunkt.de${path}`
  )}`

  return (
    <SiteLayout>
      <Meta title={title} />
      <Article>
        <header>
          <h1>{title}</h1>
          <PostMeta>
            {formatPostDate(created)} • {timeToRead} min read
          </PostMeta>
        </header>
        <MDXRenderer>{body}</MDXRenderer>
        <footer>
          <p>
            <a href={discussLink} rel="noopener noreferrer" target="_blank">
              Discuss on Twitter
            </a>
            {` • `}
            <a href={editLink} rel="noopener noreferrer" target="_blank">
              Edit on GitHub
            </a>
          </p>
        </footer>
      </Article>
    </SiteLayout>
  )
}

export default BlogPost
