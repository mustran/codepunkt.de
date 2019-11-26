import { graphql } from 'gatsby'
import { css } from 'linaria'
import React from 'react'
import ArticleSummary from '../components/article-summary'
import Meta from '../components/meta'
import colors from '../style/colors'

const styles = {
  headline: css`
    margin-bottom: 2.58rem;
    span {
      color: ${colors.light.headlineGreen};
      .dark-mode & {
        color: ${colors.dark.headlineGreen};
      }
    }
  `,
  subheadline: css`
    margin-bottom: -12px;
    font-weight: 400;
    text-transform: uppercase;
    color: #595959;
    .dark-mode & {
      color: #9babc1;
    }
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
      <Meta title={`Tagged: ${tag} — Codepunkt`} />
      <h4 className={styles.subheadline}>Category</h4>
      <h1 className={styles.headline}>
        <span>{tag}</span>
      </h1>
      {articles.map(
        ({
          frontmatter: { draft, created, updated, title },
          id,
          excerpt,
          timeToRead,
          fields: { path },
        }) => {
          return (
            <ArticleSummary
              key={id}
              path={path}
              title={title}
              excerpt={excerpt}
              timeToRead={timeToRead}
              created={created}
              commentCount={2}
            />
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
