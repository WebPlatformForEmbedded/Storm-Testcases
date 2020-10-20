import constants from '../../commonMethods/constants'
import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import { setWebKitUrl } from '../../commonMethods/webKitBrowser'
import { setClientVisibility } from '../../commonMethods/compositor'

export default {
  title: 'Compositor Client Visibility - 001',
  description: 'Sets the client visibility and validates the result',
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
  plugin: [constants.compositorPlugin, constants.webKitBrowserPlugin, constants.uxplugin],
  teardown() {
    pluginDeactivate.call(this, constants.youTubePlugin)
  },
  steps: [
    {
      description: 'Set Client Visibility to hidden and validate the result',
      sleep: 10,
      test() {
        return setClientVisibility.call(this, constants.webKitBrowserPlugin, constants.hidden)
      },
      validate(res) {
        if (res == null) {
          return true
        } else {
          throw new Error('Visbility not set to hidden')
        }
      },
    },
    {
      description: 'Set Client Visibility to Visibile and validate the result',
      test() {
        return setClientVisibility.call(this, constants.webKitBrowserPlugin, constants.visible)
      },
      validate(res) {
        if (res == null) {
          return true
        } else {
          throw new Error('Visbility not set to visible')
        }
      },
    },
  ],
}
