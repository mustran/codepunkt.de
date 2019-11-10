import { css } from 'linaria'
import React from 'react'
import Meta from '../components/meta'

const headline = css`
  transform: rotate(-1deg);

  span {
    background: #b0eae8;
    .dark-mode & {
      background: #2c908b;
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
