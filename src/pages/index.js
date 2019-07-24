import { Link } from 'gatsby'
import React from 'react'
import Layout from '../components/layout'
import Meta from '../components/meta'

const IndexPage = () => (
  <Layout>
    <Meta title="Home" />
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <Link to="/blog/">View all articles</Link>
  </Layout>
)

// <div>
//   <Image />
// </div>

export default IndexPage
