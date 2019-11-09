import { css, cx } from 'linaria'
import React from 'react'
import CalendarIcon from '../images/calendar.svg'
import CoffeeIcon from '../images/coffee.svg'
import WarningIcon from '../images/warning.svg'
import { formatPostDate } from '../utils'

const meta = css`
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  font-size: 16px;
  color: #8899a6;

  li {
    margin: 0;
    display: flex;
    align-items: center;
    white-space: nowrap;
    &:not(:last-child) {
      margin-right: 16px;
    }
  }

  svg {
    margin-right: 6px;
    width: 20px;
    stroke: #576773;
    stroke-width: 1;
  }
`

const isProduction = process.env.NODE_ENV === 'production'

const PostMeta = ({ className, draft, created, updated, timeToRead }) => {
  return (
    <ul className={cx(meta, className)}>
      {!isProduction && draft && (
        <li>
          <WarningIcon style={{ marginTop: 2 }} />
          DRAFT
        </li>
      )}
      <li>
        <CalendarIcon />
        {formatPostDate(updated)}
      </li>
      <li>
        <CoffeeIcon />
        {timeToRead} min read
      </li>
    </ul>
  )
}

export default PostMeta
