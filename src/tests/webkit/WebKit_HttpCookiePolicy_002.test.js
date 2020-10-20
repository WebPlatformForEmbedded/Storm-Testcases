import baseTest from './WebKit_HttpCookiePolicy_001.test'
import constants from '../../commonMethods/constants'

export default {
  ...baseTest,
  ...{
    context: {
      value: 'never',
    },
    plugin: [constants.webKitBrowserPlugin, constants.youTubePlugin, constants.uxplugin],
    title: 'Webkit HTTP Cookie Policy- 002',
    description: 'Set Cookie policy to never and check whether the same is set or not',
    steps: baseTest.steps.map(step => {
      return step
    }),
  },
}
