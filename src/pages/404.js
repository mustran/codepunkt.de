import React from 'react'
import Meta from '../components/meta'

const NotFoundPage = ({ className }) => (
  <div className={className}>
    <Meta title="Not found — Codepunkt" />
    <h1>Not found</h1>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
  </div>
)

export default NotFoundPage
