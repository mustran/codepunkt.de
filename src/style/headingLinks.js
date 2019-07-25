import { css } from '@emotion/core'

/**
 * Styling that enables showing the links to headings on hover.
 */
const headingLinks = css`
  h1:hover,
  h2:hover,
  h3:hover,
  h4:hover,
  h5:hover,
  h6:hover {
    position: relative;

    > a {
      position: absolute;
      display: flex;
      left: -1.5rem;
      top: 0px;
      bottom: 0px;
      right: 0px;
      height: 100%;
      width: 1.5rem;
      background: url(/icons/link.svg) left center / 1rem no-repeat;
      background-repeat: no-repeat;
      background-position: left center;
    }
  }
`

export default headingLinks
