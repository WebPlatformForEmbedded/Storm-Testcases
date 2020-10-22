import baseTest from './WebKit_Visibility_001.test'
import constants from '../../commonMethods/constants'

export default {
  ...baseTest,
  ...{
    context: {
      visibilityState: 'visible',
    },
    plugin: [constants.webKitBrowserPlugin, constants.youTubePlugin, constants.uxplugin],
    title: 'Webkit Visibility - 002',
    description: 'Set Webkit Visibility to Visible and check the visibility state',
    steps: baseTest.steps.map((step, index) => {
      return step
    }),
  },
}
