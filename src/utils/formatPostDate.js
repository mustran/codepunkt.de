const formatPostDate = (date, lang = 'en') =>
  typeof Date.prototype.toLocaleDateString === 'function'
    ? new Date(date).toLocaleDateString(lang, {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : date

export default formatPostDate
