import styled from '@emotion/styled'
import React from 'react'
import Helmet from 'react-helmet'
import Layout from '../components/layout'

const Article = styled.article`
  padding: 0 100px;

  a[target='_blank'] span {
    position: absolute;
    left: -10000px;
    top: auto;
    width: 1px;
    height: 1px;
    overflow: hidden;
  }

  h1:hover,
  h2:hover,
  h3:hover,
  h4:hover,
  h5:hover,
  h6:hover {
    position: relative;

    > a {
      position: absolute;
      display: flex;
      left: -1.5rem;
      top: 0px;
      bottom: 0px;
      right: 0px;
      height: 100%;
      width: 1.5rem;
      background: url(/icons/link.svg) left center / 1rem no-repeat;
      background-repeat: no-repeat;
      background-position: left center;
    }
  }
`

const BlogPost = ({ children, pageContext }) => {
  const { title, author, date } = pageContext.frontmatter

  return (
    <Layout>
      <Helmet>
        <title>{title}</title>
      </Helmet>
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
