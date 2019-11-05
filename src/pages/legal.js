import { css } from '@emotion/core'
import React from 'react'
import Meta from '../components/meta'
import SiteLayout from '../components/site-layout'

const LegalPage = () => (
  <SiteLayout small>
    <div>
      <Meta title="Legal Notice — Codepunkt" />
      <h1>
        <span
          css={css`
            background-image: linear-gradient(
              transparent calc(65%),
              #d9f8f6 35%
            );
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
