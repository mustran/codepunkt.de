import { css } from 'linaria'
import React from 'react'
import Meta from '../components/meta'

const headline = css`
  transform: rotate(1deg);

  span {
    background: #ffe8b1;
    .dark-mode & {
      background: #f8d177;
      color: #15202b;
    }
  }
`

const introduction = css`
  color: #666;
  font-size: 1.2rem;

  .dark-mode & {
    color: #9aa2ab;
  }
`

const AboutPage = () => {
  return (
    <div>
      <Meta title="About Me — Codepunkt" />
      <h1 className={headline}>
        <span>Hey there!</span>
      </h1>
      <article className={introduction}>
        <p>
          I'm Christoph Werner, a software architect and full-stack web
          developer based in Paderborn, Germany. I've been building sites,
          applications and services on the web for more than 2 decades, working
          with companies and clients across various industries.
        </p>
        <p>
          My focus is on creating enjoyable, accessible and performant user
          interfaces and observable, reliable and scalable APIs. Over the last
          couple of years, i've also become a "developer of developers", getting
          development teams acquainted to the fast moving web and cloud
          ecosystems. I am helping teams improve their knowledge, broaden their
          skill-sets and personal growth. Besides all of this teaching and
          mentoring, i'm also consistently evaluating new or alternative
          technologies to find the best product-team-technology fit.
        </p>
      </article>
      <h2>Work</h2>
      <p>
        I work at{' '}
        <a href="https://dspace.com/" target="_blank" rel="noopener noreferrer">
          dSPACE
        </a>
        , the world’s leading provider of hardware and software tools for
        developing and testing sophisticated electronic control systems.
      </p>
      <h2>Speaking</h2>
      <p>
        I'm an active member of the web development community and believe in
        open source culture. I'm one of the organizers of the local JavaScript
        meetup,{' '}
        <a
          href="https://paderbornjs.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Paderborn.js
        </a>{' '}
        and like speaking at meetups and conferences whenever I have something
        interesting to share.
      </p>
      <p>If you are interested in having me speak at an event, let me know!</p>
      <h2>Online</h2>
      <ul>
        <li>
          <a
            href="mailto:christoph@codepunkt.de"
            target="_blank"
            rel="noopener noreferrer"
          >
            Email
          </a>
        </li>
        <li>
          <a
            href="https://twitter.com/code_punkt"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </a>
        </li>
      </ul>
    </div>
  )
}

export default AboutPage
