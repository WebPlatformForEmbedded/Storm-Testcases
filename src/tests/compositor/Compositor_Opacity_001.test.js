import constants from '../../commonMethods/constants'
import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import { setWebKitUrl } from '../../commonMethods/webKitBrowser'
import { setClientOpacity } from '../../commonMethods/compositor'

export default {
  title: 'Compositor Client Opacity - 001',
  description: 'Sets the client Opacity to 155 and validates the result',
  context: {
    opacityValue: 155,
  },
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, 'WebKitBrowser'), //make sure the browser is turned off
      () => pluginDeactivate.call(this, 'UX'), //make sure UX is turned off
      () => pluginActivate.call(this, 'WebKitBrowser'),
      () => setWebKitUrl.call(this, 'about:blank'),
      () => {
        return this.$thunder.api.call('WebKitBrowser', 'state', 'resumed')
      },
    ])
  },
  steps: [
    {
      description: 'Set Client Opacity and validate the result',
      sleep: 10,
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
          throw new Error('Opacity not set to ', this.$context.read('opacityValue'))
        }
      },
    },
  ],
}
