export const codeStyle = `
  code:not(.vscode-highlight-code) {
    background: #fefaf1;
    padding: 3px 5px;
    border-radius: 3px;
    color: #5c5e7b;
    font-family: 'Fira Mono', Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono',
      monospace;
  }

  .vscode-highlight {
    border-radius: 4px;
    counter-reset: line;
    background: #fefaf1;

    .vscode-highlight-code {
      /* font-size: 16px; */
      font-family: 'Fira Mono', Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono',
        monospace;
      line-height: 1.65;
    }

    .vscode-highlight-line {
      &::before {
        counter-increment: line;
        content: counter(line);
        margin: 0 12px 0 -8px;
        user-select: none;
        color: #d7c9b3;
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

      .mtk7 {
        color: #2aa198;
      }
      .mtk9 {
        color: #b58900;
      }
      .mtk10 {
        color: #3374ff;
      }
    }

    .vscode-highlight-line-highlighted {
      background-color: #f9f3e6;
    }

    @media (prefers-color-scheme: dark) {
    }
  }
`
