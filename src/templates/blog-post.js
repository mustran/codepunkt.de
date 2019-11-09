import { graphql } from 'gatsby'
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer'
import { css, cx } from 'linaria'
import React from 'react'
import Meta from '../components/meta'
import PostMeta from '../components/post-meta'

const article = css`
  /* quotes */
  blockquote {
    margin-left: 0;
    border-left: 5px solid #ddd;
    padding-left: 1.72rem;
    font-style: italic;

    @media only screen and (min-width: 880px) {
      margin-left: -1.72rem;
    }
  }

  /* Hide annotations for screenreaders on external link off screen. */
  a[target='_blank'] span {
    position: absolute;
    left: -10000px;
    top: auto;
    width: 1px;
    height: 1px;
    overflow: hidden;
  }

  /* syntax highlighted code */
  code:not(.vscode-highlight-code) {
    background: #f8f8f8;
    padding: 3px 5px;
    border-radius: 3px;
    color: #5c5e7b;
    font-family: 'Fira Mono', Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono',
      monospace;
  }
  .dark-mode & code:not(.vscode-highlight-code) {
    background: #0a1723;
    color: #bbb;
  }

  .vscode-highlight {
    border-radius: 4px;
    border: 1px solid #e5e5e5;
    counter-reset: line;
    background: #fdfdfd;

    .vscode-highlight-code {
      /* font-size: 16px; */
      font-family: 'Fira Mono', Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono',
        monospace;
      line-height: 1.65;
    }

    .vscode-highlight-line {
      &::before {
        counter-increment: line;
        content: counter(line);
        margin: 0 12px 0 -8px;
        user-select: none;
        color: #bbb;
        text-align: right;
        width: 20px;
        display: inline-block;
      }

      @media only screen and (min-width: 668px) {
        padding-left: 1em;
        padding-right: 1em;
        &::before {
          margin: 0 16px 0 -8px;
        }
      }

      .mtk7 {
        color: #2aa198;
      }
      .mtk9 {
        color: #b58900;
      }
      .mtk10 {
        color: #3374ff;
      }
    }

    .vscode-highlight-line-highlighted {
      background-color: #fffce1;
    }
  }
  .dark-mode & .vscode-highlight {
    background: #0a1723;
    border: 1px solid transparent;
  }
  .dark-mode & .vscode-highlight-line-highlighted {
    background-color: #1b2835;
  }

  /* horizontally center twitter widget */
  twitter-widget,
  iframe.twitter-tweet {
    margin-left: auto;
    margin-right: auto;
  }

  /* headings */
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    /* Show heading links inline after headline on hover */
    > a {
      width: 16px;
      height: 16px;
      padding: 0 20px;
      box-shadow: none;
      display: inline-block;
      background-image: url(/icons/link.svg);
      background-repeat: no-repeat;
      background-position: center;
      background-size: 0;
    }
    @media (hover: none) {
      > a {
        background-size: 16px;
      }
    }
    &:hover > a,
    & a:focus {
      background-size: 16px;
    }
    /* make heading links on small screens fit next to the
     heading content without wrapping */

    @media only screen and (max-width: 879px) {
      margin-right: 40px;
    }

    /* On larger screens, show heading links positioned to the left of
       the headline on hover */
    @media only screen and (min-width: 880px) {
      position: relative;

      > a {
        position: absolute;
        left: -40px;
        top: 0;
        margin: 0;
        height: 100%;
      }
    }
  }

  header h1 > a {
    background-image: url(/icons/pullrequest.svg);
  }
`

const header = css`
  display: flex;
  flex-direction: column;
`

const headline = css`
  margin-bottom: 0.43rem;
`

const meta = css`
  margin-bottom: 1.72rem;
`

const baseUrl = 'https://github.com/codepunkt/codepunkt.de/edit/master'

const BlogPost = (props) => {
  const {
    className,
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
    <article className={cx(className, article)}>
      <Meta title={title} />
      <header className={header}>
        <h1 className={headline}>
          <span
            className={css`
              background: #e0f0fb;
              .dark-mode & {
                background: #44568c;
              }
            `}
          >
            {title}
          </span>
          {/* eslint-disable-next-line jsx-a11y/anchor-has-content */}
          <a
            aria-label="Edit this page on GitHub"
            aria-hidden="true"
            title="Edit this page on GitHub"
            href={`${baseUrl}/src/content${path}index.mdx`}
          ></a>
        </h1>
        <PostMeta
          className={meta}
          draft={draft}
          created={created}
          updated={updated}
          timeToRead={timeToRead}
        />
      </header>
      <MDXRenderer>{body}</MDXRenderer>
      <footer>
        <p>
          <a href={discussLink} rel="noopener noreferrer" target="_blank">
            Discuss on Twitter
          </a>
        </p>
      </footer>
    </article>
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
