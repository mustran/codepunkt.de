import { css } from '@emotion/core'

export const codeStyle = css`
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
      &::before {
        counter-increment: line;
        content: counter(line);
        margin: 0 12px 0 -8px;
        user-select: none;
        color: #4d535a;
        text-align: right;
        width: 20px;
        display: inline-block;
      }

      @media only screen and (min-width: 668px) {
        padding-left: 1em;
        padding-right: 1em;
        &::before {
          margin: 0 16px 0 -8px;
        }
      }
    }

    *:not(.vscode-highlight-line-highlighted)
      + .vscode-highlight-line-highlighted,
    .vscode-highlight-line-highlighted:first-of-type {
      border-top: 1px solid #5e7592;
    }

    .vscode-highlight-line-highlighted
      + *:not(.vscode-highlight-line-highlighted) {
      border-top: 1px solid #5e7592;
    }

    .vscode-highlight-line-highlighted:last-of-type {
      border-bottom: 1px solid #5e7592;
    }

    .vscode-highlight-line-highlighted {
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
