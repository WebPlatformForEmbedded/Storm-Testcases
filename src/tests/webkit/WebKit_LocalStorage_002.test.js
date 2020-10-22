import baseTest from './WebKit_LocalStorage_001.test'
import constants from '../../commonMethods/constants'

export default {
  ...baseTest,
  ...{
    context: {
      status: false,
    },
    plugin: [constants.webKitBrowserPlugin, constants.youTubePlugin, constants.uxplugin],
    title: 'Webkit Local Storage - 002',
    description: 'Set the Local storage status to false and check whether the same is set or not',
    steps: baseTest.steps.map(step => {
      return step
    }),
  },
}
