import baseTest from './WebKit_Performance_001.test.js'

export default {
  ...baseTest,
  ...{
    context: {
      minFPS: 10,
      url: 'http://themaninblue.com/experiment/AnimationBenchmark/canvas/',
    },
    title: 'WPEWebkit performance man in blue',
    description: 'Loads the Man in Blue Canvas animation and measures its performance',
    steps: baseTest.steps.map((step, index) => {
      if (index === 0) {
        return { ...step, ...{ description: 'Navigating to Man in Blue Canvas' } }
      }
      return step
    }),
  },
}
