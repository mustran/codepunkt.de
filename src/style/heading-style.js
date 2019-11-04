import { css } from '@emotion/core'

export const headingStyle = css`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    /* Show heading links inline after headline on hover */
    > a {
      width: 16px;
      height: 16px;
      padding: 0 20px;
      box-shadow: none;
      display: inline-block;
      background-image: url(/icons/link.svg);
      background-repeat: no-repeat;
      background-position: center;
      background-size: 0;
    }
    @media (hover: none) {
      > a {
        background-size: 16px;
      }
    }
    &:hover > a {
      background-size: 16px;
    }

    /* On larger screens, show heading links positioned to the left of
       the headline on hover */
    @media only screen and (min-width: 880px) {
      position: relative;

      > a {
        position: absolute;
        left: -40px;
        top: 0;
        margin: 0;
        height: 100%;
      }
    }
  }

  header h1 > a {
    background-image: url(/icons/pullrequest.svg);
  }
`
