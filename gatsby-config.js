module.exports = {
  siteMetadata: {
    title: 'Codepunkt',
    description:
      'Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.',
    author: '@code_punkt',
    lang: 'en',
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'blog',
        path: `${__dirname}/src/pages/blog`,
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
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: ['.mdx'],
        defaultLayouts: {
          default: require.resolve('./src/templates/blog-post.js'),
        },
        remarkPlugins: [
          // adds target _blank to external links and defines an appropriate
          // link type of 'nofollow,noopener,noreferrer'
          [
            require('remark-external-links'),
            { content: { type: 'text', value: '(opens in a new window)' } },
          ],
        ],
        rehypePlugins: [
          // adds id attributes to headings
          require('rehype-slug'),
          // adds links pointing to the headings
          [
            require('rehype-autolink-headings'),
            { properties: { ariaHidden: true }, content: [] },
          ],
        ],
        gatsbyRemarkPlugins: [
          // copies relative referenced files to the public folder
          // and adjusts the references accordingly
          { resolve: 'gatsby-remark-copy-linked-files' },
          // converts single and double straight quotes to curly
          // ones, converts three dots to ellipses and double dashes
          // to an em-dash
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 1200,
              linkImagesToOriginal: false,
            },
          },
          // copies relative referenced files other than jpg and png to
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
              colorTheme: {
                defaultTheme: 'Ayu Mirage',
                prefersDarkTheme: 'Ayu Dark',
              },
              injectStyles: true,
              extensions: [
                { identifier: 'teabyii.ayu', version: '0.18.0' },
                {
                  identifier: 'jpoissonnier.vscode-styled-components',
                  version: '0.0.26',
                },
              ],
            },
          },
        ],
      },
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-catch-links',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-emotion',
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
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/images/gatsby-icon.png',
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // 'gatsby-plugin-offline',
  ],
}
