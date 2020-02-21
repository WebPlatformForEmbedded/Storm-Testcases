import baseTest from './WebKit_Performance_001.test.js'

export default {
  ...baseTest,
  ...{
    context: {
      minFPS: 30,
      url: 'http://cdn.metrological.com/static/eme-v3-clean.html',
    },
    title: 'WPEWebkit performance racer-s',
    description: 'Loads the Racer-S WebGL animation and measures its performance',
    steps: baseTest.steps.map((step, index) => {
      if (index === 0) {
        return { ...step, ...{ description: 'Navigating to Racer-S WebGL' } }
      }
      return step
    }),
  },
}
