import styled from '@emotion/styled'
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer'
import React from 'react'
import Layout from '../components/layout'
import Meta from '../components/meta'
import {
  codeStyles,
  headingStyles,
  linkStyles,
  quoteStyles,
  twitterStyles,
} from '../style'

const Article = styled.article`
  ${codeStyles}
  ${headingStyles}
  ${linkStyles}
  ${quoteStyles}
  ${twitterStyles}
`

const BlogPost = (props) => {
  const {
    pageContext: {
      body,
      frontmatter: { title, author, created, edited },
      timeToRead,
    },
  } = props

  return (
    <Layout>
      <Meta title={title} />
      <Article>
        <header>
          <h1>{title}</h1>
          <span>Author: {author}</span>
          <time>Created: {created}</time>
          <time>Edited: {edited}</time>
          <time>Time to read: {timeToRead} minutes</time>
        </header>
        <MDXRenderer>{body}</MDXRenderer>
      </Article>
    </Layout>
  )
}

export default BlogPost
