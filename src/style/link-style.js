import { css } from '@emotion/core'

export const linkStyle = (props) => css`
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
