import { css } from '@emotion/core'

export const quoteStyle = css`
  blockquote {
    margin-left: 0;
    border-left: 5px solid #ddd;
    padding-left: 1.72rem;
    font-style: italic;

    @media only screen and (min-width: 880px) {
      margin-left: -1.72rem;
    }
  }
`
