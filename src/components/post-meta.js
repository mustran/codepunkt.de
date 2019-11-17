import { css, cx } from 'linaria'
import React from 'react'
import CalendarIcon from '../images/calendar.svg'
import CoffeeIcon from '../images/coffee.svg'
import { formatPostDate } from '../utils'

const meta = css`
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  font-size: 1rem;
  color: #757575;

  .dark-mode & {
    color: #7f8ea3;
  }

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
    stroke: #000;
    stroke-width: 1;

    .dark-mode & {
      stroke: #fff;
    }
  }
`

const isProduction = process.env.NODE_ENV === 'production'

const PostMeta = ({ className, draft, created, updated, timeToRead }) => {
  return (
    <ul className={cx(meta, className)}>
      {/* {!isProduction && draft && <li>draft</li>} */}
      <li>
        <CalendarIcon />
        {formatPostDate(created)}
      </li>
      {
        <li>
          <CoffeeIcon />
          {timeToRead} min read
        </li>
      }
    </ul>
  )
}

export default PostMeta
