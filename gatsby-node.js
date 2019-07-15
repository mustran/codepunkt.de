const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

// Create additional fields on pages
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === 'Mdx') {
    const value = createFilePath({ node, getNode })
    createNodeField({ node, name: 'slug', value: `/blog${value}` })
  }
}

// Create the pages for browsing blog posts
exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return graphql(`
    query {
      allMdx(sort: { order: DESC, fields: [frontmatter___date] }) {
        edges {
          node {
            id
            excerpt(pruneLength: 250)
            fields {
              slug
            }
            frontmatter {
              title
              author
            }
          }
        }
      }
    }
  `).then((result, errors) => {
    if (errors) return Promise.reject(errors)

    const posts = result.data.allMdx.edges
    const postsPerPage = 2
    const numPages = Math.ceil(posts.length / postsPerPage)

    Array.from({ length: numPages }).forEach((_, i) => {
      const currentPage = i + 1

      createPage({
        path: currentPage === 1 ? `/blog` : `/blog/${currentPage}`,
        component: path.resolve('./src/templates/blog-index.js'),
        context: {
          pageInfo: {
            totalCount: numPages,
            currentPage,
            hasPreviousPage: currentPage !== 1,
            hasNextPage: currentPage !== numPages,
          },
          nodes: posts
            .slice(i * postsPerPage, i * postsPerPage + postsPerPage)
            .map(({ node }) => node),
        },
      })
    })
  })
}
