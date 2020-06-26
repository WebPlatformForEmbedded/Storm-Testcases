import baseTest from './WebKit_Performance_001.test.js'

export default {
  ...baseTest,
  ...{
    context: {
      minFPS: 10,
      url: 'https://oos.moxiecode.com/js_webgl/particles_morph/',
    },
    title: 'WPEWebkit performance anisotropic',
    description: 'Loads the Particles webGL animation and measures its performance',
    steps: baseTest.steps.map((step, index) => {
      if (index === 0) {
        return { ...step, ...{ description: 'Navigating to Particles webGL' } }
      }
      return step
    }),
  },
}
