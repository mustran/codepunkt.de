import { css } from '@emotion/core'

/**
 * Styling used to override styles for syntax highlighted code
 * blocks defined by gatsby-remark-vscode
 */
const syntaxHighlighting = css`
  code:not(.vscode-highlight-code) {
    background: #f1f1f1;
    padding: 3px 5px;
    border-radius: 3px;
  }

  .vscode-highlight {
    border-radius: 4px;
    counter-reset: line;

    .vscode-highlight-code {
      font-size: 1rem;
    }

    .vscode-highlight-line {
      border-left: 4px solid transparent;

      /**
       * Show line numbers on larger screens
       */
      @media only screen and (min-width: 668px) {
        &::before {
          counter-increment: line;
          content: counter(line);
          margin: 0 16px 0 -8px;
          user-select: none;
          color: #4d535a;
          text-align: right;
          width: 20px;
          display: inline-block;
        }
      }
    }

    .vscode-highlight-line-highlighted {
      border-left: 4px solid #5e7592;
      background-color: #2d3846;
    }

    @media (prefers-color-scheme: dark) {
    }

    @media only screen and (max-width: 768px) {
      margin-left: -20px;
      margin-right: -20px;
      border-radius: 0;
    }
  }
`

export default syntaxHighlighting
