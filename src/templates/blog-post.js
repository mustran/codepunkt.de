import styled from '@emotion/styled'
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

const BlogPost = ({ children, pageContext }) => {
  const { title, author, date } = pageContext.frontmatter

  return (
    <Layout>
      <Meta title={title} />
      <Article>
        <header>
          <h1>{title}</h1>
          <span>Author: {author}</span>
          <time>Date: {date}</time>
        </header>
        {children}
      </Article>
    </Layout>
  )
}

export default BlogPost
