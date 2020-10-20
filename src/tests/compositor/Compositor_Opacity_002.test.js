import baseTest from './Compositor_Opacity_001.test'
import constants from '../../commonMethods/constants'

export default {
  ...baseTest,
  ...{
    context: {
      opacityValue: '0',
    },
    title: 'Compositor Client Opacity - 002',
    description: 'Sets the client Opacity to 0 and validates the result',
    plugin: [constants.compositorPlugin, constants.webKitBrowserPlugin, constants.uxplugin],
    steps: baseTest.steps.map(step => {
      return step
    }),
  },
}
