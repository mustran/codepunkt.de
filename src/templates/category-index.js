import { graphql, Link } from 'gatsby'
import { css } from 'linaria'
import React from 'react'
import Meta from '../components/meta'
import CoffeeIcon from '../images/coffee.svg'
import FeatherIcon from '../images/feather.svg'
import colors from '../style/colors'
import { formatPostDate } from '../utils'

const styles = {
  headline: css`
    margin-bottom: 2.58rem;
    span {
      color: ${colors.light.headlineTurquoise};
      .dark-mode & {
        color: ${colors.dark.headlineTurquoise};
      }
    }
  `,
  subheadline: css`
    margin-bottom: 0;
    font-weight: 400;
    color: #595959;
    text-transform: uppercase;
    .dark-mode & {
      color: #9babc1;
    }
  `,
  readMore: css``,
  post: css`
    margin: 3.44rem 0;
    &:first-of-type {
      margin-top: 1.72rem;
    }
  `,
  postTitle: css`
    display: block;
    font-size: 1.5rem;
    margin-bottom: 0.43rem;
    h2 {
      margin: 0;
      color: ${colors.light.text};
      .dark-mode & {
        color: ${colors.dark.text};
      }
    }
    &:hover,
    &:focus {
      box-shadow: none;
      h2 {
        color: ${colors.dark.link};
      }
    }
    .dark-mode &:hover,
    .dark-mode &:focus {
      box-shadow: none;
    }
  `,
  postMeta: css`
    color: #595959;
    margin: 0 0 0.43rem;
    .dark-mode & {
      color: #7f8ea3;
    }
  `,
  postMetaItem: css`
    display: inline-flex;
    align-items: center;
    margin: 0 1.72rem 0 0;
  `,
  postMetaIcon: css`
    margin-right: 0.43rem;
    stroke: #aaa;
    stroke-width: 1;
    .dark-mode & {
      stroke: #3f576f;
    }
  `,
  postMetaLink: css`
    color: currentColor;
    box-shadow: none;
    .dark-mode & {
      color: currentColor;
      box-shadow: none;
    }
  `,
  postSummary: css`
    margin-bottom: 0.86rem;
    span {
      color: #595959;
      font-size: 1rem;
      .dark-mode & {
        color: #7f8ea3;
      }
    }
  `,
  date: css`
    font-family: Merriweather, 'Lucida Bright', 'Lucidabright', 'Lucida Serif',
      Lucida, 'DejaVu Serif', 'Bitstream Vera Serif', 'Liberation Serif',
      Georgia, serif;
  `,
  month: css`
    font-size: 85% !important;
  `,
}

const BlogTag = (props) => {
  const {
    className,
    path,
    pageContext: { tag },
    data: {
      allMdx: { nodes: articles },
    },
  } = props

  console.log(props)

  return (
    <div>
      <h4 className={styles.subheadline}>Category</h4>
      <h1 className={styles.headline}>
        <span>{tag}</span>
      </h1>
      <Meta title={`Tagged: ${tag} — Codepunkt`} />
      {articles.map(
        ({
          frontmatter: { draft, created, updated, title },
          id,
          excerpt,
          timeToRead,
          fields: { path },
        }) => {
          const commentCount = 2

          return (
            <article className={styles.post} key={id}>
              <Link to={path} className={styles.postTitle}>
                <h2>{title}</h2>
              </Link>
              <ul className={styles.postMeta}>
                <li className={styles.postMetaItem}>
                  <CoffeeIcon className={styles.postMetaIcon} />
                  {timeToRead} min read
                </li>
                <li className={styles.postMetaItem}>
                  <FeatherIcon className={styles.postMetaIcon} />
                  <Link to="#" className={styles.postMetaLink}>
                    {commentCount > 0
                      ? `${commentCount} comments`
                      : 'Leave a comment'}
                  </Link>
                </li>
              </ul>
              <p className={styles.postSummary}>
                <span
                  dangerouslySetInnerHTML={{
                    __html: formatPostDate(created)
                      .split(' ')
                      .map((part, i) => {
                        return i === 0
                          ? `<span class="${
                              styles.month
                            }">${part.toUpperCase()}</span>`
                          : part
                      })
                      .join(' '),
                  }}
                  className={styles.date}
                ></span>{' '}
                — {excerpt}
              </p>
              {/* <Link to={path} className={styles.readMore}>
                Read More...
              </Link> */}
            </article>
          )
        }
      )}
    </div>
  )
}

export default BlogTag

export const query = graphql`
  query mdxPostsForTag($tag: String) {
    allMdx(filter: { frontmatter: { tags: { in: [$tag] } } }) {
      nodes {
        excerpt(pruneLength: 288)
        fields {
          path
        }
        frontmatter {
          author
          created
          title
          updated
          draft
        }
        id
        timeToRead
      }
    }
  }
`
