import Typography from 'typography'

const typography = new Typography({
  title: 'Codepunkt',
  baseFontSize: '18px',
  baseLineHeight: 1.72,
  scaleRatio: 2.4,
  headerLineHeight: 1.42,
  headerFontFamily: ['Lato', 'sans-serif'],
  bodyFontFamily: ['Merriweather', 'serif'],
  headerColor: '#4B4237',
  bodyColor: '#333',
  headerWeight: 500,
  bodyWeight: 400,
  boldWeight: 700,
  includeNormalize: false,
  overrideStyles: ({ adjustFontSizeTo, rhythm }, options, styles) => ({
    '@media only screen and (max-width: 667px)': {
      html: { font: `100%/1.72 Merriweather,serif;` },
      code: { fontSize: '16px' },
    },
    code: {
      fontSize: '18px',
    },
  }),
})

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
