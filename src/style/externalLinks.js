import { css } from '@emotion/core'

/**
 * Styles that hide annotations for screenreaders on external links
 * off screen.
 */
const externalLinks = css`
  a[target='_blank'] span {
    position: absolute;
    left: -10000px;
    top: auto;
    width: 1px;
    height: 1px;
    overflow: hidden;
  }
`

export default externalLinks
