import baseTest from './WebKit_Performance_001.test.js'
import constants from '../../commonMethods/constants'

export default {
  ...baseTest,
  ...{
    context: {
      minFPS: baseTest.context.minFPS,
      url: 'https://webkit.org/blog-files/3d-transforms/morphing-cubes.html',
    },
    plugin: [constants.webKitBrowserPlugin, constants.youTubePlugin, constants.uxplugin],
    title: 'WPEWebkit performance morphing cube',
    description: 'Loads the Morphing Cube CSS3 animation and measures its performance',
    steps: baseTest.steps.map((step, index) => {
      if (index === 0) {
        return { ...step, ...{ description: 'Navigating to Morphing Cube' } }
      }
      return step
    }),
  },
}
