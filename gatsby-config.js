const path = require('path')

module.exports = {
  siteMetadata: {
    title: 'Codepunkt',
    description:
      'Personal site of Christoph Werner. I write about web development topics.',
    author: '@code_punkt',
    lang: 'en',
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'posts',
        path: `${__dirname}/src/content/articles`,
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
      options: { production: true, analyzerMode: 'static' },
    },
    {
      resolve: 'gatsby-plugin-layout',
      options: {
        component: require.resolve(`./src/components/site-layout`),
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
          default: require.resolve('./src/templates/blog-post.js'),
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
              content: [],
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
              colorTheme: {
                defaultTheme: 'Slack Theme Ochin',
                prefersDarkTheme: 'Ayu Mirage',
              },
              injectStyles: true,
              extensionDataDirectory: path.resolve(
                'vendor/gatsby-remark-vscode-extensions'
              ),
              extensions: [
                { identifier: 'teabyii.ayu', version: '0.18.0' },
                { identifier: 'felipe-mendes.slack-theme', version: '1.9.10' },
                {
                  identifier: 'jpoissonnier.vscode-styled-components',
                  version: '0.0.26',
                },
              ],
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
    // TODO: evaluate plugins:
    // 'gatsby-plugin-offline',
    // 'gatsby-plugin-feed',
    // 'gatsby-plugin-i18n',
  ],
}
