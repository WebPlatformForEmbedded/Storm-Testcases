import baseTest from './WebKit_Performance_001.test.js'
import constants from '../../commonMethods/constants'

export default {
  ...baseTest,
  ...{
    context: {
      minFPS: 10,
      url: 'https://www.websocket.org/demos/racer/run/',
    },
    plugin: [constants.webKitBrowserPlugin, constants.youTubePlugin, constants.uxplugin],
    title: 'WPEWebkit performance helloracer',
    description: 'Loads the Helloracer WebGL animation and measures its performance',
    steps: baseTest.steps.map((step, index) => {
      if (index === 0) {
        return { ...step, ...{ description: 'Navigating to Helloracer WebGL' } }
      }
      return step
    }),
  },
}
