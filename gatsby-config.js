module.exports = {
  siteMetadata: {
    title: 'Codepunkt',
    description:
      'Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.',
    author: '@code_punkt',
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
        gatsbyRemarkPlugins: [
          // {
          //   resolve: '@weknow/gatsby-remark-twitter',
          // },
          // {
          //   resolve: `@raae/gatsby-remark-oembed`,
          //   options: {
          //     usePrefix: true,
          //     providers: {
          //       include: ['Twitter', 'Instagram'],
          //       settings: {
          //         Twitter: { theme: 'dark' },
          //         Instagram: { hidecaption: true },
          //       },
          //     },
          //   },
          // },
        ],
        // remarkPlugins: [require('remark-slug')],
        rehypePlugins: [
          require('rehype-slug'),
          require('rehype-autolink-headings'),
          // rehype-shiki
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
        icon: 'src/images/gatsby-icon.png', // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // 'gatsby-plugin-offline',
  ],
}
