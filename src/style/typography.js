import Typography from 'typography'

const fontFamily = [
  'Open Sans',
  '-apple-system',
  'BlinkMacSystemFont',
  'Segoe UI',
  'Roboto',
  'Oxygen-Sans',
  'Ubuntu',
  'Cantarell',
  'Helvetica Neue',
  'sans-serif',
]

const typography = new Typography({
  title: 'Codepunkt',
  baseFontSize: '18px',
  baseLineHeight: 1.72,
  scaleRatio: 2.4,
  headerLineHeight: 1.42,
  headerFontFamily: fontFamily,
  bodyFontFamily: fontFamily,
  headerWeight: 500,
  bodyWeight: 400,
  boldWeight: 500,
  includeNormalize: false,
  overrideStyles: ({ adjustFontSizeTo, rhythm }, options, styles) => ({
    '@media only screen and (max-width: 667px)': {
      html: {
        font: `112.5%/1.72 'Open Sans',-apple-system,'BlinkMacSystemFont','Segoe UI','Roboto','Oxygen-Sans','Ubuntu','Cantarell','Helvetica Neue',sans-serif;`,
      },
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
