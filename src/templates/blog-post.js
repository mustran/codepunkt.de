import styled from '@emotion/styled'
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer'
import React from 'react'
import Layout from '../components/layout'
import Meta from '../components/meta'
import externalLinks from '../style/externalLinks'
import headingLinks from '../style/headingLinks'
import syntaxHighlighting from '../style/syntaxHighlighting'

const Article = styled.article`
  ${syntaxHighlighting}
  ${externalLinks}
  ${headingLinks}
`

const BlogPost = (props) => {
  console.log(props)
  const { children, pageContext } = props
  const { title, author, created, edited } = pageContext.frontmatter

  return (
    <Layout>
      <Meta title={title} />
      <Article>
        <header>
          <h1>{title}</h1>
          <span>Author: {author}</span>
          <time>Created: {created}</time>
          <time>Edited: {edited}</time>
          <time>Time to read: {pageContext.timeToRead} minutes</time>
        </header>
        <MDXRenderer>{pageContext.body}</MDXRenderer>
      </Article>
    </Layout>
  )
}

export default BlogPost
