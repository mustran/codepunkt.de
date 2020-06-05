import { css } from 'linaria'
import React from 'react'

const button = css`
  background: transparent;
  border: none;
  padding: 0;
  width: 36px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  cursor: pointer;

  /* change bun size on hover and keyboard focus */
  html:not([data-state='menu']) &:hover div::before,
  html:not([data-state='menu']) &:hover div::after,
  html[data-whatinput='keyboard']:not([data-state='menu']) &:focus div::before,
  html[data-whatinput='keyboard']:not([data-state='menu']) &:focus div::after {
    width: 28px;
  }

  /* change patty size on hover and keyboard focus */
  &:hover span,
  html[data-whatinput='keyboard'] &:focus span {
    width: 16px;
  }

  @media screen and (min-width: 521px) {
    width: 48px;
    height: 48px;
  }
`

const buns = css`
  width: 28px;
  height: 28px;
  position: relative;

  &::before,
  &::after {
    content: '';
    position: absolute;
    height: 2px;
    left: 0;
    z-index: 1;
    background: #318513;
    .dark-mode & {
      background: #e7ceff;
    }
    transition: transform 0.2s ease-out, width 0.2s ease-out;
    will-change: transform, width;
  }

  &::before {
    top: 3px;
    width: 24px;
  }

  &::after {
    bottom: 3px;
    width: 18px;
  }

  [data-state='menu'] &::before {
    transform: translate(-2px, 10px) rotate(40deg);
    width: 30px;
  }
  [data-state='menu'] &::after {
    transform: translate(-2px, -10px) rotate(-40deg);
    width: 30px;
  }
`

const patty = css`
  display: block;
  background: #318513;
  position: absolute;
  left: 0;
  top: 13px;
  width: 100%;
  height: 2px;
  transition: width 0.2s ease-out;
  will-change: width;

  .dark-mode & {
    background: #e7ceff;
  }

  [data-state='menu'] & {
    background: #deede2;
  }
  [data-state='menu'].dark-mode & {
    background: #192633;
  }
`

export const MenuToggle = ({ appState, setAppState }) => {
  const menuOn = () => setAppState('menu')
  const menuOff = () => setAppState('default')

  return (
    <button
      className={button}
      aria-label="Menu"
      aria-pressed={appState === 'menu'}
      onClick={appState === 'menu' ? menuOff : menuOn}
    >
      <div className={buns}>
        <span className={patty} />
      </div>
    </button>
  )
}
