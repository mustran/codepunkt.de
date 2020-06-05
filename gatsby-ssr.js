import React from 'react'

const DarkModeScript = () => {
  // This will help to prevent a flash if dark mode is the default.
  // Unminified code is below/
  const codeToRunOnClient =
    '!function(e,a,o){function t(o){document.documentElement.classList.add(o?e:a),document.documentElement.classList.remove(o?a:e)}var d=window.matchMedia("(prefers-color-scheme: dark)"),r="(prefers-color-scheme: dark)"===d.media,s=null;try{s=localStorage.getItem("darkMode")}catch(e){}var c=null!==s;if(c&&(s=JSON.parse(s)),c)t(s);else if(r)t(d.matches),localStorage.setItem("darkMode",d.matches);else{var l=document.documentElement.classList.contains(e);localStorage.setItem("darkMode",JSON.stringify(l))}}("dark-mode","light-mode");'

  // const codeToRunOnClient = `
  // (function () {
  //   var storageKey = 'darkMode'
  //   var classNameDark = 'dark-mode'
  //   var classNameLight = 'light-mode'

  //   function setClassOnDocumentElement(darkMode) {
  //     document.documentElement.classList.add(
  //       darkMode ? classNameDark : classNameLight
  //     )
  //     document.documentElement.classList.remove(
  //       darkMode ? classNameLight : classNameDark
  //     )
  //   }

  //   var preferDarkQuery = '(prefers-color-scheme: dark)'
  //   var mql = window.matchMedia(preferDarkQuery)
  //   var supportsColorSchemeQuery = mql.media === preferDarkQuery
  //   var localStorageTheme = null
  //   try {
  //     localStorageTheme = localStorage.getItem(storageKey)
  //   } catch (err) {}
  //   var localStorageExists = localStorageTheme !== null
  //   if (localStorageExists) {
  //     localStorageTheme = JSON.parse(localStorageTheme)
  //   }

  //   if (localStorageExists) {
  //     setClassOnDocumentElement(localStorageTheme)
  //   } else if (supportsColorSchemeQuery) {
  //     setClassOnDocumentElement(mql.matches)
  //     localStorage.setItem(storageKey, mql.matches)
  //   } else {
  //     var isDarkMode = document.documentElement.classList.contains(classNameDark)
  //     localStorage.setItem(storageKey, JSON.stringify(isDarkMode))
  //   }
  // })()
  // `

  // eslint-disable-next-line react/no-danger
  return <script dangerouslySetInnerHTML={{ __html: codeToRunOnClient }} />
}

export const onRenderBody = ({ setPreBodyComponents }) => {
  setPreBodyComponents(<DarkModeScript />)
}
