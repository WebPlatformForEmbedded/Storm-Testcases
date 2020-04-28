import {
  pluginDeactivate,
  pluginActivate,
  setClientVisibility,
} from '../../commonMethods/commonFunctions'
import constants from '../../commonMethods/constants'

export default {
  title: 'Compositor Client Visibility - 001',
  description: 'Sets the client visibility and validates the result',
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
      description: 'Set Client Visibility to hidden and validate the result',
      sleep: 10,
      test() {
        return setClientVisibility.call(this, constants.webKitBrowserPlugin, 'hidden')
      },
      validate(res) {
        if (res == null) {
          return true
        } else {
          this.$log('Visbility not set to hidden')
          return false
        }
      },
    },
    {
      description: 'Set Client Visibility to Visibile and validate the result',
      test() {
        return setClientVisibility.call(this, constants.webKitBrowserPlugin, 'visible')
      },
      validate(res) {
        if (res == null) {
          return true
        } else {
          this.$log('Visbility not set to visible')
          return false
        }
      },
    },
  ],
}
