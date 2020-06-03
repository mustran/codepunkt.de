const vfile = require('to-vfile')
const parse5 = require('parse5')
const fromParse5 = require('hast-util-from-parse5')

const doc = vfile.readSync('./src/images/link.svg')
const ast = parse5.parse(String(doc), { sourceCodeLocationInfo: true })
const hast = fromParse5(ast, doc)
const linkSvg = hast.children[0].children[1].children[0]

module.exports = {
  siteMetadata: {
    title: 'Codepunkt',
    description:
      'Personal site of Christoph Werner. I write about web development topics.',
    siteUrl: 'https://codepunkt.de',
    author: 'Christoph Werner',
    lang: 'en',
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'posts',
        path: `${__dirname}/src/content/writing`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: 'gatsby-plugin-webpack-bundle-analyzer',
      options: {
        production: true,
        analyzerMode: 'static',
        disable: process.env.NODE_ENV === 'development',
      },
    },
    {
      resolve: 'gatsby-plugin-layout',
      options: {
        component: require.resolve(`./src/components/site/layout`),
      },
    },
    { resolve: 'gatsby-plugin-react-svg' },
    {
      resolve: 'gatsby-plugin-webmention',
      options: {
        username: 'codepunkt.de',
        identity: {
          github: 'codepunkt',
          twitter: 'code_punkt',
        },
        mentions: true,
        pingbacks: true,
        domain: 'codepunkt.de',
        token: process.env.WEBMENTIONS_TOKEN,
      },
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: ['.mdx'],
        defaultLayouts: {
          default: require.resolve('./src/templates/post.js'),
        },
        remarkPlugins: [
          // adds target _blank to external links and defines an appropriate
          // link type
          [
            require('remark-external-links'),
            {
              rel: 'noopener noreferrer',
              content: { type: 'text', value: '(opens in a new window)' },
            },
          ],
        ],
        rehypePlugins: [
          // adds id attributes to headings
          require('rehype-slug'),
          // adds links pointing to the headings
          [
            require('rehype-autolink-headings'),
            {
              behavior: 'append',
              properties: { ariaHidden: true, title: 'Link to this section' },
              content: linkSvg,
            },
          ],
        ],
        gatsbyRemarkPlugins: [
          // creates various image sizes
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 728,
              linkImagesToOriginal: false,
            },
          },
          // copies re448fealative referenced files other than jpg and png to
          // the public folder and adjusts the references accordingly
          {
            resolve: 'gatsby-remark-copy-linked-files',
            options: { ignoreFileExtensions: [`png`, `jpg`, `jpeg`] },
          },
          // converts single and double straight quotes to curly
          // ones, converts three dots to ellipses and double dashes
          // to an em-dash
          {
            resolve: 'gatsby-remark-smartypants',
            options: { backticks: false },
          },
          // syntax highlighting
          {
            resolve: 'gatsby-remark-vscode',
            options: {
              theme: {
                default: 'Slack Theme Ochin',
                dark: 'Ayu Mirage',
              },
              injectStyles: true,
              selectorDark: '.dark-mode',
              extensions: ['vscode-styled-components', 'ayu', 'slack-theme'],
            },
          },
          // embed third party content from twitter and youtube
          { resolve: 'gatsby-remark-embedder' },
        ],
      },
    },
    'gatsby-plugin-twitter',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-catch-links',
    'gatsby-plugin-sharp',
    'gatsby-plugin-use-dark-mode',
    'gatsby-transformer-sharp',
    'gatsby-plugin-linaria',
    // replaces react with preact in production builds
    'gatsby-plugin-preact',
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/style/typography',
        omitGoogleFont: true,
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Codepunkt',
        short_name: 'Codepunkt',
        start_url: '/',
        background_color: '#4483ea',
        theme_color: '#4483ea',
        display: 'minimal-ui',
        icon: 'src/images/codepunkt-icon.png',
      },
    },
    {
      resolve: 'gatsby-plugin-feed',
      options: {
        query: `
        {
          site {
            siteMetadata {
              title
              description
              site_url: siteUrl
            }
          }
        }
      `,
        feeds: [
          {
            serialize: ({ query: { site, allMdx } }) => {
              return allMdx.edges.map((edge) => {
                return Object.assign({}, edge.node.frontmatter, {
                  title: edge.node.frontmatter.title,
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.created,
                  url: site.siteMetadata.site_url + edge.node.fields.path,
                  guid: site.siteMetadata.site_url + edge.node.fields.path,
                })
              })
            },
            query: `
            {
              allMdx(
                limit: 1000,
                filter: { frontmatter: { draft: { ne: true } }},
                sort: { order: DESC, fields: [frontmatter___created] },
              ) {
                edges {
                  node {
                    excerpt(pruneLength: 288)
                    fields { path }
                    frontmatter {
                      title
                      created
                    }
                  }
                }
              }
            }
          `,
            output: '/writing/rss.xml',
            title: 'Codepunkt Blog RSS Feed',
            // optional configuration to insert feed reference in pages:
            // if `string` is used, it will be used to create RegExp and then test if pathname of
            // current page satisfied this regular expression;
            // if not provided or `undefined`, all pages will have feed reference inserted
            match: '^/writing/',
          },
        ],
      },
    },
    // TODO: evaluate plugins:
    // 'gatsby-plugin-offline',
    // 'gatsby-plugin-i18n',
  ],
}
