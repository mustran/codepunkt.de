import { keyframes } from '@emotion/core'

const fadeUpIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px)
  }
  100% {
    opacity: 1;
    transform: translateY(0)
  }`

export default fadeUpIn
