import React from 'react'
import Helmet from 'react-helmet'
import Layout from '../components/layout'

const BlogPost = ({ children, pageContext }) => {
  const { title, author, date } = pageContext.frontmatter

  return (
    <Layout>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <article>
        <header>
          <h1>{title}</h1>
          <span>Author: {author}</span>
          <time>Date: {date}</time>
        </header>
        {children}
      </article>
    </Layout>
  )
}

export default BlogPost
