const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

// Create additional fields on pages
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === 'Mdx') {
    const value = createFilePath({ node, getNode })
    createNodeField({ node, name: 'path', value: `/blog${value}` })
  }
}

// Create the pages for browsing blog posts
exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return graphql(`
    query {
      allMdx(sort: { order: DESC, fields: [frontmatter___created] }) {
        edges {
          node {
            id
            fields {
              path
            }
          }
        }
      }
    }
  `).then((result, errors) => {
    if (errors) return Promise.reject(errors)

    const posts = [...result.data.allMdx.edges]
    const postsPerPage = 4
    const numPages = Math.ceil(posts.length / postsPerPage)

    // create blog post pages
    posts.forEach(({ node }) => {
      createPage({
        path: node.fields.path,
        component: path.resolve('./src/templates/blog-post.js'),
        context: {
          id: node.id,
        },
      })
    })

    // create blog index pages
    Array.from({ length: numPages }).forEach((_, i) => {
      const currentPage = i + 1

      createPage({
        path: currentPage === 1 ? `/blog/` : `/blog/${currentPage}/`,
        component: path.resolve('./src/templates/blog-index.js'),
        context: {
          pageInfo: {
            totalCount: numPages,
            currentPage,
            hasPreviousPage: currentPage !== 1,
            hasNextPage: currentPage !== numPages,
          },
          ids: posts
            .slice(i * postsPerPage, i * postsPerPage + postsPerPage)
            .map(({ node }) => node.id),
        },
      })
    })
  })
}
