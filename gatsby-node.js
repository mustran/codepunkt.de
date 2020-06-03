const path = require('path')
const slugify = require('slugify')
const { createFilePath } = require('gatsby-source-filesystem')

// Create additional fields on pages
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === 'Mdx') {
    const value = createFilePath({ node, getNode })
    createNodeField({ node, name: 'path', value: `/writing${value}` })
    if (node.frontmatter && node.frontmatter.tags) {
      createNodeField({
        node,
        name: 'tags',
        value: node.frontmatter.tags.map((tag) => [
          slugify(tag.trim(), { lower: true }),
          tag.trim(),
        ]),
      })
    }
  }
}

// Create the pages for browsing blog posts
exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return graphql(`
    query {
      allMdx(
        sort: { order: DESC, fields: [frontmatter___created] }
        ${
          process.env.NODE_ENV === 'production'
            ? 'filter: {frontmatter: {draft: {ne: true}}}'
            : ''
        }
      ) {
        edges {
          node {
            id
            fields {
              path
              tags
            }
          }
        }
      }
    }
  `).then((result, errors) => {
    if (errors) return Promise.reject(errors)

    const posts = [...result.data.allMdx.edges]
    const postsPerPage = 100
    const numPages = Math.ceil(posts.length / postsPerPage)

    // create blog post pages
    posts.forEach(({ node }) => {
      createPage({
        path: node.fields.path,
        component: path.resolve('./src/templates/post.js'),
        context: {
          id: node.id,
          permaLink: `https://codepunkt.de${node.fields.path}`,
        },
      })
    })

    // create blog index pages
    Array.from({ length: numPages }).forEach((_, i) => {
      const currentPage = i + 1

      createPage({
        path: currentPage === 1 ? `/writing/` : `/writing/${currentPage}/`,
        component: path.resolve('./src/templates/post-index.js'),
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

    // collect tags
    const tagMap = new Map()
    posts.forEach(({ node }) => {
      if (node.fields.tags) {
        node.fields.tags.forEach(([slug, tag]) => {
          if (tagMap.has(slug)) {
            if (tagMap.get(slug) !== tag) {
              throw new Error(
                `Found two tags resulting in slug "${slug}":\n  - ${tag}\n  - ${tagMap.get(
                  slug
                )}`
              )
            }
          } else {
            tagMap.set(slug, tag)
          }
        })
      }
    })

    // create category pages
    tagMap.forEach((tag, slug) => {
      createPage({
        path: `/writing/category/${slug}`,
        component: path.resolve('./src/templates/category-index.js'),
        context: {
          tag,
        },
      })
    })
  })
}
