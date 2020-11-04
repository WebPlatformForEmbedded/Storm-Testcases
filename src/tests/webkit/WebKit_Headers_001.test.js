import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import { getHeaders, setWebKitUrl } from '../../commonMethods/webKitBrowser'
import constants from '../../commonMethods/constants'

export default {
  title: 'Webkit Headers - 001  ',
  description: 'Gets the Headers for WebKit and validates the result',
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
  plugin: [constants.webKitBrowserPlugin, constants.youTubePlugin, constants.uxplugin],
  steps: [
    {
      description: 'Get Headers and validate the result',
      test() {
        return getHeaders.call(this)
      },
      validate(res) {
        if (res !== null && res !== undefined) {
          return true
        } else {
          throw new Error('Invalid header data')
        }
      },
    },
  ],
}
