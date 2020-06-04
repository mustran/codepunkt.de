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
  z-index: 1;
  cursor: pointer;

  @media screen and (min-width: 521px) {
    width: 48px;
    height: 48px;
  }
`

const burger = css`
  width: 24px;
  height: 2px;
  margin: 15px 4px 15px 0;
  background: #318513;
  position: relative;
  transition: color 0.2s ease-out;

  .dark-mode & {
    &::before,
    &::after,
    & {
      background: #e7ceff;
    }
  }

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 28px;
    height: 2px;
    left: 0;
    background: #318513;
    transition: transform 0.2s ease-out, width 0.2s ease-out;
  }

  &::before {
    top: -10px;
  }

  &::after {
    bottom: -10px;
  }

  [data-state='menu'] & {
    background: #deede2;
  }
  [data-state='menu'].dark-mode & {
    background: #192633;
  }
  [data-state='menu'] &::before {
    transform: translate(-2px, 10px) rotate(40deg);
    width: 32px;
  }
  [data-state='menu'] &::after {
    transform: translate(-2px, -10px) rotate(-40deg);
    width: 32px;
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
      <div className={burger} />
    </button>
  )
}
