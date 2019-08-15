import { css } from '@emotion/core'
import React from 'react'
import Meta from '../components/meta'
import SiteLayout from '../components/site-layout'

const LegalPage = () => (
  <SiteLayout small filePath="src/pages/legal.js">
    <div>
      <Meta title="Legal Notice — Codepunkt" />
      <h1>
        <span
          css={css`
            background: #d9f8f6;
          `}
        >
          Legal Notice
        </span>
      </h1>
      <p>Yadda yadda...</p>
    </div>
  </SiteLayout>
)

export default LegalPage
