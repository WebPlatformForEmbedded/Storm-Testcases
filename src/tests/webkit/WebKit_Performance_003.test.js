import baseTest from './WebKit_Performance_001.test.js'
import constants from '../../commonMethods/constants'

export default {
  ...baseTest,
  ...{
    context: {
      minFPS: 25,
      url: 'https://webkit.org/blog-files/leaves/',
    },
    plugin: [constants.webKitBrowserPlugin, constants.youTubePlugin, constants.uxplugin],
    title: 'WPEWebkit performance falling leaves',
    description: 'Loads the falling leaves CSS3 animation and measures its performance',
    steps: baseTest.steps.map((step, index) => {
      if (index === 0) {
        return { ...step, ...{ description: 'Navigating to falling leaves' } }
      }
      return step
    }),
  },
}
