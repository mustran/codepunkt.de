import React from 'react'

export default function HTML(props) {
  return (
    <html {...props.htmlAttributes} class="no-js anim">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `function onVisibilityChange(){document.documentElement.classList[document.visibilityState==='visible'?'add':'remove']('visible')};document.documentElement.classList.remove('no-js');onVisibilityChange();document.addEventListener('visibilitychange',onVisibilityChange,false);if(sessionStorage.getItem('didAnimationRun')!==null)document.documentElement.classList.remove('anim');`,
          }}
        />
        {props.headComponents}
      </head>
      <body {...props.bodyAttributes}>
        {props.preBodyComponents}
        <noscript key="noscript" id="gatsby-noscript">
          <b>Info:</b> This website works best with JavaScript enabled.
        </noscript>
        <div
          key={`body`}
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}
      </body>
    </html>
  )
}
