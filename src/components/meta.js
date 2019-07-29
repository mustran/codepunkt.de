import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'
import Helmet from 'react-helmet'

const Meta = (options = {}) => {
  const {
    site: { siteMetadata },
  } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            author
            description
            lang
            title
          }
        }
      }
    `
  )

  const meta = Object.assign({}, siteMetadata, options)

  return (
    <Helmet titleTemplate={'%s | Codepunkt'}>
      <html lang={meta.lang} />
      <meta name="description" content={meta.description} />
      <meta name="og:description" content={meta.description} />
      <meta name="og:type" content="website" />
      <meta name="og:title" content={meta.title} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:creator" content={meta.author} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:dnt" content="on"></meta>
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:widgets:link-color" content="#bada55"></meta>
      <link rel="me" href="https://twitter.com/code_punkt"></link>
      <title>{meta.title}</title>
    </Helmet>
  )
}

export default Meta
