import {
  pluginDeactivate,
  pluginActivate,
  setClientOpacity,
  setWebKitUrl,
} from '../../commonMethods/commonFunctions'
import constants from '../../commonMethods/constants'

export default {
  title: 'Compositor Client Opacity - 003',
  description: 'Sets the client Opacity to 255 and validates the result',
  context: {
    opacityValue: '255',
    opacityInitialValue: '20',
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
          this.$log('Opacity not set to ', this.$context.read('opacityInitialValue'))
          return false
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
          this.$log('Opacity not set to ', this.$context.read('opacityValue'))
          return false
        }
      },
    },
  ],
}
