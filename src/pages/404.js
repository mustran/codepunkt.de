import React from 'react'
import Meta from '../components/meta'
import SiteLayout from '../components/site-layout'

const NotFoundPage = () => (
  <SiteLayout small>
    <div>
      <Meta title="Not found — Codepunkt" />
      <h1>Not found</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </div>
  </SiteLayout>
)

export default NotFoundPage
