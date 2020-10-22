import baseTest from './WebKit_Stress_001.test.js'
import constants from '../../commonMethods/constants'

export default {
  ...baseTest,
  ...{
    context: {
      url: 'https://cdn.metrological.com/static/testbot/v1/images_app.html',
    },
    title: 'WPEWebkit stability images test',
    description:
      'Stress loads the system with images and see if the WPEWebkit process continues to operate nominally',
    plugin: [constants.webKitBrowserPlugin, constants.youTubePlugin, constants.uxplugin],
    steps: baseTest.steps.map((step, index) => {
      return step
    }),
  },
}
