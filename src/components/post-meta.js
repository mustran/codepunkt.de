import { styled } from 'linaria/react'
import React from 'react'
import CalendarIcon from '../images/calendar.svg'
import CoffeeIcon from '../images/coffee.svg'
import WarningIcon from '../images/warning.svg'
import { formatPostDate } from '../utils'

const Wrapper = styled.footer`
  ul {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    margin: 0;
    font-size: 16px;
    color: #888;
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
    stroke: #2b628a;
    stroke-width: 1;
  }
`

const isProduction = process.env.NODE_ENV === 'production'

const PostMeta = ({ as, draft, created, updated, timeToRead }) => {
  return (
    <Wrapper as={as}>
      <ul>
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
    </Wrapper>
  )
}

export default PostMeta
