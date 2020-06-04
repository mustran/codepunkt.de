import { css } from 'linaria'
import React from 'react'
import { Logo } from './logo'

const wrapper = css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;

  z-index: 2;
  @keyframes changeIndex {
    0% {
      z-index: 2;
    }
    100% {
      z-index: -1;
    }
  }
  animation: changeIndex 0.01s linear 2.7s forwards;
`

const background = css`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  font-size: 80px;
  justify-content: center;
  align-items: center;

  @keyframes translateY {
    0% {
      transform: translateY(0%);
    }
    100% {
      transform: translateY(110%);
    }
  }
  transform: translateY(0%);
  animation: translateY 0.7s cubic-bezier(0.165, 0.84, 0.44, 1) 2.5s forwards;

  background: #deede2;
  .dark-mode & {
    background: #192633;
  }
`

const logo = css`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(2);

  color: #318513;
  .dark-mode & {
    color: #e7ceff;
  }

  @keyframes fadeOut {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
  opacity: 1;
  animation: fadeOut 0.5s ease-out 2s forwards;

  @keyframes drawPath {
    0% {
      stroke-dashoffset: var(--path-length);
    }
    25% {
      stroke-dashoffset: 0;
      fill: transparent;
    }
    50% {
      stroke-dashoffset: 0;
    }
    100% {
      fill: currentColor;
    }
  }
  path {
    stroke-dasharray: var(--path-length);
    stroke-dashoffset: var(--path-length);
    stroke: currentColor;
    stroke-width: 0.5;
    fill: transparent;
    animation: drawPath 2000ms linear 0ms forwards;
  }
  path:nth-of-type(1) {
    --path-length: 180;
    animation-delay: 0ms;
  }
  path:nth-of-type(2) {
    --path-length: 123;
    animation-delay: 25ms;
  }
  path:nth-of-type(3) {
    --path-length: 173;
    animation-delay: 50ms;
  }
  path:nth-of-type(4) {
    --path-length: 131;
    animation-delay: 75ms;
  }
  path:nth-of-type(5) {
    --path-length: 194;
    animation-delay: 100ms;
  }
  path:nth-of-type(6) {
    --path-length: 139;
    animation-delay: 125ms;
  }
  path:nth-of-type(7) {
    --path-length: 153;
    animation-delay: 150ms;
  }
  path:nth-of-type(8) {
    --path-length: 217;
    animation-delay: 175ms;
  }
  path:nth-of-type(9) {
    --path-length: 113;
    animation-delay: 200ms;
  }
`

export const InitialAnimation = ({ setAppState }) => {
  const handleAnimationEnd = () => {
    /* window.sessionStorage.setItem('initial-animation', 'done') */
    /* setAppState('default') */
  }

  return (
    <div className={wrapper}>
      <div className={background} onAnimationEnd={handleAnimationEnd}></div>
      <Logo className={logo} />
    </div>
  )
}
