import baseTest from './WebKit_Performance_001.test.js'

export default {
  ...baseTest,
  ...{
    context: {
      minFPS: 15,
      url: 'https://www.smashcat.org/av/canvas_test/',
    },
    title: 'WPEWebkit performance smashcat',
    description: 'Loads the smashcat Canvas animation and measures its performance',
    steps: baseTest.steps.map((step, index) => {
      if (index === 0) {
        return { ...step, ...{ description: 'Navigating to smashcat Canvas' } }
      }
      return step
    }),
  },
}
