import baseTest from './WebKit_Performance_001.test.js'
import constants from '../../commonMethods/constants'

export default {
  ...baseTest,
  ...{
    context: {
      minFPS: 2,
      url: 'https://testdrive-archive.azurewebsites.net/Performance/FishIETank/Default.html',
    },
    plugin: [constants.webKitBrowserPlugin, constants.youTubePlugin, constants.uxplugin],
    title: 'WPEWebkit performance fishietank',
    description: 'Loads the Fish IE tank canvas animation and measures its performance',
    steps: baseTest.steps.map((step, index) => {
      if (index === 0) {
        return { ...step, ...{ description: 'Navigating to Fish IE tank canvas' } }
      }
      return step
    }),
  },
}
