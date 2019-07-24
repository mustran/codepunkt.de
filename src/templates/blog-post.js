import styled from '@emotion/styled'
import React from 'react'
import Layout from '../components/layout'
import Meta from '../components/meta'

const Article = styled.article`
  padding: 0 100px;

  /* source code highlighting styles */
  .vscode-highlight {
    border-radius: 4px;

    .vscode-highlight-code {
      font-size: 1rem;
    }

    .vscode-highlight-line {
      border-left: 4px solid transparent;
    }

    .vscode-highlight-line-highlighted {
      border-left: 4px solid #5e7592;
      background-color: #2d3846;
    }

    @media (prefers-color-scheme: dark) {
    }
  }

  /* offscreen external link annotations for screenreaders */
  a[target='_blank'] span {
    position: absolute;
    left: -10000px;
    top: auto;
    width: 1px;
    height: 1px;
    overflow: hidden;
  }

  /* heading link styles */
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
