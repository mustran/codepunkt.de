import { css } from 'linaria'
import React from 'react'
import { Logo } from './logo'
import { Menu } from './menu'

const header = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  padding: max(min(2vh, 24px), 16px) max(min(5vw, 40px), 20px);
`

export const Header = ({ sneakPeakColor, path }) => {
  // const { y } = useWindowScroll()
  // const [headerState, setHeaderState] = useState('initial')

  // React.useEffect(() => {
  //   if (headerState !== 'fixed' && y > 250) {
  //     setHeaderState('fixed')
  //   }
  //   if (headerState === 'fixed' && y < 40) {
  //     setHeaderState('static')
  //   }
  // }, [headerState, y])

  return (
    <header className={header}>
      <Logo />
      <Menu />
    </header>
  )
}
