import { css } from 'linaria'
import React from 'react'
import Meta from '../components/meta'

const LegalPage = ({ className }) => (
  <div className={className}>
    <Meta title="Legal Notice — Codepunkt" />
    <h1>
      <span
        className={css`
          background: #fbe0e0;
        `}
      >
        Legal Notice
      </span>
    </h1>
    <p>Yadda yadda...</p>
  </div>
)

export default LegalPage
