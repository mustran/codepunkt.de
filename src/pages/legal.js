import { css } from 'linaria'
import React from 'react'
import Meta from '../components/meta'

const headline = css`
  transform: rotate(-1deg);

  span {
    background: #fbe0e0;
    .dark-mode & {
      background: #902c2c;
    }
  }
`

const LegalPage = ({ className }) => (
  <div className={className}>
    <Meta title="Legal Notice — Codepunkt" />
    <h1 className={headline}>
      <span>Legal Notice</span>
    </h1>
    <p>Yadda yadda...</p>
  </div>
)

export default LegalPage
