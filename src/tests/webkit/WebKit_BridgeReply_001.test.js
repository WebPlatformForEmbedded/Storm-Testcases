import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import { bridgeReply } from '../../commonMethods/webKitBrowser'
import constants from '../../commonMethods/constants'

export default {
  title: 'Webkit Bridge Reply - 001',
  description: 'Gets response for legacy badger event and validates the result',
  plugin: [constants.webKitBrowserPlugin, constants.youTubePlugin, constants.uxplugin],
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, 'WebKitBrowser'), //cycle the browser
      () => pluginDeactivate.call(this, 'UX'), //make sure UX is turned off
      () => pluginDeactivate.call(this, 'Netflix'), //make sure Netflix is turned off
      () => pluginDeactivate.call(this, 'Cobalt'), //make sure Cobalt is turned off
      () => pluginActivate.call(this, 'WebKitBrowser'),
    ])
  },
  steps: [
    {
      description: 'Gets response for legacy badger event and validates the result',
      test() {
        return bridgeReply.call(this, '')
      },
      validate(res) {
        if (res === null) {
          return true
        } else {
          throw new Error('Response for legacy badger is not observed')
        }
      },
    },
  ],
}
