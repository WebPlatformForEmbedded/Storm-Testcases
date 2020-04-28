import {
  pluginDeactivate,
  pluginActivate,
  setClientOpacity,
} from '../../commonMethods/commonFunctions'
import constants from '../../commonMethods/constants'

export default {
  title: 'Compositor Client Opacity - 003',
  description: 'Sets the client Opacity to 255 and validates the result',
  context: {
    opacityValue: '255',
    opacityInitialValue: '20',
  },
  steps: [
    {
      description: 'Deactivate WebKitBrowser Plugin and check deactivated or not',
      test: pluginDeactivate,
      params: constants.webKitBrowserPlugin,
      assert: 'deactivated',
    },
    {
      description: 'Activate WebKitBrowser Plugin and check resumed or not',
      test: pluginActivate,
      params: constants.webKitBrowserPlugin,
      assert: 'resumed',
    },
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
