import { css } from '@emotion/core'

export const linkStyle = (props) => css`
  a,
  a:link,
  a:visited,
  a:focus,
  a:hover,
  a:active {
    color: ${props.theme.colors.link};
    text-decoration: none;
    box-shadow: 0 1px 0 0 #ccc;

    &:hover {
      box-shadow: 0 1px 0 0 transparent;
    }
  }

  /* Hide annotations for screenreaders on external link off screen. */
  a[target='_blank'] span {
    position: absolute;
    left: -10000px;
    top: auto;
    width: 1px;
    height: 1px;
    overflow: hidden;
  }
`
