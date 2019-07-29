import { css } from '@emotion/core'

export const linkStyles = css`
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
