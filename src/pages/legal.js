import { css } from 'linaria'
import React from 'react'
import Meta from '../components/meta'

const headline = css`
  transform: rotate(-1deg);
  margin-bottom: 2.58rem;
  span {
    background: #b0eae8;
    .dark-mode & {
      background: #8ed7d5;
      color: #15202b;
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
