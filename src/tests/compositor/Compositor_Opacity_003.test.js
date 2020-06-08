import constants from '../../commonMethods/constants'
import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import { setWebKitUrl } from '../../commonMethods/webKitBrowser'
import { setClientOpacity } from '../../commonMethods/compositor'

export default {
  title: 'Compositor Client Opacity - 003',
  description: 'Sets the client Opacity to 255 and validates the result',
  context: {
    opacityValue: '255',
    opacityInitialValue: '20',
  },
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, constants.compositorPlugin),
      () => pluginActivate.call(this, constants.compositorPlugin),
      () => pluginDeactivate.call(this, constants.webKitBrowserPlugin),
      () => pluginDeactivate.call(this, constants.uxplugin),
      () => pluginActivate.call(this, constants.webKitBrowserPlugin),
      () => setWebKitUrl.call(this, constants.blankUrl),
      () => {
        return this.$thunder.api.call(constants.webKitBrowserPlugin, 'state', constants.resume)
      },
    ])
  },
  teardown() {
    pluginDeactivate.call(this, constants.youTubePlugin)
  },
  steps: [
    {
      description: 'Set Client Opacity to 20 and validate the result',
      sleep: 10,
      test() {
        return setClientOpacity.call(
          this,
          constants.webKitBrowserPlugin,
          this.$context.read('opacityInitialValue')
        )
      },
      validate(res) {
        if (res == null) {
          return true
        } else {
          throw new Error(`Opacity not set to ${this.$context.read('opacityInitialValue')}`)
        }
      },
    },
    {
      description: 'Set Client Opacity to 255 and validate the result',
      test() {
        return setClientOpacity.call(
          this,
          constants.webKitBrowserPlugin,
          this.$context.read('opacityValue')
        )
      },
      validate(res) {
        if (res == null) {
          return true
        } else {
          throw new Error(`Opacity not set to ${this.$context.read('opacityValue')}`)
        }
      },
    },
  ],
}
