import { graphql, Link } from 'gatsby'
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer'
import { css, cx } from 'linaria'
import React from 'react'
import Meta from '../components/meta'
import CoffeeIcon from '../images/coffee.svg'
import PullrequestIcon from '../images/pullrequest.svg'
import TagIcon from '../images/tag.svg'
import colors from '../style/colors'
import { formatPostDate } from '../utils'

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
  code:not(.grvsc-code) {
    background: ${colors.light.codeBackgroundAccent};
    padding: 3px 5px;
    border-radius: 3px;
    color: #5c5e7b;
    font-family: 'Fira Mono', Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono',
      monospace;
    font-size: 16px;

    @media only screen and (min-width: 668px) {
      font-size: 18px;
    }
  }
  .dark-mode & code:not(.grvsc-code) {
    background: ${colors.dark.codeBackgroundAccent};
    color: #8493a7;
  }

  .grvsc-container {
    border-radius: 4px;
    counter-reset: line;
    background: ${colors.light.codeBackground};
    border: 1px solid ${colors.light.codeBackgroundAccent};
    margin: 0 -6.1vw 1.72rem;
    padding: 18px calc(6.1vw - 1.5em);

    @media only screen and (min-width: 880px) {
      margin: 0 0 1.72rem;
      padding: 18px 0;
    }

    .grvsc-code {
      font-size: 14px;
      font-family: 'Fira Mono', Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono',
        monospace;
      line-height: 1.65;

      @media only screen and (min-width: 500px) {
        font-size: 18px;
      }
    }

    .grvsc-line {
      &::before {
        counter-increment: line;
        content: counter(line);
        margin: 0 12px 0 -8px;
        user-select: none;
        color: #e4e4e4;
        text-align: right;
        width: 20px;
        display: inline-block;
      }

      .dark-mode &::before {
        color: #4d617b;
      }

      @media only screen and (min-width: 668px) {
        padding-left: 1.5rem;
        padding-right: 1rem;
        &::before {
          margin: 0 16px 0 -8px;
        }
      }
    }

    .grvsc-line-highlighted {
      background-color: #f7f7f7;
    }
  }
  .dark-mode & .grvsc-container {
    background: ${colors.dark.codeBackground};
    border: 1px solid ${colors.dark.codeBackgroundAccent};
  }
  .dark-mode & .grvsc-line-highlighted {
    background-color: #0c1a27;
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
    /* Offset the anchor link start so that headlines are
       not hidden behind the stick header */
    padding-top: 5rem;
    margin-top: -5rem;

    /* Show heading links inline after headline on hover */
    > a {
      width: 40px;
      height: 40px;
      box-shadow: none;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      visibility: hidden;
      box-shadow: none !important;

      svg {
        width: 1.1rem;
        fill: none;
        stroke-width: 1;
        stroke: ${colors.light.link};
        .dark-mode & {
          stroke: ${colors.dark.link};
        }
      }
    }
    &:hover > a,
    & a:focus {
      visibility: visible;
    }

    /* On larger screens, show heading links positioned to the left of
       the headline on hover */
    @media only screen and (min-width: 880px) {
      position: relative;

      > a {
        position: absolute;
        left: -40px;
        bottom: 0;
        margin: 0;
      }
    }
  }

  /** Article headline might span multiple lines. If the screen is
      smaller, hide the edit link to prevent breakage */
  @media only screen and (max-width: 879px) {
    header h1 a {
      display: none;
    }
  }

  header h1 {
    padding-top: 0;
    margin-top: 0;
  }

  header h1 a {
    height: 100%;
  }
`

const header = css`
  display: flex;
  flex-direction: column;
`

const upperMeta = css`
  list-style: none;
  padding: 0;
  margin: 0;
  margin-bottom: 0.43rem;
  font-size: 0.9rem;
  color: ${colors.light.textSecondary};
  .dark-mode & {
    color: ${colors.dark.textSecondary};
  }

  li {
    display: inline-flex;
    align-items: baseline;
    margin: 0;
    &:not(:last-child)::after {
      content: '•';
      margin: 0 1ex;

      color: ${colors.light.text};
      .dark-mode & {
        color: ${colors.dark.text};
      }
    }
  }
`

const tagList = css`
  list-style: none;
  display: inline-flex;
  flex-wrap: wrap;
  padding: 0;
  margin: 0;
  li {
    padding: 0;
    margin: 0;
    white-space: nowrap;
    &:not(:last-of-type) {
      margin-right: 0.3rem;
      &::after {
        content: ',';
      }
    }
  }
`

const lowerMeta = css`
  list-style: none;
  padding: 0.43rem 0.86rem;
  border-radius: 0.43rem;
  margin: 0;
  margin-bottom: 1.72rem;
  font-size: 15px;
  display: flex;
  flex-direction: column;
  background: ${colors.light.backgroundAccent};
  border: 1px solid ${colors.light.backgroundAccentSecondary};
  .dark-mode & {
    background: ${colors.dark.backgroundAccent};
    border: 1px solid ${colors.dark.backgroundAccentSecondary};
  }

  @media only screen and (min-width: 668px) {
    font-size: 17px;
  }

  svg {
    margin: 2px 0.43rem 0 0;
    stroke-width: 2;
    flex-shrink: 0;
    stroke: #aaa;
    .dark-mode & {
      stroke: #3f576f;
    }
  }

  > li {
    display: inline-flex;
    align-items: flex-start;
    padding: 0.215rem 0;
    margin: 0;

    span {
      display: inline-flex;
      flex-wrap: wrap;
    }
  }

  a:not(:last-of-type) {
    margin-right: 0.43rem;
  }
`

const headline = css`
  margin-bottom: 0.86rem;
  span {
    color: ${colors.light.headlineGreen};
    .dark-mode & {
      color: ${colors.dark.headlineGreen};
    }
  }
`
const date = css`
  font-family: Merriweather, 'Lucida Bright', 'Lucidabright', 'Lucida Serif',
    Lucida, 'DejaVu Serif', 'Bitstream Vera Serif', 'Liberation Serif', Georgia,
    serif;
`

const month = css`
  font-size: 85%;
  margin-right: 0.3rem;
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
        fields: { tags },
        frontmatter: { draft, created, updated, title },
        timeToRead,
      },
      site: {
        siteMetadata: { siteUrl },
      },
      allWebMentionEntry: { edges: webmentions },
    },
  } = props

  console.log(webmentions)
  const commentCount = 2

  return (
    <article className={cx('h-entry', className, article)}>
      <Meta title={title} />
      <header className={header}>
        <ul className={upperMeta}>
          <li
            dangerouslySetInnerHTML={{
              __html: formatPostDate(created)
                .split(' ')
                .map((part, i) => {
                  return i === 0
                    ? `<span class="${month}">${part.toUpperCase()}</span>`
                    : part
                })
                .join(' '),
            }}
            className={date}
          ></li>
          <li>
            <Link to="#" title="Jump to the comments section">
              {commentCount > 0
                ? `${commentCount} comments`
                : 'Leave a comment'}
            </Link>
          </li>
        </ul>
        <h1 className={headline}>
          <span className="p-name">{title}</span>
          {/* eslint-disable-next-line jsx-a11y/anchor-has-content */}
          <a
            aria-label="Edit this page on GitHub"
            aria-hidden="true"
            title="Edit this page on GitHub"
            href={`${baseUrl}/src/content${path}index.mdx`}
          >
            <PullrequestIcon />
          </a>
        </h1>
        {(tags || timeToRead) && (
          <ul className={lowerMeta}>
            {timeToRead && (
              <li>
                <CoffeeIcon />
                {timeToRead} min read
              </li>
            )}
            {tags && (
              <li>
                <TagIcon />
                <ul className={tagList}>
                  {tags.map(([slug, tag], i) => (
                    <li>
                      <Link to={`/articles/category/${slug}`}>{tag}</Link>
                    </li>
                  ))}
                </ul>
              </li>
            )}
          </ul>
        )}
        {/* webmentions */}
        <div
          className={css`
            display: none;
          `}
        >
          <a className="u-url" href={`${siteUrl}${path}`}>
            <time className="dt-published" datetime={created}></time>
          </a>
          <a rel="author" className="p-author h-card" href={siteUrl}>
            Christoph Werner
          </a>
        </div>
      </header>
      <div className="e-content">
        <MDXRenderer>{body}</MDXRenderer>
      </div>
    </article>
  )
}

export default BlogPost

export const query = graphql`
  query mdxPostDetails($permaLink: String, $id: String) {
    mdx(id: { eq: $id }) {
      body
      fields {
        tags
      }
      frontmatter {
        title
        author
        created
        updated
        draft
      }
      timeToRead
    }
    site {
      siteMetadata {
        siteUrl
      }
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
