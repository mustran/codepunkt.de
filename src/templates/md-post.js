import { graphql } from 'gatsby'
import React from 'react'
import Layout from '../components/layout'

export default function Template({
  data: {
    markdownRemark: { frontmatter, html },
  },
}) {
  return (
    <Layout>
      <div style={{ padding: '0 50px' }}>
        <header>
          <h1>{frontmatter.title}</h1>
          <span>Author: {frontmatter.author}</span>
          <time>Date: {frontmatter.date}</time>
        </header>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(fields: { slug: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        author
      }
    }
  }
`
