import constants from '../../commonMethods/constants'
import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import { setWebKitUrl } from '../../commonMethods/webKitBrowser'
import { selectClient } from '../../commonMethods/compositor'

export default {
  title: 'Compositor Select - 001',
  description: 'Execute Select Api and validate the result',
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
  plugin: [constants.compositorPlugin],
  steps: [
    {
      description: 'Select Client and validate the result',
      sleep: 5,
      test() {
        return selectClient.call(this, constants.webKitBrowserPlugin)
      },
      validate(res) {
        if (res == null) {
          return true
        } else {
          throw new Error('Client not selected')
        }
      },
    },
  ],
}
