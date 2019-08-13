import React from 'react'
import Meta from '../components/meta'
import SiteLayout from '../components/site-layout'

const LegalPage = () => (
  <SiteLayout small filePath="src/pages/legal.js">
    <div>
      <Meta title="Legal Notice" />
      <h1>Legal Notice</h1>
      <p>Yadda yadda...</p>
    </div>
  </SiteLayout>
)

export default LegalPage
