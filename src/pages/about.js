import { css } from 'linaria'
import React from 'react'
import Meta from '../components/meta'

const AboutPage = ({ className }) => {
  return (
    <div className={className}>
      <Meta title="About Me — Codepunkt" />
      <h1>
        <span>Hey there!</span>
      </h1>
      <article
        className={css`
          font-weight: 300;
          font-size: 1.2rem;
        `}
      >
        <p>
          I'm Christoph Werner, a full-stack web developer based in Paderborn,
          Germany. I've been building stuff on the web for the last 20 years,
          working with companies and clients across various industries.
        </p>
        <p>
          My focus is on creating enjoyable, accessible and performant user
          interfaces and observable, reliable and scalable APIs. Over the last
          couple of years, i've helped build a few web applications and shaped a
          lot of developer tooling and processes.
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
