import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import { bridgeEvent, setWebKitUrl } from '../../commonMethods/webKitBrowser'
import constants from '../../commonMethods/constants'

export default {
  title: 'Webkit Bridge Event - 001  ',
  description: 'Sends legacy badger event and validates the result',
  plugin: [constants.webKitBrowserPlugin, constants.youTubePlugin, constants.uxplugin],
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, 'WebKitBrowser'), //cycle the browser
      () => pluginDeactivate.call(this, 'UX'), //make sure UX is turned off
      () => pluginDeactivate.call(this, 'Netflix'), //make sure Netflix is turned off
      () => pluginDeactivate.call(this, 'Cobalt'), //make sure Cobalt is turned off
      () => pluginActivate.call(this, 'WebKitBrowser'),
      () => setWebKitUrl.call(this, constants.blankUrl),
    ])
  },
  steps: [
    {
      description: 'Sends legacy badger event and validates the result',
      test() {
        return bridgeEvent.call(this, '')
      },
      validate(res) {
        if (res === null) {
          return true
        } else {
          throw new Error('Bridge event not sent')
        }
      },
    },
  ],
}
