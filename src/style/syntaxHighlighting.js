import { css } from '@emotion/core'

/**
 * Styling used to override styles for syntax highlighted code
 * blocks defined by gatsby-remark-vscode
 */
const syntaxHighlighting = css`
  .vscode-highlight {
    border-radius: 4px;

    .vscode-highlight-code {
      font-size: 1rem;
    }

    .vscode-highlight-line {
      border-left: 4px solid transparent;
    }

    .vscode-highlight-line-highlighted {
      border-left: 4px solid #5e7592;
      background-color: #2d3846;
    }

    @media (prefers-color-scheme: dark) {
    }

    @media only screen and (max-width: 667px) {
      margin-left: -20px;
      margin-right: -20px;
      border-radius: 0;
    }
  }
`

export default syntaxHighlighting
