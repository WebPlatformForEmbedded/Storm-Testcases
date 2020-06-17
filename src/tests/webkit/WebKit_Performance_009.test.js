import baseTest from './WebKit_Performance_001.test.js'

export default {
  ...baseTest,
  ...{
    context: {
      minFPS: 5,
      url: 'https://alteredqualia.com/three/examples/webgl_pasta.html',
    },
    title: 'WPEWebkit performance pasta',
    description: 'Loads the pasta WebGL animation and measures its performance',
    steps: baseTest.steps.map((step, index) => {
      if (index === 0) {
        return { ...step, ...{ description: 'Navigating to pasta WebGL' } }
      }
      return step
    }),
  },
}
