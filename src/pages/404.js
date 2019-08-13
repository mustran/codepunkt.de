import React from 'react'
import Meta from '../components/meta'
import SiteLayout from '../components/site-layout'

const NotFoundPage = () => (
  <SiteLayout small filePath="src/pages/404.js">
    <div>
      <Meta title="404: Not found" />
      <h1>NOT FOUND</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </div>
  </SiteLayout>
)

export default NotFoundPage
